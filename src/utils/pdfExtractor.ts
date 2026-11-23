import * as pdfjsLib from 'pdfjs-dist';
import { CandidateResume, ResumeSection } from '../types';

// Set up worker source
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

export async function extractTextFromPdf(file: File): Promise<{
  rawText: string;
  pages: { pageNumber: number; text: string }[];
}> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  const pages: { pageNumber: number; text: string }[] = [];
  let fullText = '';

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      // @ts-expect-error item may have 'str'
      .map((item) => item.str || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    pages.push({
      pageNumber: i,
      text: pageText,
    });

    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
  }

  return { rawText: fullText.trim(), pages };
}

export function parseRawResumeToSections(
  rawText: string,
  fileName: string,
  pages: { pageNumber: number; text: string }[] = []
): CandidateResume {
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
  const name = lines[0]?.replace(/^[-–—#*\s]+/, '').slice(0, 50) || 'Uploaded Candidate';
  
  // Identify common section headers
  const sectionKeywords = [
    { title: 'Summary', match: /^(summary|professional summary|executive summary|about me|profile)/i },
    { title: 'Experience', match: /^(experience|work experience|employment|professional experience|career history)/i },
    { title: 'Skills', match: /^(skills|technical skills|core competencies|technologies|tools)/i },
    { title: 'Education', match: /^(education|academic background|qualifications|degrees)/i },
    { title: 'Projects', match: /^(projects|key projects|selected projects|open source)/i },
    { title: 'Certifications', match: /^(certifications|licenses|awards)/i },
  ];

  const sections: ResumeSection[] = [];
  let currentSectionTitle = 'Header & Contact';
  let currentContent: string[] = [];
  let currentPage = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Page indicator check
    const pageMatch = line.match(/^--- Page (\d+) ---/);
    if (pageMatch) {
      currentPage = parseInt(pageMatch[1], 10);
      continue;
    }

    // Check if line looks like a header
    const matchedKeyword = sectionKeywords.find((k) => k.match.test(line));
    if (matchedKeyword && line.length < 40) {
      if (currentContent.length > 0) {
        sections.push({
          id: `sec-${sections.length}-${currentSectionTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          title: currentSectionTitle,
          pageNumber: currentPage,
          content: [...currentContent],
        });
        currentContent = [];
      }
      currentSectionTitle = matchedKeyword.title;
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0) {
    sections.push({
      id: `sec-${sections.length}-${currentSectionTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: currentSectionTitle,
      pageNumber: currentPage,
      content: [...currentContent],
    });
  }

  // Fallback if no sections parsed
  if (sections.length <= 1 && pages.length > 0) {
    pages.forEach((p, idx) => {
      sections.push({
        id: `sec-page-${p.pageNumber}`,
        title: `Page ${p.pageNumber}`,
        pageNumber: p.pageNumber,
        content: p.text.split('. ').map((s) => s.trim()).filter(Boolean),
      });
    });
  }

  // Extract email & phone
  const emailMatch = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/);

  const headline = lines.find((l, idx) => idx > 0 && idx < 4 && !l.includes('@') && l.length < 75) || 'Candidate Profile';

  return {
    id: `custom-${Date.now()}`,
    name,
    headline,
    email: emailMatch ? emailMatch[1] : 'candidate@email.com',
    phone: phoneMatch ? phoneMatch[0] : undefined,
    location: 'Available for Remote or Relocation',
    summary: sections.find((s) => /summary/i.test(s.title))?.content.join(' ') || rawText.slice(0, 300) + '...',
    sections,
    skills: [
      {
        category: 'Document Skills',
        items: ['Document Analyzed', 'Grounding Active', 'Citations Enabled'],
      },
    ],
    experience: [],
    education: [],
    rawText,
    fileName,
    uploadedAt: new Date().toISOString().split('T')[0],
  };
}
