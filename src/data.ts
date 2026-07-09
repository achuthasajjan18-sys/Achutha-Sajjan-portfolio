import { Project, EducationItem, SkillCategory, Certification } from './types';

export const personalInfo = {
  name: "Achutha Sajjan",
  title: "NLP & Full-Stack ML Engineer",
  subTitle: "MCA Candidate | BMSIT Bengaluru",
  email: "achuthasajjan18@gmail.com",
  phone: "+91 6363180512",
  location: "Bengaluru, India",
  tagline: "Building ML and NLP systems — and shipping them as complete, full-stack products.",
  summary: "MCA candidate at BMSIT Bengaluru who builds full-stack applications and machine learning systems that solve real problems. Proficient in Python, React, Node.js, and MongoDB, with applied experience in NLP, sentiment analysis, RAG pipelines, and automated ML workflows. Led a capstone team to a top-ranked submission.",
  socials: {
    linkedin: "https://linkedin.com/in/achutha-sajjan", // Placeholder to be customized
    github: "https://github.com/achuthasajjan18-sys",
    leetcode: "https://leetcode.com/achuthasajjan",   // Placeholder to be customized
    kaggle: "https://kaggle.com/achuthasajjan"       // Placeholder to be customized
  }
};

export const projects: Project[] = [
  {
    id: "tradon",
    title: "Tradon",
    subtitle: "ML-Based Stock Trend Prediction System",
    period: "2024 – 2025",
    tech: ["Python", "React", "Node.js", "MongoDB", "NLP", "Sentiment Analysis"],
    bullets: [
      "Built full-stack ML system with NLP-based sentiment analysis on financial news, improving next-day signal confidence by ~18%",
      "Automated data preprocessing and model retraining pipelines, cutting experiment turnaround by ~40%",
      "Led a 5-member capstone team, achieved 62% evaluation acceptance, ranking among top submissions"
    ],
    link: "https://github.com/achuthasajjan18-sys/tradon"
  },
  {
    id: "chatpdf",
    title: "ChatPDF",
    subtitle: "PDF-Based Conversational AI System",
    period: "2024",
    tech: ["Python", "LangChain", "FAISS", "Google Gemini API", "PyPDF2", "Streamlit"],
    bullets: [
      "Engineered a RAG pipeline indexing 200+ pages in under 15 seconds with 95% retrieval accuracy",
      "Reduced hallucination rates by 40% using LangChain RAG, ensuring fully grounded responses",
      "Optimized chunking to handle concurrent uploads up to 50MB, reducing API latency by 30%"
    ],
    link: "https://github.com/achuthasajjan18-sys/ChatPDF_"
  },
  {
    id: "sonance",
    title: "Sonance Synthesis",
    subtitle: "Real-Time Speech Recognition Web App",
    period: "2023",
    tech: ["JavaScript", "Web Speech API", "HTML5", "CSS3"],
    bullets: [
      "Architected real-time speech-to-text platform with under 200ms latency and 85-90% WER accuracy across 5+ languages",
      "Built export system for 10,000+ words of transcription to .txt/.doc in under 1 second",
      "Optimized for 30+ minute continuous audio streaming with no memory leaks"
    ],
    link: "https://github.com/achuthasajjan18-sys/sonance-synthesis"
  }
];

export const skillsData: SkillCategory[] = [
  {
    id: "lang-frameworks",
    categoryName: "Languages & Frameworks",
    skills: ["Python", "JavaScript", "React", "Node.js", "HTML5", "CSS3"]
  },
  {
    id: "ai-ml",
    categoryName: "AI / Machine Learning",
    skills: ["Machine Learning", "NLP", "Sentiment Analysis", "RAG", "LangChain", "FAISS", "PyPDF2"]
  },
  {
    id: "databases-cloud",
    categoryName: "Databases & Cloud",
    skills: ["MongoDB", "Vector Databases", "AWS", "Git"]
  },
  {
    id: "engineering",
    categoryName: "Engineering",
    skills: ["API Development", "System Architecture", "Data Pipelines", "Feature Engineering"]
  },
  {
    id: "soft-skills",
    categoryName: "Soft Skills",
    skills: ["Team Leadership", "Project Management", "Cross-Functional Collaboration"]
  }
];

export const education: EducationItem[] = [
  {
    id: "mca",
    institution: "BMSIT&M, Bengaluru",
    degree: "Master of Computer Applications (MCA)",
    period: "2025 – 2027",
    details: "Focusing on Software Engineering, Advanced Database Systems, and Applied Machine Learning."
  },
  {
    id: "bca",
    institution: "Presidency University, Bengaluru",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2022 – 2025",
    details: "CGPA: 6.6/10.0. Core coursework in Data Structures, Algorithms, Object Oriented Programming, and Database Systems."
  }
];

export const certifications: Certification[] = [
  {
    id: "cyber",
    title: "Ethical Hacking",
    issuer: "Cisco, powered by NSDC",
    year: "2025"
  },
  {
    id: "agentic-ai",
    title: "Make Agentic AI Work for You",
    issuer: "IBM SkillsBuild",
    year: "2025",
    badge: "Digital Credential"
  }
];
