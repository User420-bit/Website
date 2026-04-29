export interface SocialLinks {
  email: string
  github: string
  linkedin: string
}

export interface ProfileContent {
  name: string
  subtitle: string
  institution: string
  location: string
  intro: string
  bullets: string[]
  social: SocialLinks
  imageUrl?: string
}

export interface AboutValue {
  title: string
  description: string
}

export interface AboutContent {
  paragraphs: string[]
  values: AboutValue[]
}

export interface StudySection {
  id: string
  category: string
  title: string
  items: string[]
  note?: string
  logoUrl?: string
}

export type ProjectCategory = 'eigenstaendig' | 'ai-unterstuetzt'

export interface ProjectScreenshot {
  url: string
  caption?: string
}

export interface CodeExample {
  language: string
  snippet: string
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  category: ProjectCategory
  githubUrl?: string
  detailOverview?: string
  features?: string[]
  screenshots?: ProjectScreenshot[]
  learnings?: string[]
  codeExample?: CodeExample
}

export type CodingCategory = 'ai-tools' | 'software-os' | 'languages'

export interface CodingItem {
  id: string
  name: string
  category: CodingCategory
  logoUrl?: string
  details: string
}

export interface ContactContent {
  heading: string
  description: string
}

export interface UiState {
  lastUpdatedAt?: string
}

export interface PortfolioContent {
  profile: ProfileContent
  about: AboutContent
  study: StudySection[]
  projects: Project[]
  coding: CodingItem[]
  contact: ContactContent
  ui?: UiState
}

