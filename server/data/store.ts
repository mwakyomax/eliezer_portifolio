import bcrypt from 'bcryptjs';

// Pre-generated images
export const DEFAULT_PROFILE_IMAGE = '/src/assets/images/elieza_official_portrait_1788279969619.jpg';
export const DEFAULT_MARKET_IMAGE = '/src/assets/images/project_market_1786536018642.jpg';
export const DEFAULT_HOSPITAL_IMAGE = '/src/assets/images/project_hospital_1786536031716.jpg';

export interface InMemoryStore {
  admin: any;
  projects: any[];
  skills: any[];
  experience: any[];
  education: any[];
  certifications: any[];
  services: any[];
  messages: any[];
  settings: any;
}

const initialPasswordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'adminpassword123', 10);

export const memoryStore: InMemoryStore = {
  admin: {
    _id: 'admin_1',
    email: process.env.ADMIN_EMAIL || 'admin@eliezamwakyoma.com',
    password: initialPasswordHash,
    name: 'Elieza Mwakyoma',
    createdAt: new Date()
  },
  settings: {
    _id: 'settings_1',
    fullName: 'Elieza Mwakyoma',
    title: 'Software Developer & Networker | B.Sc. in Computer Science',
    bio: 'I hold a Bachelor of Science in Computer Science and work as a software developer and network specialist. I specialize in building full-stack web applications, network architectures, databases, and cybersecurity tools that solve real-world problems.',
    profileImage: DEFAULT_PROFILE_IMAGE,
    cvUrl: '/cv/Elieza_Mwakyoma_CV.pdf',
    statistics: {
      projectsCompleted: 12,
      technologiesMastered: 18,
      yearsExperience: 3,
      certificationsCount: 5
    },
    socialLinks: {
      github: 'https://github.com/mwakyomax',
      linkedin: 'https://linkedin.com/in/eliezamwakyoma',
      email: 'eliezaeliezer1318@gmail.com',
      twitter: 'https://twitter.com/eliezamwakyoma'
    },
    contactInfo: {
      location: 'Dar es Salaam, Tanzania',
      phone: '+255 629 899 017'
    },
    updatedAt: new Date()
  },
  projects: [
    {
      _id: 'proj_1',
      title: 'Mwakyoma Online Market',
      description: 'An e-commerce platform designed to allow customers to browse products, add items to cart, and place orders online with real-time order tracking.',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
      image: DEFAULT_MARKET_IMAGE,
      githubUrl: 'https://github.com/mwakyomax/mwakyoma-online-market',
      liveUrl: 'https://market.eliezamwakyoma.dev',
      featured: true,
      problemStatement: 'Local merchants in urban centers lack streamlined digital storefronts to manage product inventory and connect directly with online consumers.',
      solution: 'Built a lightweight, responsive e-commerce web platform featuring dynamic search, multi-category navigation, localized currency display, and automated order confirmation.',
      features: ['Dynamic product catalog with filtering', 'Secure user authentication & cart management', 'Admin inventory & stock tracking', 'Responsive checkout flow'],
      screenshots: [DEFAULT_MARKET_IMAGE],
      createdAt: new Date('2025-11-15')
    },
    {
      _id: 'proj_2',
      title: 'Smart Hospital Queueing Management System',
      description: 'A system designed to improve hospital patient queue management, reducing waiting room overcrowding and prioritizing emergency cases.',
      category: 'Algorithms',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'WebSockets'],
      image: DEFAULT_HOSPITAL_IMAGE,
      githubUrl: 'https://github.com/mwakyomax/smart-hospital-queue',
      liveUrl: 'https://queue.eliezamwakyoma.dev',
      featured: true,
      problemStatement: 'Unpredictable patient intake and manual queue management leads to severe hospital triage bottlenecks and long wait times.',
      solution: 'Developed an automated queue triage system using priority algorithms and real-time waiting room status displays for patients and triage nurses.',
      features: ['Real-time patient ticket generation', 'Triage priority queue algorithm', 'Doctor workstation caller interface', 'Analytics dashboard for hospital admins'],
      screenshots: [DEFAULT_HOSPITAL_IMAGE],
      createdAt: new Date('2025-12-01')
    },
    {
      _id: 'proj_3',
      title: 'MwakyomaX',
      description: 'An Android application project focusing on utilities, task management, and offline-first mobile productivity tools for students.',
      category: 'Mobile',
      technologies: ['Android Studio', 'Java', 'SQLite', 'REST APIs', 'XML Layouts'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/mwakyomax/mwakyomax-android',
      liveUrl: '',
      featured: true,
      problemStatement: 'Students need an integrated mobile utility tool to schedule study sessions, manage deadlines, and track academic assignments offline.',
      solution: 'Created an Android app with SQLite local database caching, material design interfaces, and custom notification reminders.',
      features: ['Offline-first SQLite local storage', 'Custom material notifications', 'Course schedule timetable planner', 'GPA calculator module'],
      screenshots: [],
      createdAt: new Date('2025-08-10')
    },
    {
      _id: 'proj_4',
      title: 'Skill Exchange System',
      description: 'A peer-to-peer learning platform where users exchange knowledge and skills using a time-based credit balance system.',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/mwakyomax/skill-exchange-platform',
      liveUrl: 'https://skillexchange.eliezamwakyoma.dev',
      featured: false,
      problemStatement: 'Many learners lack funds for formal coding bootcamps but possess valuable reciprocal skills like language proficiency or graphic design.',
      solution: 'Designed a time-banking platform where tutoring hours earn time credits that can be spent learning other disciplines from community peers.',
      features: ['Peer skill matching algorithm', 'Time-bank credit wallet ledger', 'Integrated chat & video session links', 'User review & verification badges'],
      screenshots: [],
      createdAt: new Date('2025-09-20')
    },
    {
      _id: 'proj_5',
      title: 'Student Management System',
      description: 'A comprehensive web application for managing student information, course enrollments, grade records, and academic reporting.',
      category: 'Database',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Bootstrap'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/mwakyomax/student-management-system',
      liveUrl: '',
      featured: false,
      problemStatement: 'Educational institutions struggle with fragmented paper records and disparate spreadsheet files for student record keeping.',
      solution: 'Engineered a centralized relational database system with role-based access control for faculty, students, and registrar staff.',
      features: ['Role-based authorization (Admin, Teacher, Student)', 'Transcript generation & GPA calculation', 'Course enrollment management', 'Automated PDF grade sheet export'],
      screenshots: [],
      createdAt: new Date('2025-05-14')
    },
    {
      _id: 'proj_6',
      title: 'Hospital Management System',
      description: 'A system for managing hospital operations and users such as administrators, doctors, nurses, and patients.',
      category: 'Web Development',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/mwakyomax/hospital-management-system',
      liveUrl: '',
      featured: false,
      problemStatement: 'Healthcare facilities need integrated patient record management, doctor appointment scheduling, and pharmacy stock monitoring.',
      solution: 'Created an enterprise healthcare dashboard providing appointment scheduling, electronic medical records (EMR), and billing module.',
      features: ['Electronic Health Record (EHR) entry', 'Doctor availability appointment booking', 'Pharmacy inventory tracking', 'Patient invoice generation'],
      screenshots: [],
      createdAt: new Date('2025-03-22')
    }
  ],
  skills: [
    // Programming Languages
    { _id: 'skill_1', name: 'Python', category: 'Programming Languages', icon: 'code', level: 90 },
    { _id: 'skill_2', name: 'Java', category: 'Programming Languages', icon: 'code', level: 85 },
    { _id: 'skill_3', name: 'JavaScript', category: 'Programming Languages', icon: 'code', level: 92 },
    { _id: 'skill_4', name: 'TypeScript', category: 'Programming Languages', icon: 'code', level: 88 },
    { _id: 'skill_5', name: 'C', category: 'Programming Languages', icon: 'code', level: 75 },
    { _id: 'skill_6', name: 'C++', category: 'Programming Languages', icon: 'code', level: 80 },
    { _id: 'skill_7', name: 'PHP', category: 'Programming Languages', icon: 'code', level: 70 },
    { _id: 'skill_8', name: 'SQL', category: 'Programming Languages', icon: 'database', level: 90 },
    { _id: 'skill_9', name: 'C#', category: 'Programming Languages', icon: 'code', level: 72 },

    // Frontend
    { _id: 'skill_10', name: 'HTML5 / CSS3', category: 'Frontend', icon: 'layout', level: 95 },
    { _id: 'skill_11', name: 'React.js', category: 'Frontend', icon: 'atom', level: 90 },
    { _id: 'skill_12', name: 'Tailwind CSS', category: 'Frontend', icon: 'feather', level: 92 },
    { _id: 'skill_13', name: 'Bootstrap', category: 'Frontend', icon: 'layout', level: 85 },

    // Backend
    { _id: 'skill_14', name: 'Node.js', category: 'Backend', icon: 'server', level: 88 },
    { _id: 'skill_15', name: 'Express.js', category: 'Backend', icon: 'server', level: 90 },
    { _id: 'skill_16', name: 'Django', category: 'Backend', icon: 'layers', level: 80 },
    { _id: 'skill_17', name: 'REST APIs', category: 'Backend', icon: 'globe', level: 92 },

    // Databases
    { _id: 'skill_18', name: 'MongoDB', category: 'Databases', icon: 'database', level: 90 },
    { _id: 'skill_19', name: 'MySQL', category: 'Databases', icon: 'database', level: 88 },
    { _id: 'skill_20', name: 'PostgreSQL', category: 'Databases', icon: 'database', level: 82 },
    { _id: 'skill_21', name: 'SQLite', category: 'Databases', icon: 'database', level: 85 },

    // Tools & Platforms
    { _id: 'skill_22', name: 'Git & GitHub', category: 'Tools & Platforms', icon: 'git-branch', level: 92 },
    { _id: 'skill_23', name: 'Linux / Bash', category: 'Tools & Platforms', icon: 'terminal', level: 85 },
    { _id: 'skill_24', name: 'Android Studio', category: 'Tools & Platforms', icon: 'smartphone', level: 80 },
    { _id: 'skill_25', name: 'Postman', category: 'Tools & Platforms', icon: 'send', level: 90 },
    { _id: 'skill_26', name: 'Docker Containers', category: 'Tools & Platforms', icon: 'cpu', level: 78 },
    { _id: 'skill_27', name: 'MongoDB Compass', category: 'Tools & Platforms', icon: 'database', level: 88 },

    // Network & Systems
    { _id: 'skill_28', name: 'Cisco Packet Tracer', category: 'Network & Systems', icon: 'network', level: 88 },
    { _id: 'skill_29', name: 'TCP/IP & Routing Protocols', category: 'Network & Systems', icon: 'wifi', level: 86 },
    { _id: 'skill_30', name: 'Network Configuration & Subnetting', category: 'Network & Systems', icon: 'network', level: 85 },
    { _id: 'skill_31', name: 'System Administration & Security', category: 'Network & Systems', icon: 'shield', level: 82 },

    // Other Areas
    { _id: 'skill_32', name: 'Cybersecurity Fundamentals', category: 'Other Areas', icon: 'shield', level: 80 },
    { _id: 'skill_33', name: 'Algorithms & Data Structures', category: 'Other Areas', icon: 'cpu', level: 88 },
    { _id: 'skill_34', name: 'API Development & Integration', category: 'Other Areas', icon: 'cpu', level: 90 }
  ],
  experience: [
    {
      _id: 'exp_1',
      position: 'Software Developer & Lead Project Builder',
      organization: 'Computer Science Department — St. Joseph University',
      location: 'Dar es Salaam, Tanzania',
      startDate: 'Oct 2024',
      endDate: 'Present',
      description: 'Leading collaborative software design projects, building full-stack web and mobile applications, and mentoring junior developers and peers.',
      responsibilities: [
        'Architected and deployed full-stack web applications using MERN stack (MongoDB, Express, React, Node.js).',
        'Implemented secure RESTful API architectures with JWT authentication and RBAC middleware.',
        'Designed normalized database schemas for MySQL and MongoDB collections.',
        'Organized peer coding workshops on Git workflow, Linux system management, and web development fundamentals.'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Java', 'Git', 'Linux']
    },
    {
      _id: 'exp_2',
      position: 'IT & Network Systems Intern',
      organization: 'Tanzania Technology Solutions',
      location: 'Dar es Salaam, Tanzania',
      startDate: 'Jul 2024',
      endDate: 'Sep 2024',
      description: 'Gained hands-on experience in network configuration, database administration, and software maintenance.',
      responsibilities: [
        'Configured local area network (LAN) switches and routers using Cisco Packet Tracer and CLI tooling.',
        'Performed routine SQL database maintenance, indexing, and data backups for internal management tools.',
        'Assisted senior engineers in troubleshooting backend API endpoints and user permissions issues.'
      ],
      technologies: ['Networking', 'Cisco Packet Tracer', 'MySQL', 'Python', 'Linux']
    }
  ],
  education: [
    {
      _id: 'edu_1',
      institution: 'St. Joseph University in Tanzania',
      degree: 'Bachelor of Science in Computer Science',
      startYear: '2022',
      endYear: '2026 — Completed (Graduate)',
      description: 'Core Focus: Data Structures & Algorithms, Database Systems, Software Engineering, Computer Networks, Operating Systems, Web Technologies, and Cybersecurity.'
    }
  ],
  certifications: [
    {
      _id: 'cert_1',
      name: 'Cisco CCNA Network Fundamentals',
      issuingOrganization: 'Cisco Networking Academy',
      issueDate: '2024',
      credentialId: 'CSCO-CCNA-894102',
      credentialUrl: 'https://cisco.com/verify/ccna',
      certificateImage: ''
    },
    {
      _id: 'cert_2',
      name: 'Full Stack Web Development Specialization',
      issuingOrganization: 'Coursera / Meta',
      issueDate: '2024',
      credentialId: 'META-FSWD-339211',
      credentialUrl: 'https://coursera.org/verify/meta-fswd',
      certificateImage: ''
    },
    {
      _id: 'cert_3',
      name: 'MongoDB Certified Developer Associate',
      issuingOrganization: 'MongoDB University',
      issueDate: '2025',
      credentialId: 'MDB-DEV-771029',
      credentialUrl: 'https://university.mongodb.com/verify',
      certificateImage: ''
    }
  ],
  services: [
    {
      _id: 'serv_1',
      title: 'Full-Stack Web Development',
      description: 'Building modern, fast, and responsive single-page and multi-page web applications using React, Node.js, Express, and Tailwind CSS.',
      icon: 'layout'
    },
    {
      _id: 'serv_2',
      title: 'Database Architecture & Design',
      description: 'Designing efficient, scalable MongoDB document schemas and SQL relational databases with proper indexing and relationship constraints.',
      icon: 'database'
    },
    {
      _id: 'serv_3',
      title: 'RESTful API Development',
      description: 'Developing secure, high-performance REST APIs with Node.js/Express, JWT authentication, data validation, and clear documentation.',
      icon: 'server'
    },
    {
      _id: 'serv_4',
      title: 'Mobile Application Development',
      description: 'Crafting native Android utilities and applications using Java/Kotlin, Android Studio, and local SQLite data persistence.',
      icon: 'smartphone'
    },
    {
      _id: 'serv_5',
      title: 'Software System Design',
      description: 'Structuring software architecture, object-oriented solutions, and clean code principles to solve complex real-world business challenges.',
      icon: 'cpu'
    },
    {
      _id: 'serv_6',
      title: 'Networking & Cybersecurity Basics',
      description: 'Setting up secure network topologies, firewall configurations, vulnerability checks, and security best practices.',
      icon: 'shield'
    }
  ],
  messages: [
    {
      _id: 'msg_1',
      name: 'Sarah Jenkins',
      email: 'sjenkins@techrecruitment.com',
      subject: 'Software Engineering Internship Opportunity',
      message: 'Hi Elieza, I came across your impressive portfolio and projects like the Smart Hospital Queue System. We would love to discuss a software engineering internship role with our engineering team!',
      isRead: false,
      createdAt: new Date('2026-08-01T10:15:00')
    },
    {
      _id: 'msg_2',
      name: 'David Kasiga',
      email: 'david@innovationhub.tz',
      subject: 'Project Collaboration Inquiry',
      message: 'Hello Elieza! Great work on Mwakyoma Online Market. Are you available for freelance development on a web management system project?',
      isRead: true,
      createdAt: new Date('2026-07-28T14:30:00')
    }
  ]
};
