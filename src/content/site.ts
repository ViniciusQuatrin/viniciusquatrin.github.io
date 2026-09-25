export const site = {
  name: "Vinícius Quatrin",
  role: "Android · apoio em backend",
  lang: "pt-BR",
  linkedIn: {
    href: "https://www.linkedin.com/in/vin%C3%ADcius-quatrin-da-silva-76a788190",
    label: "LinkedIn",
  },
  email: {
    href: "mailto:viniquatrin48@gmail.com",
    label: "E-mail",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/sobre", label: "Sobre" },
    { href: "/cases", label: "Cases" },
  ],
  footerCta: "Precisa de Android de produção? Fala comigo.",
} as const;

export type NavItem = (typeof site.nav)[number];
