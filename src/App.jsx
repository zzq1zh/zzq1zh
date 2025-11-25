import React, { useState } from 'react';
import { 
  Github, 
  Mail, 
  MapPin, 
  FileText, 
  ExternalLink, 
  BookOpen, 
  Star, 
  Award,
  Code
} from 'lucide-react';

// ==========================================
// DATA CONFIGURATION
// ==========================================

const PROFILE = {
  name: "Ziqi Zhang",
  title: "M.S. in Computer Science",
  university: "Brown University",
  email: "ziqi_zhang2@brown.edu",
  location: "Providence, RI",
  bio: "My research interests include scalable and interpretable data modeling, representation learning, AI for Science, and mechanistic and behavioral analysis of Large Language Models (LLMs).",
  links: {
    github: "https://github.com/zzq1zh",
    scholar: "https://scholar.google.com/citations?user=Fc4Dj10AAAAJ&hl=en&authuser=2"
  }
};

// Research Projects / Works in Progress (Mapped from Research Experience)
const SUBMITTED_PAPERS = [
  {
    id: 1,
    title: "From Circles to Signals: Representation Learning on Ultra-Long eccDNA",
    authors: "Jien Li*, Zhenke Liu*, Ziqi Zhang*, Jiaqi Zhang, Ritambhara Singh †",
    venue: "Submitted to Research in Computational Molecular Biology 2026",
    advisor: "Advised by Prof. Ritambhara Singh",
    abstract: "Extended the eccDNAMamba framework with interpretability tools using Integrated Gradients. Established a new benchmark for cancer-healthy eccDNA classification and cross-species discrimination.",
    tags: ["AI for Science", "Genomics", "Interpretability"]
  },
  {
    id: 2,
    title: "JudgeMixer: Investigating Systemic Biases in LLM-as-a-Judge Settings",
    authors: "Zhenke Liu, Ziqi Zhang",
    venue: "Research Project (2025)",
    advisor: "Advised by Prof. Stephen Bach",
    abstract: "Investigating systemic biases (bandwagon, positional, authority) in LLM evaluations. Developed a multi-model ensemble framework to improve robustness and reduce judgment bias.",
    tags: ["LLM", "Bias Evaluation", "NLP"]
  }
];

// Publications (Mapped from Publications section)
const PUBLISHED_PAPERS = [
  {
    id: 1,
    title: "eccDNAMamba: A Pre-Trained Model for Ultra-Long eccDNA Sequence Analysis",
    authors: "Zhenke Liu*, Jien Li*, Ziqi Zhang*",
    venue: "ICML 2025 Workshop on Generative AI for Biology (PMLR 267)",
    advisor: "Advised by Prof. Ritambhara Singh",
    link: "https://openreview.net/pdf?id=56xKN7KJjy",
    year: "2025",
    abstract: "Proposed a bidirectional Mamba-2 encoder for ultra-long eccDNA modeling (up to 1Mbp) with linear-time full-context learning. Implemented circular data augmentation to preserve topological dependencies.",
    tags: ["Mamba", "Generative AI", "Biology"]
  }
];

// Technical Projects (Mapped from Applied Research & Independent Projects)
// 确保所有项目（Lotus, MossAgent, DMAGT）都包含在此列表中
const GITHUB_REPOS = [
  {
    id: 1,
    name: "Lotus",
    description: "Interactive single-cell analysis platform. High-performance React frontend for million-cell visualization and Flask backend.",
    language: "Python/JavaScript",
    url: "https://github.com/CrossOmics/Lotus/tree/main"
  },
  {
    id: 2,
    name: "EccDNA Multi-Task Benchmark",
    description: "EccDNA Multi-Task Evaluation benchmark is a benchmark dataset specifically designed to assess the performance of genomics foundation models on eccDNA-related tasks.",
    language: "Benchmark/Dataset",
    url: "https://huggingface.co/eccDNAMamba"
  }
];

const SKILLS = [
  "Python", "Java", "JavaScript", "PyTorch", "Transformers", "React", "Vue", "FastAPI", "Spring Boot"
];

const AWARDS = [
  "National Championship of Amazon Hackathon 2021",
  "Prolinks - Barclay Accelerator Selected Project"
];

// ==========================================
// COMPONENTS
// ==========================================

