import type { Language } from "../language-provider";

export type PortfolioSectionId = "intro" | "trajectory" | "projects" | "contact";

export type PortfolioProject = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  imagePanelClass?: string;
  url: string;
  status: string;
};

export type PortfolioLocale = {
  nav: {
    sections: Record<PortfolioSectionId, string>;
    languageLabel: string;
    dutch: string;
    english: string;
  };
  hero: {
    availability: string;
    greeting: string;
    intro: string;
    typingPrefix: string;
    typingLines: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    profileAlt: string;
    statLabel: string;
    statValue: string;
    badges: string[];
  };
  trajectory: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      body: string;
      metric: string;
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
    openLabel: string;
    hoverLabel: string;
    items: PortfolioProject[];
  };
  contact: {
    title: string;
    body: string;
    emailLabel: string;
    email: string;
    linkedinLabel: string;
    linkedinUrl: string;
    linkedinName: string;
    githubLabel: string;
    githubUrl: string;
    githubName: string;
    footer: string;
  };
};

export const portfolioContent: Record<Language, PortfolioLocale> = {
  nl: {
    nav: {
      sections: {
        intro: "Intro",
        trajectory: "Flow",
        projects: "Showcase",
        contact: "Contact",
      },
      languageLabel: "Taal",
      dutch: "NL",
      english: "EN",
    },
    hero: {
      availability: "Open voor nieuwe samenwerkingen in 2026",
      greeting: "Andreas Schellekens",
      intro:
        "Ik ontwerp digitale producten met de precisie van engineering en de energie van een creatief merk.",
      typingPrefix: "Ik bouw ervaringen die",
      typingLines: [
        "aanvoelen als een premium product.",
        "snel reageren en helder communiceren.",
        "visueel sterk zijn zonder performance te verliezen.",
      ],
      ctaPrimary: "Start een project",
      ctaSecondary: "Bekijk projecten",
      profileAlt: "Portret van Andreas Schellekens",
      statLabel: "Focus",
      statValue: "Frontend + Product Thinking",
      badges: ["React", "Next.js", "UX Systems", "Performance"],
    },
    trajectory: {
      title: "Studio Trajectory",
      subtitle:
        "In plaats van standaard secties: een product flow die strategie, bouw en ervaring samenbrengt.",
      cards: [
        {
          title: "Concept Architecture",
          body: "Van idee naar interactief concept met duidelijke visuele richting en informatiearchitectuur.",
          metric: "Vision -> Interface",
        },
        {
          title: "Interactive Engineering",
          body: "Motion systems, componenten en performance tuning zodat de ervaring vloeiend en schaalbaar blijft.",
          metric: "60fps target",
        },
        {
          title: "Product Refinement",
          body: "Doorlopende iteratie op details, copy en UX-signalen totdat het geheel als product aanvoelt.",
          metric: "UX polish",
        },
      ],
    },
    projects: {
      title: "Project Stage",
      subtitle: "Mijn uitgelichte projecten.",
      openLabel: "Open project",
      hoverLabel: "Preview",
      items: [
        {
          title: "Binderbase",
          year: "2026",
          description:
            "Platform voor verzamelaars met focus op overzicht, snelheid en gebruiksgemak voor dagelijks beheer.",
          tags: ["Web App", "Frontend", "Backend", "UX"],
          image: "/BinderBase-Frontpage.png",
          url: "https://binderbase.andreas-schellekens.be",
          status: "Live product",
        },
        {
          title: "spuddy.be",
          year: "2025",
          description:
            "Sport buddy matching platform met onboarding flows, slimme filtering en sociale activatie.",
          tags: ["Platform", "Matching", "Startup"],
          image: "/Spuddy-Frontpage.png",
          imagePanelClass: "bg-slate-900",
          url: "https://spuddy.be",
          status: "Growth stage",
        },
        {
          title: "Hyperdrive Festival",
          year: "2025",
          description:
            "Fictief festivalconcept waarin dynamische content en speelse animatie centraal staan.",
          tags: ["JavaScript", "APIs", "Creative Web"],
          image: "/HyperDrive-Frontpage.png",
          url: "https://hyperdrivefestival.netlify.app",
          status: "Showcase",
        },
      ],
    },
    contact: {
      title: "Build Something Memorable",
      body: "Heb je een idee dat meer moet voelen als een product dan een klassieke website? Laten we praten.",
      emailLabel: "Direct email",
      email: "andreas.schellekens8@gmail.com",
      linkedinLabel: "LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/andreas-schellekens/",
      linkedinName: "andreas-schellekens",
      githubLabel: "GitHub",
      githubUrl: "https://github.com/Andreas-Schellekens",
      githubName: "Andreas-Schellekens",
      footer: "Ontworpen en ontwikkeld met focus op beleving en details.",
    },
  },
  en: {
    nav: {
      sections: {
        intro: "Intro",
        trajectory: "Flow",
        projects: "Showcase",
        contact: "Contact",
      },
      languageLabel: "Language",
      dutch: "NL",
      english: "EN",
    },
    hero: {
      availability: "Available for new collaborations in 2026",
      greeting: "Andreas Schellekens",
      intro:
        "I design digital products with engineering precision and the energy of a creative brand.",
      typingPrefix: "I build experiences that",
      typingLines: [
        "feel like a premium product.",
        "respond fast and communicate clearly.",
        "stay visually bold without losing performance.",
      ],
      ctaPrimary: "Start a project",
      ctaSecondary: "View projects",
      profileAlt: "Portrait of Andreas Schellekens",
      statLabel: "Focus",
      statValue: "Frontend + Product Thinking",
      badges: ["React", "Next.js", "UX Systems", "Performance"],
    },
    trajectory: {
      title: "Studio Trajectory",
      subtitle:
        "Instead of default sections: a product flow that blends strategy, engineering, and experience.",
      cards: [
        {
          title: "Concept Architecture",
          body: "From idea to interactive concept with a clear visual direction and information architecture.",
          metric: "Vision -> Interface",
        },
        {
          title: "Interactive Engineering",
          body: "Motion systems, components, and performance tuning to keep the experience fluid and scalable.",
          metric: "60fps target",
        },
        {
          title: "Product Refinement",
          body: "Continuous iteration on details, copy, and UX signals until the whole system feels like a product.",
          metric: "UX polish",
        },
      ],
    },
    projects: {
      title: "Project Stage",
      subtitle: "My featured projects.",
      openLabel: "Open project",
      hoverLabel: "Preview",
      items: [
        {
          title: "Binderbase",
          year: "2026",
          description:
            "Collector platform focused on clarity, speed, and everyday usability for collection management.",
          tags: ["Web App", "Frontend", "Backend", "UX"],
          image: "/BinderBase-Frontpage.png",
          url: "https://binderbase.andreas-schellekens.be",
          status: "Live product",
        },
        {
          title: "spuddy.be",
          year: "2025",
          description:
            "Sports buddy matching platform with onboarding flows, smart filters, and social activation.",
          tags: ["Platform", "Matching", "Startup"],
          image: "/Spuddy-Frontpage.png",
          imagePanelClass: "bg-slate-900",
          url: "https://spuddy.be",
          status: "Growth stage",
        },
        {
          title: "Hyperdrive Festival",
          year: "2025",
          description:
            "Fictional festival concept centered around dynamic content and playful interaction design.",
          tags: ["JavaScript", "APIs", "Creative Web"],
          image: "/HyperDrive-Frontpage.png",
          url: "https://hyperdrivefestival.netlify.app",
          status: "Showcase",
        },
      ],
    },
    contact: {
      title: "Build Something Memorable",
      body: "If your idea should feel more like a product than a typical website, let us talk.",
      emailLabel: "Direct email",
      email: "andreas.schellekens8@gmail.com",
      linkedinLabel: "LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/andreas-schellekens/",
      linkedinName: "andreas-schellekens",
      githubLabel: "GitHub",
      githubUrl: "https://github.com/Andreas-Schellekens",
      githubName: "Andreas-Schellekens",
      footer: "Designed and developed with a strong focus on experience and details.",
    },
  },
};
