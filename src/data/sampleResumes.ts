import { CandidateResume } from '../types';

export const SAMPLE_RESUMES: CandidateResume[] = [
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    headline: 'Staff Distributed Systems Engineer & Cloud Architect',
    email: 'elena.rostova@cloudforge.io',
    phone: '+1 (415) 890-3412',
    location: 'San Francisco, CA (Open to Remote)',
    linkedin: 'linkedin.com/in/elena-rostova-eng',
    github: 'github.com/erostova-sys',
    portfolio: 'rostova.dev',
    summary: 'Staff Software Engineer with 9+ years designing fault-tolerant, high-throughput distributed systems in Go, Rust, and Java. Led infrastructure teams handling 4.2M QPS at Stripe and re-architected AWS-based multi-region transaction pipelines resulting in 99.999% SLA availability and $2.8M annual infrastructure savings. Expert in consensus protocols (Raft, Paxos), Kafka event streaming, and Kubernetes orchestration.',
    uploadedAt: '2026-10-15',
    fileName: 'Elena_Rostova_Staff_Distributed_Systems.pdf',
    skills: [
      {
        category: 'Core Systems & Languages',
        items: ['Go (Golang)', 'Rust', 'Java 21', 'C++', 'Distributed Consensus (Raft)', 'Concurrency', 'gRPC', 'Protocol Buffers']
      },
      {
        category: 'Infrastructure & Data Platforms',
        items: ['Apache Kafka', 'Kubernetes (K8s)', 'Amazon Web Services (AWS)', 'PostgreSQL', 'CockroachDB', 'Redis', 'Terraform', 'Prometheus', 'Envoy Proxy']
      },
      {
        category: 'Architecture & Leadership',
        items: ['Event-Driven Systems', 'Multi-Region High Availability', 'Disaster Recovery (RTO < 30s)', 'Technical Roadmap Strategy', 'Cross-functional Mentorship (14 engineers)']
      }
    ],
    experience: [
      {
        company: 'Stripe',
        role: 'Staff Distributed Systems Engineer',
        period: '2022 - Present',
        location: 'San Francisco, CA',
        highlights: [
          'Spearheaded the core transactional ledger migration to an active-active multi-region Go service processing over 4,200,000 queries per second (QPS) with p99 latency under 12ms.',
          'Architected an idempotency caching layer utilizing distributed Redis clusters and Paxos-based consensus, eliminating duplicate transaction charges during network partitions and recovering $1.4M/mo in potential dispute overhead.',
          'Reduced AWS compute expenditure by $2.8M annually through custom eBPF-based traffic routing and automated Kubernetes pod packing algorithms.',
          'Directly mentored 6 senior engineers and led the Systems Architecture Review Board overseeing RFCs across 40+ engineering squads.'
        ]
      },
      {
        company: 'Datadog',
        role: 'Senior Systems Engineer',
        period: '2019 - 2022',
        location: 'New York, NY (Remote)',
        highlights: [
          'Designed and deployed a high-scale telemetry ingestion engine handling 18 TB/day of distributed trace spans using Rust and Apache Kafka.',
          'Replaced legacy Java deserialization pipeline with zero-copy Rust streaming parser, cutting memory footprint by 58% and p95 ingestion delay from 3.2s to 180ms.',
          'Engineered automatic partition rebalancing algorithm for Kafka clusters across 6 AWS availability zones without message dropping or consumer group lag spikes.',
          'Authored Datadog open-source trace collector plugins adopted by over 450 enterprise customers.'
        ]
      },
      {
        company: 'Cloudflare',
        role: 'Software Engineer II (Edge Platforms)',
        period: '2016 - 2019',
        location: 'San Francisco, CA',
        highlights: [
          'Built edge worker caching rules in C++ and Lua across 200+ PoPs, serving 35 billion requests daily with sub-millisecond edge response times.',
          'Co-implemented TLS 1.3 zero-RTT handshake optimizations reducing mobile time-to-first-byte (TTFB) by 28% across high-latency cellular networks.',
          'Participated in weekly on-call rotation maintaining 99.999% edge gateway uptime during multi-terabit DDoS incidents.'
        ]
      }
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Electrical Engineering & Computer Science (EECS)',
        period: '2012 - 2016',
        details: ['Dean’s Honor List', 'Undergraduate Research Assistant at AMPLab (Distributed Systems & Spark optimization)']
      }
    ],
    sections: [
      {
        id: 'sec-summary',
        title: 'Executive Summary',
        pageNumber: 1,
        content: [
          'Staff Software Engineer with 9+ years designing fault-tolerant, high-throughput distributed systems in Go, Rust, and Java.',
          'Led infrastructure teams handling 4.2M QPS at Stripe and re-architected AWS multi-region transaction pipelines with 99.999% SLA availability.',
          'Expert in consensus protocols (Raft, Paxos), Kafka event streaming, eBPF telemetry, and Kubernetes orchestration.'
        ]
      },
      {
        id: 'sec-experience-stripe',
        title: 'Work Experience - Stripe (Staff Engineer)',
        pageNumber: 1,
        content: [
          'Spearheaded core transactional ledger migration to active-active multi-region Go service processing 4.2M QPS with p99 latency < 12ms.',
          'Architected idempotency caching layer utilizing distributed Redis clusters and Paxos consensus, eliminating duplicate transaction charges.',
          'Reduced AWS compute expenditure by $2.8M annually through custom eBPF traffic routing and automated Kubernetes pod packing.',
          'Mentored 6 senior engineers and chaired the Systems Architecture Review Board across 40+ engineering teams.'
        ]
      },
      {
        id: 'sec-experience-datadog',
        title: 'Work Experience - Datadog (Senior Systems Engineer)',
        pageNumber: 2,
        content: [
          'Designed telemetry ingestion engine handling 18 TB/day of distributed trace spans using Rust and Apache Kafka.',
          'Replaced Java deserializer with zero-copy Rust streaming parser, cutting memory footprint by 58% and p95 latency from 3.2s to 180ms.',
          'Engineered automatic partition rebalancing algorithm for Kafka clusters across 6 AWS availability zones with zero message drop.'
        ]
      },
      {
        id: 'sec-experience-cloudflare',
        title: 'Work Experience - Cloudflare (Edge Platforms)',
        pageNumber: 2,
        content: [
          'Built edge worker caching rules in C++ and Lua across 200+ PoPs, serving 35 billion requests daily with sub-millisecond edge response times.',
          'Co-implemented TLS 1.3 zero-RTT handshake optimizations reducing mobile TTFB by 28% across high-latency networks.'
        ]
      },
      {
        id: 'sec-skills-edu',
        title: 'Skills & Education',
        pageNumber: 2,
        content: [
          'Languages: Go, Rust, Java 21, C++, Python, SQL.',
          'Technologies: Apache Kafka, Kubernetes, AWS, PostgreSQL, CockroachDB, Redis, Terraform, Prometheus, Envoy Proxy, eBPF.',
          'Education: B.S. EECS from UC Berkeley (2012 - 2016). Dean’s Honor List. Research in AMPLab.'
        ]
      }
    ],
    rawText: `ELENA ROSTOVA
San Francisco, CA (Open to Remote) | +1 (415) 890-3412 | elena.rostova@cloudforge.io | rostova.dev | github.com/erostova-sys

EXECUTIVE SUMMARY
Staff Software Engineer with 9+ years designing fault-tolerant, high-throughput distributed systems in Go, Rust, and Java. Led infrastructure teams handling 4.2M QPS at Stripe and re-architected AWS-based multi-region transaction pipelines resulting in 99.999% SLA availability and $2.8M annual infrastructure savings. Expert in consensus protocols (Raft, Paxos), Kafka event streaming, and Kubernetes orchestration.

TECHNICAL SKILLS
- Languages: Go (Golang), Rust, Java 21, C++, Python, SQL
- Distributed Systems & Cloud: Apache Kafka, Kubernetes, AWS (EKS, EC2, DynamoDB), CockroachDB, PostgreSQL, Redis, Envoy, gRPC, Protocol Buffers, Terraform, eBPF, Prometheus, OpenTelemetry
- Architectural Focus: Active-Active Multi-Region Replication, Consensus Protocols (Raft, Paxos), Idempotent Payment Pipelines, Zero-Downtime Database Migrations

PROFESSIONAL EXPERIENCE

STRIPE | Staff Distributed Systems Engineer
San Francisco, CA | 2022 - Present
- Spearheaded the core transactional ledger migration to an active-active multi-region Go service processing over 4,200,000 queries per second (QPS) with p99 latency under 12ms.
- Architected an idempotency caching layer utilizing distributed Redis clusters and Paxos-based consensus, eliminating duplicate transaction charges during network partitions and recovering $1.4M/mo in potential dispute overhead.
- Reduced AWS compute expenditure by $2.8M annually through custom eBPF-based traffic routing and automated Kubernetes pod packing algorithms.
- Directly mentored 6 senior engineers and led the Systems Architecture Review Board overseeing RFCs across 40+ engineering squads.

DATADOG | Senior Systems Engineer
New York, NY (Remote) | 2019 - 2022
- Designed and deployed a high-scale telemetry ingestion engine handling 18 TB/day of distributed trace spans using Rust and Apache Kafka.
- Replaced legacy Java deserialization pipeline with zero-copy Rust streaming parser, cutting memory footprint by 58% and p95 ingestion delay from 3.2s to 180ms.
- Engineered automatic partition rebalancing algorithm for Kafka clusters across 6 AWS availability zones without message dropping or consumer group lag spikes.
- Authored Datadog open-source trace collector plugins adopted by over 450 enterprise customers.

CLOUDFLARE | Software Engineer II (Edge Platforms)
San Francisco, CA | 2016 - 2019
- Built edge worker caching rules in C++ and Lua across 200+ PoPs, serving 35 billion requests daily with sub-millisecond edge response times.
- Co-implemented TLS 1.3 zero-RTT handshake optimizations reducing mobile time-to-first-byte (TTFB) by 28% across high-latency cellular networks.
- Participated in weekly on-call rotation maintaining 99.999% edge gateway uptime during multi-terabit DDoS incidents.

EDUCATION
UNIVERSITY OF CALIFORNIA, BERKELEY
Bachelor of Science in Electrical Engineering & Computer Science (EECS) | 2012 - 2016
- Dean’s Honor List
- Undergraduate Research Assistant at AMPLab (Distributed Systems & Spark optimization)`
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    headline: 'Lead Product Manager | Growth, AI Platforms & Enterprise SaaS',
    email: 'marcus.chen@alum.mit.edu',
    phone: '+1 (206) 555-0189',
    location: 'Seattle, WA (Hybrid/Remote)',
    linkedin: 'linkedin.com/in/marcus-chen-pm',
    portfolio: 'marcuspm.co',
    summary: 'Lead Product Manager with 8+ years scaling B2B SaaS and consumer marketplaces from pre-revenue to $45M+ ARR. Proven track record at Airbnb and Linear leading zero-to-one product incubation, PLG onboarding funnels, and enterprise AI workflow automation. Adept at driving cross-functional alignment between engineering, ML research, product marketing, and executive stakeholders.',
    uploadedAt: '2026-10-20',
    fileName: 'Marcus_Chen_Lead_Product_Manager.pdf',
    skills: [
      {
        category: 'Product Strategy & Discovery',
        items: ['0-to-1 Product Incubation', 'Product-Led Growth (PLG)', 'User Research & Synthesis', 'Pricing & Packaging', 'Enterprise Tier Segmentation']
      },
      {
        category: 'Technical & Analytical',
        items: ['SQL / BigQuery', 'A/B Testing (Statsig, Amplitude)', 'Figma Prototyping', 'LLM Workflow Design', 'API Specifications', 'System Telemetry']
      },
      {
        category: 'Leadership & Execution',
        items: ['Agile / Sprint Planning', 'OKRs & North Star Metrics', 'Board-level Communication', 'Managing PMs & Designers', 'Sales Enablement']
      }
    ],
    experience: [
      {
        company: 'Linear',
        role: 'Lead Product Manager, Workflows & Intelligence',
        period: '2023 - Present',
        location: 'Seattle, WA (Remote)',
        highlights: [
          'Led product vision and rollout of Linear Asks & AI Triage, scaling adoption to 2,400+ enterprise accounts and generating $8.2M Net New ARR in 14 months.',
          'Revamped workspace invite and onboarding funnel, increasing Day-14 team activation rate from 34% to 51% via behavioral nudge sequencing.',
          'Managed cross-functional squad of 11 engineers, 2 product designers, and 1 dedicated ML researcher with 98% on-time roadmap velocity.'
        ]
      },
      {
        company: 'Airbnb',
        role: 'Senior Product Manager, Host Operations & Marketplace Trust',
        period: '2020 - 2023',
        location: 'San Francisco, CA',
        highlights: [
          'Owned Host Identity & Instant Verification platform; reduced reservation fraud claims by 42% while improving checkout conversion by 1.8%.',
          'Launched automated smart cancellation policy assistant, deflecting 320,000 monthly customer support tickets and saving $4.6M in seasonal dispute refunds.',
          'Spearheaded host price optimization algorithms driving +8.4% average revenue per active listing across North American vacation markets.'
        ]
      },
      {
        company: 'Microsoft',
        role: 'Product Manager, Azure Developer Tools',
        period: '2017 - 2020',
        location: 'Redmond, WA',
        highlights: [
          'Defined product roadmap for VS Code Azure Extensions; expanded monthly active users from 450K to 2.1M developers.',
          'Partnered with enterprise customers (Boeing, Ford) to integrate automated CI/CD deployment hooks, reducing support turnaround by 35%.'
        ]
      }
    ],
    education: [
      {
        institution: 'Massachusetts Institute of Technology (MIT)',
        degree: 'Bachelor of Science in Computer Science & Economics',
        period: '2013 - 2017',
        details: ['President of MIT TechX', 'Graduated with Tau Beta Pi honors']
      }
    ],
    sections: [
      {
        id: 'sec-summary',
        title: 'Executive Summary',
        pageNumber: 1,
        content: [
          'Lead Product Manager with 8+ years scaling B2B SaaS and consumer marketplaces from pre-revenue to $45M+ ARR.',
          'Proven track record at Airbnb and Linear leading zero-to-one product incubation, PLG onboarding, and AI workflow automation.',
          'Expertise in product strategy, A/B testing at scale, enterprise SaaS pricing, and cross-functional leadership.'
        ]
      },
      {
        id: 'sec-exp-linear',
        title: 'Linear Experience',
        pageNumber: 1,
        content: [
          'Led Linear Asks & AI Triage product rollout, achieving adoption in 2,400+ enterprise accounts and generating $8.2M Net New ARR in 14 months.',
          'Increased Day-14 team activation rate from 34% to 51% through behavioral nudge sequencing and frictionless onboarding.',
          'Managed cross-functional squad of 11 engineers, 2 designers, and 1 ML researcher.'
        ]
      },
      {
        id: 'sec-exp-airbnb',
        title: 'Airbnb Experience',
        pageNumber: 2,
        content: [
          'Host Identity & Instant Verification platform reduced reservation fraud claims by 42% while raising checkout conversion by 1.8%.',
          'Automated smart cancellation policy deflecting 320,000 monthly customer tickets and saving $4.6M in seasonal dispute refunds.',
          'Drove host price optimization algorithm delivering +8.4% average revenue per active listing.'
        ]
      },
      {
        id: 'sec-skills-edu',
        title: 'Skills & Education',
        pageNumber: 2,
        content: [
          'Skills: Product Incubation, PLG, SQL, BigQuery, Statsig, Figma, API Design, Agile, OKRs.',
          'Education: B.S. Computer Science & Economics from MIT (2013 - 2017). Tau Beta Pi honors.'
        ]
      }
    ],
    rawText: `MARCUS CHEN
Seattle, WA | +1 (206) 555-0189 | marcus.chen@alum.mit.edu | marcuspm.co | linkedin.com/in/marcus-chen-pm

EXECUTIVE SUMMARY
Lead Product Manager with 8+ years scaling B2B SaaS and consumer marketplaces from pre-revenue to $45M+ ARR. Proven track record at Airbnb and Linear leading zero-to-one product incubation, PLG onboarding funnels, and enterprise AI workflow automation. Adept at driving cross-functional alignment between engineering, ML research, product marketing, and executive stakeholders.

EXPERIENCE

LINEAR | Lead Product Manager, Workflows & Intelligence
Seattle, WA (Remote) | 2023 - Present
- Led product vision and rollout of Linear Asks & AI Triage, scaling adoption to 2,400+ enterprise accounts and generating $8.2M Net New ARR in 14 months.
- Revamped workspace invite and onboarding funnel, increasing Day-14 team activation rate from 34% to 51% via behavioral nudge sequencing.
- Managed cross-functional squad of 11 engineers, 2 product designers, and 1 dedicated ML researcher with 98% on-time roadmap velocity.

AIRBNB | Senior Product Manager, Host Operations & Marketplace Trust
San Francisco, CA | 2020 - 2023
- Owned Host Identity & Instant Verification platform; reduced reservation fraud claims by 42% while improving checkout conversion by 1.8%.
- Launched automated smart cancellation policy assistant, deflecting 320,000 monthly customer support tickets and saving $4.6M in seasonal dispute refunds.
- Speared host price optimization algorithms driving +8.4% average revenue per active listing across North American vacation markets.

MICROSOFT | Product Manager, Azure Developer Tools
Redmond, WA | 2017 - 2020
- Defined product roadmap for VS Code Azure Extensions; expanded monthly active users from 450K to 2.1M developers.
- Partnered with enterprise customers (Boeing, Ford) to integrate automated CI/CD deployment hooks, reducing support turnaround by 35%.

EDUCATION
MASSACHUSETTS INSTITUTE OF TECHNOLOGY (MIT)
Bachelor of Science in Computer Science & Economics | 2013 - 2017
- President of MIT TechX | Tau Beta Pi Honors Engineering Society`
  },
  {
    id: 'sophia-alvarez',
    name: 'Sophia Alvarez',
    headline: 'Senior Full-Stack Engineer & Design Systems Architect',
    email: 'sophia.alvarez@devcraft.io',
    phone: '+1 (512) 744-9021',
    location: 'Austin, TX (Hybrid/Remote)',
    linkedin: 'linkedin.com/in/sophia-alvarez-eng',
    github: 'github.com/sophia-alvarez',
    portfolio: 'sophia-codes.design',
    summary: 'Senior Full-Stack Software Engineer with 7+ years building high-performance web applications, accessible design systems, and real-time collaborative workspaces. Core expertise in React 19, TypeScript, Next.js, Node.js, GraphQL, Tailwind CSS, and WebGL/Canvas rendering. Passionate about sub-50ms user interactions, WCAG AAA accessibility, and engineering bridge between design and code.',
    uploadedAt: '2026-10-28',
    fileName: 'Sophia_Alvarez_Senior_FullStack.pdf',
    skills: [
      {
        category: 'Frontend & UI Engineering',
        items: ['React 19 / 18', 'TypeScript', 'Next.js (App Router)', 'Tailwind CSS', 'Radix UI / Headless UI', 'Web Workers', 'Canvas 2D / WebGL', 'Framer Motion']
      },
      {
        category: 'Backend & APIs',
        items: ['Node.js', 'Express', 'GraphQL (Apollo / Nexus)', 'PostgreSQL', 'Prisma ORM', 'Redis', 'WebSockets', 'REST APIs', 'Docker']
      },
      {
        category: 'Quality & Accessibility',
        items: ['WCAG 2.2 AAA Compliance', 'Jest & Playwright E2E', 'Lighthouse 98+ Perf Optimization', 'Design Tokens & Multi-Brand Architecture']
      }
    ],
    experience: [
      {
        company: 'Figma Ecosystem / Plugins Partner',
        role: 'Senior Staff Frontend Architect',
        period: '2022 - Present',
        location: 'Austin, TX',
        highlights: [
          'Engineered a real-time collaborative asset management plugin used by over 140,000 design teams, synchronizing canvas nodes over WebSockets with <35ms latency.',
          'Built custom WebGL-accelerated vector rendering canvas supporting 50,000+ interactive SVG layers at steady 60 FPS.',
          'Established multi-brand Design System component library in React/TypeScript with 100% test coverage and zero reported accessibility regressions across 18 enterprise client apps.'
        ]
      },
      {
        company: 'Vercel Partner Agency',
        role: 'Senior Full-Stack Engineer',
        period: '2019 - 2022',
        location: 'Austin, TX',
        highlights: [
          'Architected Next.js and GraphQL e-commerce storefront for luxury retail client handling $120M in Black Friday GMV with zero downtime.',
          'Optimized Core Web Vitals across 80+ customer templates, achieving aggregate LCP < 1.1s and INP < 60ms, increasing checkout conversion rate by 14.2%.',
          'Migrated monolithic REST API to federated Apollo GraphQL gateway, reducing mobile client payload sizes by 47%.'
        ]
      }
    ],
    education: [
      {
        institution: 'University of Texas at Austin',
        degree: 'Bachelor of Science in Computer Science',
        period: '2015 - 2019',
        details: ['Honors Computer Science Program', 'First Place in UT Hackathon 2018']
      }
    ],
    sections: [
      {
        id: 'sec-summary',
        title: 'Summary',
        pageNumber: 1,
        content: [
          'Senior Full-Stack Engineer with 7+ years building high-performance web apps, accessible design systems, and real-time collaboration engines.',
          'Expertise in React 19, TypeScript, Next.js, Node.js, GraphQL, Tailwind CSS, Canvas 2D/WebGL, and sub-50ms interaction tuning.'
        ]
      },
      {
        id: 'sec-exp-figma',
        title: 'Experience - Figma Partner',
        pageNumber: 1,
        content: [
          'Engineered real-time collaborative asset manager used by 140,000+ design teams with <35ms latency over WebSockets.',
          'Built custom WebGL vector canvas handling 50,000+ interactive layers at 60 FPS.',
          'Architected multi-brand design system in React/TypeScript with 100% test coverage and WCAG AAA compliance.'
        ]
      },
      {
        id: 'sec-exp-agency',
        title: 'Experience - Full-Stack Agency',
        pageNumber: 2,
        content: [
          'Architected Next.js & GraphQL platform handling $120M Black Friday GMV with 0 downtime.',
          'Optimized Core Web Vitals achieving LCP < 1.1s and INP < 60ms, lifting checkout conversions by 14.2%.',
          'Migrated REST monolith to Apollo GraphQL reducing payload sizes by 47%.'
        ]
      },
      {
        id: 'sec-skills-edu',
        title: 'Skills & Education',
        pageNumber: 2,
        content: [
          'Skills: React 19, TypeScript, Next.js, Tailwind CSS, WebGL, Node.js, GraphQL, PostgreSQL, Prisma, WebSockets, WCAG AAA.',
          'Education: B.S. Computer Science from UT Austin (2015 - 2019). Honors Program.'
        ]
      }
    ],
    rawText: `SOPHIA ALVAREZ
Austin, TX | +1 (512) 744-9021 | sophia.alvarez@devcraft.io | sophia-codes.design | github.com/sophia-alvarez

EXECUTIVE SUMMARY
Senior Full-Stack Software Engineer with 7+ years building high-performance web applications, accessible design systems, and real-time collaborative workspaces. Core expertise in React 19, TypeScript, Next.js, Node.js, GraphQL, Tailwind CSS, and WebGL/Canvas rendering. Passionate about sub-50ms user interactions, WCAG AAA accessibility, and engineering bridge between design and code.

EXPERIENCE

FIGMA ECOSYSTEM / PLUGINS PARTNER | Senior Staff Frontend Architect
Austin, TX | 2022 - Present
- Engineered a real-time collaborative asset management plugin used by over 140,000 design teams, synchronizing canvas nodes over WebSockets with <35ms latency.
- Built custom WebGL-accelerated vector rendering canvas supporting 50,000+ interactive SVG layers at steady 60 FPS.
- Established multi-brand Design System component library in React/TypeScript with 100% test coverage and zero reported accessibility regressions across 18 enterprise client apps.

VERCEL PARTNER AGENCY | Senior Full-Stack Engineer
Austin, TX | 2019 - 2022
- Architected Next.js and GraphQL e-commerce storefront for luxury retail client handling $120M in Black Friday GMV with zero downtime.
- Optimized Core Web Vitals across 80+ customer templates, achieving aggregate LCP < 1.1s and INP < 60ms, increasing checkout conversion rate by 14.2%.
- Migrated monolithic REST API to federated Apollo GraphQL gateway, reducing mobile client payload sizes by 47%.

EDUCATION
UNIVERSITY OF TEXAS AT AUSTIN
Bachelor of Science in Computer Science | 2015 - 2019
- Honors Computer Science Program | First Place UT Hackathon 2018`
  }
];