const Tag = ({ text, color = "blue" }) => {
  const colorClass = color === "blue" 
    ? "bg-blue-100 text-blue-800"
    : "bg-gray-100 text-gray-800";
    
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${colorClass}`}>
      {text}
    </span>
  );
};

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-2 mb-6 border-b border-gray-200 pb-2">
    <Icon className="w-6 h-6 text-blue-600" />
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
  </div>
);

const PaperCard = ({ paper, type }) => {
  // Determine primary link: prefer 'link' (e.g. forum), fallback to 'pdfLink'
  const primaryLink = paper.link || paper.pdfLink;

  // Render logic components to avoid duplication
  const CardContent = () => (
    <>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors flex items-center gap-2">
          {paper.title}
          {primaryLink && (
             <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
          )}
        </h3>
        {type === 'published' && paper.year && (
          <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded ml-2 flex-shrink-0">
            {paper.year}
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mt-2 text-sm italic">
        {paper.authors}
      </p>
      
      <div className="flex flex-col mt-2 gap-1">
        <span className={`text-sm font-medium ${type === 'submitted' ? 'text-amber-600' : 'text-blue-600'}`}>
          {paper.venue}
        </span>
        {paper.advisor && (
          <span className="text-sm text-gray-500 italic">
            {paper.advisor}
          </span>
        )}
        {type === 'published' && paper.citations > 0 && (
          <span className="text-xs text-gray-500 flex items-center">
            Citations: {paper.citations}
          </span>
        )}
      </div>

      {paper.abstract && (
        <p className="text-gray-500 mt-3 text-sm line-clamp-2">
          {paper.abstract}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {paper.tags && paper.tags.map(tag => <Tag key={tag} text={tag} />)}
      </div>
    </>
  );

  // If link exists, render as <a> tag, otherwise as <div>
  if (primaryLink) {
    return (
      <a 
        href={primaryLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div className="block mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent />
    </div>
  );
};

const RepoCard = ({ repo }) => (
  <a 
    href={repo.url}
    target="_blank" 
    rel="noopener noreferrer"
    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors group h-full flex flex-col"
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center">
        <Code className="w-4 h-4 mr-2 text-gray-400" />
        {repo.name}
      </h3>
      <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    
    <p className="text-sm text-gray-600 mb-4 flex-grow">
      {repo.description}
    </p>
    
    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
      <div className="flex items-center space-x-4">
        <span className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
          {repo.language}
        </span>
      </div>
    </div>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans transition-colors duration-200">
      
      {/* Header / Profile Section */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl shadow-lg ring-4 ring-white">
                {PROFILE.name.charAt(0)}
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {PROFILE.name}
              </h1>
              <p className="text-xl text-blue-600 mb-1">{PROFILE.title}</p>
              <p className="text-gray-600 mb-4">{PROFILE.university}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1.5" />
                  <a href={`mailto:${PROFILE.email}`} className="hover:text-blue-600 transition-colors">{PROFILE.email}</a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {PROFILE.location}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center md:justify-start">
                <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 rounded-full transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={PROFILE.links.scholar} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-600 bg-gray-100 rounded-full transition-colors">
                  <BookOpen className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
             <p className="text-gray-600 leading-relaxed">
               {PROFILE.bio}
             </p>
          </div>
          
           {/* Skills & Awards Mini Section */}
           <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                 {SKILLS.map(skill => (
                   <span key={skill} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                     {skill}
                   </span>
                 ))}
              </div>
              <div className="space-y-1">
                {AWARDS.map((award, idx) => (
                  <div key={idx} className="flex items-center text-sm text-amber-600">
                    <Award className="w-4 h-4 mr-2" />
                    {award}
                  </div>
                ))}
              </div>
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Module 1: Publications */}
        <section id="published">
          <SectionTitle icon={Star} title="Publications" />
          <div className="space-y-4">
            {PUBLISHED_PAPERS.map(paper => (
              <PaperCard key={paper.id} paper={paper} type="published" />
            ))}
          </div>
        </section>

        {/* Module 2: Works in Progress */}
        <section id="submitted">
          <SectionTitle icon={FileText} title="Research Projects" />
          <div className="space-y-4">
            {SUBMITTED_PAPERS.map(paper => (
              <PaperCard key={paper.id} paper={paper} type="submitted" />
            ))}
          </div>
        </section>

        {/* Module 3: Technical Projects (Includes MossAgent & DMAGT) */}
        <section id="projects">
          <SectionTitle icon={Code} title="Technical & Open Source Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GITHUB_REPOS.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <p className="mt-2">Powered by React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}