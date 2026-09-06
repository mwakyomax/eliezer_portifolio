import { DEFAULT_PROFILE_IMAGE, DEFAULT_MARKET_IMAGE, DEFAULT_HOSPITAL_IMAGE } from '../../server/data/store';
export { DEFAULT_PROFILE_IMAGE, DEFAULT_MARKET_IMAGE, DEFAULT_HOSPITAL_IMAGE };
import { Project, Skill, Experience, Education, Certification, Service, BlogArticle } from '../types';

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  itemCount: string;
  iconName: 'Code' | 'Smartphone' | 'Cpu' | 'Database' | 'Server' | 'Layout' | 'Terminal' | 'Network' | 'Wifi';
  description: string;
}

export const PORTFOLIO_SETTINGS = {
  fullName: 'Elieza Mwakyoma',
  title: 'Software Developer & Networker | B.Sc. in Computer Science',
  tagline: 'Building digital solutions and scalable software for everyone 🟡',
  bio: "I hold a Bachelor of Science in Computer Science and work as a software developer and network specialist based in Dar es Salaam, Tanzania. I specialize in building responsive full-stack web applications, native Android tools, network infrastructure configurations, and resilient software systems that solve real-world problems.",
  profileImage: DEFAULT_PROFILE_IMAGE,
  cvUrl: '/cv/Elieza_Mwakyoma_CV.pdf',
  location: 'Dar es Salaam, Tanzania',
  email: 'eliezaeliezer1318@gmail.com',
  phone: '+255 629 899 017',
  stats: {
    projectsCompleted: 12,
    technologiesMastered: 18,
    yearsExperience: 3,
    certificationsCount: 5,
    rating: 4.9,
    satisfiedUsers: '2.5k+'
  },
  socialLinks: {
    github: 'https://github.com/mwakyomax',
    linkedin: 'https://linkedin.com/in/eliezamwakyoma',
    email: 'eliezaeliezer1318@gmail.com',
    twitter: 'https://twitter.com/eliezamwakyoma'
  }
};

