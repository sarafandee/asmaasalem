export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  quote: string;
}

export interface Credential {
  title: string;
  institution: string;
  description: string;
  image?: string;
}

export interface Phase {
  number: number;
  title: string;
  description: string;
}
