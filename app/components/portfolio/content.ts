import type { Language } from "../language-provider";

export type PortfolioSectionId = "intro" | "trajectory" | "projects" | "contact";

export type PortfolioProject = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  imagePanelClass?: string;
  imageClass?: string;
  url?: string;
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
    noLinkLabel: string;
    hoverLabel: string;
    items: PortfolioProject[];
  };
  contact: {
    title: string;
    body: string;
    formLabel: string;
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
      title: "Hoe Ik Werk",
      subtitle:
        "Geen vage buzzwords, maar een duidelijke aanpak: eerst scherp krijgen wat je nodig hebt, daarna slim bouwen en stap voor stap verfijnen.",
      cards: [
        {
          title: "Strategie & Structuur",
          body: "Ik vertaal je idee naar een heldere structuur met duidelijke prioriteiten, flows en schermopbouw.",
          metric: "Idee -> Plan",
        },
        {
          title: "Bouwen & Testen",
          body: "Ik werk het uit in moderne webtechnologie en test onderweg op gebruiksgemak, snelheid en betrouwbaarheid.",
          metric: "Build + Test",
        },
        {
          title: "Afwerken & Verbeteren",
          body: "We finetunen design, content en interactie tot alles logisch, professioneel en klaar voor echte gebruikers voelt.",
          metric: "Launch-ready",
        },
      ],
    },
    projects: {
      title: "Project Stage",
      subtitle: "Mijn uitgelichte projecten.",
      openLabel: "Open project",
      noLinkLabel: "Geen live link",
      hoverLabel: "Preview",
      items: [
        {
          title: "Binderbase ★",
          year: "2025",
          description:
            "Platform voor verzamelaars met focus op overzicht, snelheid en gebruiksgemak voor dagelijks beheer.",
          tags: ["Web App", "Frontend", "Backend", "UX", "TALL Stack"],
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
          title: "Portfolio Webdesign",
          year: "2024",
          description:
            "Mijn allereerste webproject. Hier startte ik met eenvoudige HTML en legde ik de basis waarop ik vandaag verder bouw.",
          tags: ["HTML", "CSS", "Eerste Website", "Leerproject"],
          image: "/portfolio-webdesign.png",
          url: "https://andreas06.sinners.be",
          status: "Eerste project",
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
        {
          title: "Bed and Breakfast Chez Natalie",
          year: "2025",
          description:
            "Groepsproject voor Skill 2-1 aan Thomas More: datamodelleren, use cases uitwerken en prototypes maken voor Bed and Breakfast Chez Natalie.",
          tags: ["Datamodellering", "Use Cases", "Prototyping", "Groepsproject"],
          image: "/BnB-chez-natalie-datmodel.png",
          imageClass: "object-center",
          status: "Skill 2-1",
        },
        {
          title: "Poutrel",
          year: "2026",
          description:
            "Lopende groepswebapp gebouwd met de TALL stack. We werken met Scrum en Jira om zowel technisch als in teamverband te groeien voor Skill 2-2.",
          tags: ["TALL Stack", "Web App", "Scrum", "Jira"],
          image: "/Poutrel.png",
          url: "https://poutrel.quintedev.be",
          status: "Lopend project",
        },
      ],
    },
    contact: {
      title: "Build Something Memorable",
      body: "Heb je een idee dat meer moet voelen als een product dan een klassieke website? Laten we praten.",
      formLabel: "Contactformulier",
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
      title: "How I Work",
      subtitle:
        "No vague buzzwords, just a clear process: define what matters, build it properly, and improve it in focused iterations.",
      cards: [
        {
          title: "Strategy & Structure",
          body: "We turn your idea into a clear structure with practical priorities, flows, and screen hierarchy.",
          metric: "Idea -> Plan",
        },
        {
          title: "Build & Validate",
          body: "I implement with modern web technology and test continuously for usability, speed, and reliability.",
          metric: "Build + Test",
        },
        {
          title: "Refine & Ship",
          body: "We polish design, content, and interactions until everything feels clear, professional, and ready for real users.",
          metric: "Launch-ready",
        },
      ],
    },
    projects: {
      title: "Project Stage",
      subtitle: "My featured projects.",
      openLabel: "Open project",
      noLinkLabel: "No live link",
      hoverLabel: "Preview",
      items: [
        {
          title: "Binderbase ★",
          year: "2025",
          description:
            "Collector platform focused on clarity, speed, and everyday usability for collection management.",
          tags: ["Web App", "Frontend", "Backend", "UX", "TALL Stack"],
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
          title: "Portfolio Webdesign",
          year: "2024",
          description:
            "My very first web project. I started with simple HTML and learned core web foundations that still support everything I build today.",
          tags: ["HTML", "CSS", "First Website", "Learning Project"],
          image: "/portfolio-webdesign.png",
          url: "https://andreas06.sinners.be",
          status: "First project",
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
        {
          title: "Bed and Breakfast Chez Natalie",
          year: "2025",
          description:
            "Team project for Skill 2-1 at Thomas More: data modelling, working out use cases, and creating prototypes for Bed and Breakfast Chez Natalie.",
          tags: ["Data Modelling", "Use Cases", "Prototyping", "Team Project"],
          image: "/BnB-chez-natalie-datmodel.png",
          imageClass: "object-center",
          status: "Skill 2-1",
        },
        {
          title: "Poutrel",
          year: "2026",
          description:
            "Ongoing team web app built with the TALL stack. We use Scrum and Jira to grow both technical and collaboration skills for Skill 2-2.",
          tags: ["TALL Stack", "Web App", "Scrum", "Jira"],
          image: "/Poutrel.png",
          url: "https://poutrel.quintedev.be",
          status: "Ongoing project",
        },
      ],
    },
    contact: {
      title: "Build Something Memorable",
      body: "If your idea should feel more like a product than a typical website, let us talk.",
      formLabel: "Contact form",
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