export const DOMAIN_CATEGORIES: PortfolioCategory[] = [
  {
    id: 'cat-1',
    name: 'Full-Stack Web',
    slug: 'Web Development',
    itemCount: '6+ Projects',
    iconName: 'Code',
    description: 'Modern React, Node.js, Express & MongoDB web architectures'
  },
  {
    id: 'cat-2',
    name: 'Mobile Apps',
    slug: 'Mobile',
    itemCount: '3+ Projects',
    iconName: 'Smartphone',
    description: 'Native Android applications with SQLite offline-first sync'
  },
  {
    id: 'cat-3',
    name: 'Networking & Systems',
    slug: 'Networking',
    itemCount: '5+ Setups',
    iconName: 'Server',
    description: 'TCP/IP routing, Cisco Packet Tracer, subnetting & network security'
  },
  {
    id: 'cat-4',
    name: 'Database Architecture',
    slug: 'Database',
    itemCount: '5+ Systems',
    iconName: 'Database',
    description: 'Normalized MySQL schemas, MongoDB indexing & data modeling'
  },
  {
    id: 'cat-5',
    name: 'Cloud & DevOps',
    slug: 'DevOps',
    itemCount: '10+ Deploys',
    iconName: 'Terminal',
    description: 'Linux systems, Docker containers, CI/CD & REST API security'
  },
  {
    id: 'cat-6',
    name: 'UI/UX & Frontend',
    slug: 'UI/UX',
    itemCount: '8+ Interfaces',
    iconName: 'Layout',
    description: 'Tailwind CSS, TypeScript, fluid micro-interactions & clean design'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    _id: 'proj_1',
    id: 'proj_1',
    title: 'Mwakyoma Online Market',
    description: 'A full-stack e-commerce web platform designed for merchants and consumers with real-time product filtering, secure JWT auth, shopping cart, and order tracking.',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
    image: DEFAULT_MARKET_IMAGE,
    githubUrl: 'https://github.com/mwakyomax/mwakyoma-online-market',
    liveUrl: 'https://market.eliezamwakyoma.dev',
    featured: true,
    problemStatement: 'Local merchants in urban retail hubs often struggle with fragmented physical inventories and lack an intuitive digital storefront to reach online consumers.',
    solution: 'Engineered a high-performance web storefront with dynamic search, multi-category catalogs, localized price formatting, and automated order confirmation with inventory sync.',
    features: [
      'Dynamic product catalog with multi-facet filtering',
      'Secure user authentication with JWT & role-based middleware',
      'Persistent cart drawer with real-time price calculation',
      'Merchant administrative dashboard for stock & order status'
    ]
  },
  {
    _id: 'proj_2',
    id: 'proj_2',
    title: 'Smart Hospital Queueing System',
    description: 'An automated hospital patient queue management system reducing waiting room congestion and efficiently prioritizing urgent clinical cases.',
    category: 'Algorithms',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'WebSockets'],
    image: DEFAULT_HOSPITAL_IMAGE,
    githubUrl: 'https://github.com/mwakyomax/smart-hospital-queue',
    liveUrl: 'https://queue.eliezamwakyoma.dev',
    featured: true,
    problemStatement: 'Unpredictable patient arrivals and manual clipboard triage cause severe waiting room overcrowding, doctor burnout, and delayed emergency treatment.',
    solution: 'Developed an automated digital triage system with structured priority scoring, real-time ticket monitors, and an intuitive doctor workstation interface.',
    features: [
      'Digital kiosk ticket generation with estimated wait times',
      'Priority triage scoring algorithm for emergency cases',
      'Live doctor calling interface with audio/visual status sync',
      'Hospital analytics dashboard for queue throughput and peak hours'
    ]
  },
  {
    _id: 'proj_3',
    id: 'proj_3',
    title: 'MwakyomaX Productivity Android App',
    description: 'An offline-first Android productivity utility tailored for university students to track coursework, calculate GPA, and manage exam timetables.',
    category: 'Mobile',
    technologies: ['Android Studio', 'Java', 'SQLite', 'XML Layouts', 'Material Design'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/mwakyomax/mwakyomax-android',
    liveUrl: 'https://github.com/mwakyomax/mwakyomax-android',
    featured: true,
    problemStatement: 'Students in areas with intermittent internet connectivity need reliable offline tools to organize complex course schedules and track academic milestones.',
    solution: 'Built a lightweight native Android application backed by SQLite local persistence with customizable notification alarms and quick GPA calculation tools.',
    features: [
      '100% offline functionality using local SQLite database',
      'Interactive semester timetable & assignment reminder alarms',
      'Cumulative & semester GPA predictor calculator',
      'Clean Material Design interface with Dark & Light theme options'
    ]
  },
  {
    _id: 'proj_4',
    id: 'proj_4',
    title: 'Skill Exchange Community Platform',
    description: 'A peer-to-peer knowledge sharing web app where users exchange skills (coding, design, languages) using a time-banking credit balance ledger.',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/mwakyomax/skill-exchange-platform',
    liveUrl: 'https://skillexchange.eliezamwakyoma.dev',
    featured: true,
    problemStatement: 'Many motivated students cannot afford expensive commercial bootcamps despite possessing valuable skills that peers are eager to learn.',
    solution: 'Designed a time-banking credit system where tutoring hours earn time tokens redeemable for lessons from other community members.',
    features: [
      'Smart peer matching algorithm based on interests & availability',
      'Time-bank token ledger with transaction history',
      'Integrated real-time chat with Socket.io messaging',
      'User ratings, verification badges, and peer reviews'
    ]
  },
  {
    _id: 'proj_5',
    id: 'proj_5',
    title: 'Student Academic Management System',
    description: 'An enterprise relational database web application for university faculties to manage student enrollments, course catalogs, and automated grade transcripts.',
    category: 'Database',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/mwakyomax/student-management-system',
    liveUrl: 'https://github.com/mwakyomax/student-management-system',
    featured: false,
    problemStatement: 'Educational departments often suffer from data redundancy and grading inconsistencies due to disparate spreadsheet files.',
    solution: 'Constructed an ACID-compliant MySQL relational database with strict foreign key constraints and role-based access control for lecturers and students.',
    features: [
      'Role-based security (Registrar Admin, Lecturer, Student)',
      'Automated semester GPA computation & PDF transcript generation',
      'Course prerequisite validation and enrollment locks',
      'Audit log tracking for grade modifications'
    ]
  },
  {
    _id: 'proj_6',
    id: 'proj_6',
    title: 'Integrated Hospital Operations Portal',
    description: 'A comprehensive healthcare management dashboard overseeing patient admission records, doctor appointment scheduling, and pharmacy inventories.',
    category: 'Web Development',
    technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/mwakyomax/hospital-management-system',
    liveUrl: 'https://github.com/mwakyomax/hospital-management-system',
    featured: false,
    problemStatement: 'Small and medium clinics require affordable digital systems to manage patient records and avoid prescription stockouts.',
    solution: 'Crafted a modular MERN stack portal handling electronic medical records (EMR), doctor appointment schedules, and pharmacy restock alerts.',
    features: [
      'Electronic Health Record (EHR) entry & diagnosis history',
      'Doctor appointment calendar with slot booking',
      'Pharmacy medication inventory with low-stock warnings',
      'Printable patient billing invoices and receipt generation'
    ]
  },
  {
    _id: 'proj_7',
    id: 'proj_7',
    title: 'Network Packet & Security Analyzer',
    description: 'A Python network diagnostic tool analyzing TCP/IP packets, detecting port anomalies, and logging traffic statistics for security auditing.',
    category: 'Networking',
    technologies: ['Python', 'Scapy', 'Wireshark', 'Socket Programming', 'Tkinter'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/mwakyomax/network-packet-analyzer',
    liveUrl: 'https://github.com/mwakyomax/network-packet-analyzer',
    featured: false,
    problemStatement: 'System administrators need lightweight, scriptable tools to monitor unusual network packet bursts without heavy enterprise overhead.',
    solution: 'Implemented a packet capture and header decoding utility in Python using Scapy with visual throughput graphs and suspicious port alerts.',
    features: [
      'Real-time packet sniffing across Ethernet & Wi-Fi interfaces',
      'TCP/UDP header parsing and protocol breakdown',
      'Port scan detection and IP geolocation lookup',
      'Exportable CSV & PCAP security audit logs'
    ]
  },
  {
    _id: 'proj_8',
    id: 'proj_8',
    title: 'Modern Developer Portfolio & Headless CMS',
    description: 'An editorial developer portfolio featuring custom burgundy UI/UX design, real-time Express REST API, and interactive project dock.',
    category: 'UI/UX',
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Motion', 'Express', 'Vite'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/mwakyomax/elieza-developer-portfolio',
    liveUrl: 'https://eliezamwakyoma.dev',
    featured: true,
    problemStatement: 'Developers need a portfolio that balances rigorous technical depth with an editorial, human-centric aesthetic that stands out.',
    solution: 'Designed and built this high-contrast burgundy portfolio with modular architecture, custom SVG animations, live project search, and direct contact integration.',
    features: [
      'High-contrast editorial typography and bespoke color palette',
      'Full-stack Express backend with project & message management',
      'Interactive Project Dock to bookmark and export technical stacks',
      'Fast client-side routing with motion transitions'
    ]
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    title: 'Architecting Scalable Microservices with Node.js & Redis Caching',
    date: 'February 18, 2026',
    author: 'Elieza Mwakyoma',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How to decouple monolithic REST backends into resilient microservices while maintaining sub-50ms latency using in-memory Redis caching.',
    readTime: '6 min read',
    category: 'Backend Architecture',
    content: `When scaling web backends for high-concurrency traffic, monolithic Express servers often encounter bottlenecks in database I/O and CPU-bound middleware operations.

In this deep dive, I explore the architectural patterns used in building the Mwakyoma Online Market platform:
1. **Decoupling Services**: Isolating Authentication, Product Catalog, and Order Management into lightweight Express modules.
2. **Redis In-Memory Caching**: Caching high-frequency read operations (such as product categories and popular listings) with strict Time-To-Live (TTL) eviction policies.
3. **Connection Pooling**: Optimizing MongoDB connection pools to eliminate handshake latency during peak traffic spikes.

By implementing asynchronous job queues with BullMQ and caching database reads, we achieved an 80% reduction in average response latency under simulated load tests.`
  },
  {
    id: 'art-2',
    title: 'Optimizing Hospital Triage with Priority Queue Algorithms in Python',
    date: 'January 24, 2026',
    author: 'Elieza Mwakyoma',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Examining the mathematical algorithms behind the Smart Hospital Queue System to reduce emergency wait times and eliminate triage bottlenecks.',
    readTime: '8 min read',
    category: 'Algorithms & Architecture',
    content: `Traditional First-In, First-Out (FIFO) queue systems are fundamentally unsafe for medical environments. When emergency cases arrive, manual reshuffling leads to confusion and critical delays.

To solve this for our Smart Hospital Queue project, we designed a multi-level priority queue algorithm:
- **Dynamic Severity Scoring**: Assigning weight coefficients based on vital indicators (SpO2, heart rate, pain scale) and elapsed waiting duration to prevent starvation.
- **WebSocket Synchronization**: Broadcasting instant updates to doctor consultation terminals and waiting area display screens in real-time.
- **Simulation Results**: In benchmark simulations with 500 patient batches, emergency case treatment latency was reduced by 64% without causing severe delays for routine outpatients.`
  },
  {
    id: 'art-3',
    title: 'Offline-First Mobile Architecture: SQLite Synchronization in Android',
    date: 'December 12, 2025',
    author: 'Elieza Mwakyoma',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'A practical guide to building resilient Android productivity tools that function seamlessly without constant internet connectivity.',
    readTime: '5 min read',
    category: 'Mobile Engineering',
    content: `In emerging markets and university campuses, reliable internet connectivity cannot be taken for granted. Software must be built with an offline-first philosophy.

In developing the MwakyomaX Android utility application, we adhered to three core principles:
1. **Local-First Truth**: The SQLite database acts as the single source of truth for the UI layer via Room persistence abstraction.
2. **Delta Sync Queues**: Changes made offline are recorded in a lightweight local transaction ledger with UUID timestamping.
3. **Background Sync Worker**: Android WorkManager monitors network availability and securely pushes batched updates to the cloud API when connectivity is restored.`
  }
];

export const SKILLS_DATA: Skill[] = [
  // Programming Languages
  { _id: 'sk_1', name: 'Python', category: 'Languages', proficiency: 90, icon: 'Code' },
  { _id: 'sk_2', name: 'Java', category: 'Languages', proficiency: 85, icon: 'Code' },
  { _id: 'sk_3', name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 92, icon: 'Code' },
  { _id: 'sk_4', name: 'TypeScript', category: 'Languages', proficiency: 88, icon: 'Code' },
  { _id: 'sk_php', name: 'PHP', category: 'Languages', proficiency: 85, icon: 'Code' },
  { _id: 'sk_5', name: 'C / C++', category: 'Languages', proficiency: 80, icon: 'Code' },
  { _id: 'sk_6', name: 'SQL', category: 'Languages', proficiency: 90, icon: 'Database' },

  // Frontend
  { _id: 'sk_7', name: 'React.js', category: 'Frontend', proficiency: 92, icon: 'Layout' },
  { _id: 'sk_8', name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, icon: 'Layout' },
  { _id: 'sk_9', name: 'HTML5 & Modern CSS', category: 'Frontend', proficiency: 95, icon: 'Layout' },
  { _id: 'sk_10', name: 'Motion / Animations', category: 'Frontend', proficiency: 85, icon: 'Layout' },

  // Backend & APIs
  { _id: 'sk_11', name: 'Node.js', category: 'Backend', proficiency: 90, icon: 'Server' },
  { _id: 'sk_12', name: 'Express.js', category: 'Backend', proficiency: 92, icon: 'Server' },
  { _id: 'sk_django', name: 'Django', category: 'Backend', proficiency: 88, icon: 'Server' },
  { _id: 'sk_13', name: 'RESTful API Design', category: 'Backend', proficiency: 94, icon: 'Server' },

  // Databases
  { _id: 'sk_15', name: 'MongoDB & Mongoose', category: 'Databases', proficiency: 90, icon: 'Database' },
  { _id: 'sk_16', name: 'MySQL & Relational SQL', category: 'Databases', proficiency: 88, icon: 'Database' },
  { _id: 'sk_17', name: 'PostgreSQL', category: 'Databases', proficiency: 82, icon: 'Database' },
  { _id: 'sk_18', name: 'SQLite', category: 'Databases', proficiency: 86, icon: 'Database' },

  // Tools & DevOps
  { _id: 'sk_19', name: 'Git & GitHub Workflow', category: 'DevOps & Tools', proficiency: 92, icon: 'Terminal' },
  { _id: 'sk_20', name: 'Linux / Bash Scripting', category: 'DevOps & Tools', proficiency: 86, icon: 'Terminal' },
  { _id: 'sk_21', name: 'Android Studio', category: 'DevOps & Tools', proficiency: 82, icon: 'Smartphone' },
  { _id: 'sk_22', name: 'Docker Containers', category: 'DevOps & Tools', proficiency: 78, icon: 'Cpu' },
  { _id: 'sk_23', name: 'Postman API Testing', category: 'DevOps & Tools', proficiency: 90, icon: 'Terminal' },

  // Network & Systems
  { _id: 'sk_24', name: 'Cisco Packet Tracer', category: 'Network & Systems', proficiency: 88, icon: 'Network' },
  { _id: 'sk_25', name: 'TCP/IP & Routing Protocols', category: 'Network & Systems', proficiency: 86, icon: 'Wifi' },
  { _id: 'sk_26', name: 'Network Configuration & Subnetting', category: 'Network & Systems', proficiency: 85, icon: 'Network' },
  { _id: 'sk_27', name: 'System Administration & Security', category: 'Network & Systems', proficiency: 82, icon: 'Shield' }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    _id: 'exp_1',
    title: 'Software Developer & Project Lead',
    company: 'St. Joseph University Computer Science Lab',
    location: 'Dar es Salaam, Tanzania',
    startDate: 'Oct 2024',
    endDate: 'Present',
    current: true,
    description: [
      'Architected full-stack web applications and academic management tools using React, Node.js, and MongoDB.',
      'Implemented secure RESTful API architectures with JWT authentication, rate limiting, and role-based access control.',
      'Mentored 20+ junior developers and peers in modern Git branching workflows, data structures, and responsive UI engineering.'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Java', 'Git', 'Linux']
  },
  {
    _id: 'exp_2',
    title: 'IT & Network Systems Intern',
    company: 'Tanzania Technology Solutions',
    location: 'Dar es Salaam, Tanzania',
    startDate: 'Jul 2024',
    endDate: 'Sep 2024',
    current: false,
    description: [
      'Configured local area network (LAN) switches and routers using Cisco Packet Tracer and CLI tooling.',
      'Performed SQL database maintenance, query optimization, and periodic backup routines for internal ERP systems.',
      'Assisted senior engineers in troubleshooting backend API endpoints and system permission policies.'
    ],
    technologies: ['Networking', 'Cisco Packet Tracer', 'MySQL', 'Python', 'Linux']
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    _id: 'edu_1',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'St. Joseph University in Tanzania (SJUIT)',
    fieldOfStudy: 'Computer Science & Software Engineering',
    startDate: '2022',
    endDate: '2026 — Completed (Graduate)',
    grade: 'First Class Honours',
    activities: 'Lead Developer, Computer Science Society, Algorithm Study Group'
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    _id: 'cert_1',
    name: 'Cisco CCNA Network Fundamentals',
    issuer: 'Cisco Networking Academy',
    issueDate: '2024',
    credentialUrl: 'https://cisco.com/verify/ccna'
  },
  {
    _id: 'cert_2',
    name: 'Meta Full-Stack Web Development Specialization',
    issuer: 'Meta / Coursera',
    issueDate: '2024',
    credentialUrl: 'https://coursera.org/verify/meta-fswd'
  },
  {
    _id: 'cert_3',
    name: 'MongoDB Certified Developer Associate',
    issuer: 'MongoDB University',
    issueDate: '2025',
    credentialUrl: 'https://university.mongodb.com/verify'
  }
];