export const DEFAULT_CONTENT: PortfolioContent = {
  profile: {
    name: 'Pharrel Sandjo Djomou',
    subtitle: 'Wirtschaftsinformatik (B.Sc.)',
    institution: 'TH Rosenheim',
    location: 'Rosenheim, Bayern',
    intro:
      'Student der Wirtschaftsinformatik mit Fokus auf saubere Software-Architektur, pragmatische Lösungen und ehrliche Kommunikation. Auf der Suche nach einer Werkstudentenstelle im Raum Rosenheim.',
    bullets: [
      'Fundament in Informatik, BWL und Mathematik',
      'Erfahrung mit Java, Swift, TypeScript und SQL',
      'Strukturiert, lernbereit, transparent über Stärken und Lücken',
    ],
    social: {
      email: 'studsandph@gmail.com',
      github: 'https://github.com/pharrelsandjo',
      linkedin: 'https://www.linkedin.com/in/pharrel-sandjo-djomou',
    },
  },
  about: {
    paragraphs: [
      'Ich bin Pharrel, Student der Wirtschaftsinformatik an der TH Rosenheim. Mich begeistert die Schnittstelle zwischen Technik und Geschäftslogik – genau dort, wo gute Software echten Mehrwert schafft.',
      'Aktuell befinde ich mich in einer Lernphase: ich baue mein Fundament systematisch aus, vertiefe Konzepte praktisch in eigenen Projekten und nutze AI-Tools bewusst als Verstärker, nicht als Ersatz fürs Verstehen.',
    ],
    values: [
      { title: 'Ehrlichkeit', description: 'Transparenz über Können und Lücken – keine Show.' },
      {
        title: 'Struktur',
        description: 'Saubere Architektur, lesbarer Code, dokumentierte Entscheidungen.',
      },
      { title: 'Pragmatismus', description: 'Die einfachste Lösung, die das Problem wirklich löst.' },
      {
        title: 'Lernorientierung',
        description: 'Jedes Projekt soll einen klaren Lerngewinn bringen.',
      },
    ],
  },
  study: [
    {
      id: 'informatik',
      category: 'Informatik',
      title: 'Grundlagen der Informatik',
      items: [
        'Algorithmen & Datenstrukturen',
        'Objektorientierte Programmierung',
        'Software Engineering',
        'Datenbanken (SQL)',
      ],
    },
    {
      id: 'bwl',
      category: 'BWL',
      title: 'Betriebswirtschaftslehre',
      items: ['Grundlagen BWL', 'Rechnungswesen', 'Wirtschaftsrecht', 'Controlling'],
    },
    {
      id: 'mathe',
      category: 'Mathematik',
      title: 'Mathematik für Wirtschaftsinformatik',
      items: ['Lineare Algebra', 'Analysis', 'Statistik', 'Diskrete Mathematik'],
    },
    {
      id: 'programmierung',
      category: 'Programmierung',
      title: 'Programmiersprachen',
      items: [
        'Java (Hauptsprache im Studium)',
        'Swift (eigene Vertiefung)',
        'TypeScript / JavaScript',
        'SQL',
      ],
    },
  ],
  projects: [
    {
      id: 'wawi-mvp',
      title: 'wawi-mvp',
      description: 'Warenwirtschafts-System als CLI-Anwendung mit Domain-Driven Design.',
      techStack: ['Java', 'DDD', 'CLI', 'Maven'],
      category: 'eigenstaendig',
      githubUrl: 'https://github.com/pharrelsandjo/wawi-mvp',
      detailOverview:
        'Eigenständiger Entwurf einer schlanken Warenwirtschaft. Fokus liegt auf sauberer Trennung von Domäne, Anwendungsschicht und Infrastruktur.',
      features: [
        'Artikel-, Lager- und Bewegungsverwaltung',
        'Domain Events für Bestandsänderungen',
        'CLI mit klarer Befehlsstruktur',
        'Unit-Tests für Domänenlogik',
      ],
      learnings: [
        'DDD-Konzepte praktisch angewendet',
        'Trade-offs bei Aggregatgrenzen',
        'Test-First für Kerndomäne',
      ],
      codeExample: { language: 'bash', snippet: 'java -jar wawi-mvp.jar demo' },
    },
    {
      id: 'sonor',
      title: 'Sonor',
      description: 'Music-Discovery-App für iOS – AI-unterstützt entwickelt.',
      techStack: ['SwiftUI', 'iOS', 'AI-assisted'],
      category: 'ai-unterstuetzt',
      detailOverview:
        'Prototyp einer Musik-Entdeckungs-App. Schwerpunkt auf nativer iOS-UX und auf dem bewussten Einsatz von AI-Tools im Entwicklungsprozess.',
      features: [
        'Genre-basierte Empfehlungen',
        'Native SwiftUI-Komponenten',
        'Lokale Persistenz',
      ],
      learnings: [
        'SwiftUI-State-Management',
        'Wo AI-Pairing wirklich beschleunigt – und wo nicht',
      ],
    },
    {
      id: 'availably',
      title: 'Availably',
      description: 'Verfügbarkeits-Management – AI-unterstützt entwickelt.',
      techStack: ['TypeScript', 'AI-assisted'],
      category: 'ai-unterstuetzt',
      detailOverview: 'Tool zur Koordination von Verfügbarkeiten in kleinen Teams.',
      features: ['Kalender-Sicht', 'Konfliktanzeige', 'Einfacher Export'],
    },
  ],
  coding: [
    { id: 'chatgpt', name: 'ChatGPT', category: 'ai-tools', details: 'Brainstorming, Erklärungen, Code-Reviews.' },
    { id: 'perplexity', name: 'Perplexity', category: 'ai-tools', details: 'Recherche mit Quellen.' },
    { id: 'copilot', name: 'GitHub Copilot', category: 'ai-tools', details: 'Inline-Code-Vorschläge im Editor.' },
    { id: 'spark', name: 'GitHub Spark', category: 'ai-tools', details: 'Rapid Prototyping von Web-Apps.' },
    { id: 'macos', name: 'macOS', category: 'software-os', details: 'Hauptbetriebssystem für Entwicklung.' },
    { id: 'vscode', name: 'VS Code', category: 'software-os', details: 'Editor für Web-Projekte.' },
    { id: 'intellij', name: 'IntelliJ IDEA', category: 'software-os', details: 'IDE für Java-Projekte.' },
    { id: 'github', name: 'GitHub', category: 'software-os', details: 'Versionskontrolle und Hosting.' },
    { id: 'java', name: 'Java', category: 'languages', details: 'Hauptsprache im Studium.' },
    { id: 'swift', name: 'Swift', category: 'languages', details: 'Eigene Vertiefung für iOS.' },
    { id: 'ts', name: 'TypeScript / JavaScript', category: 'languages', details: 'Web-Frontend und kleine Tools.' },
    { id: 'sql', name: 'SQL', category: 'languages', details: 'Datenbankabfragen und -modellierung.' },
  ],
  contact: {
    heading: 'Kontakt',
    description:
      'Ich freue mich über ehrliches Feedback und Anfragen zu Werkstudentenstellen im Raum Rosenheim.',
  },
}
