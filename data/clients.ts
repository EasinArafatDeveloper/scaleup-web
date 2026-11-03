export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "payment" | "marketing";
}

export const techStackList: TechItem[] = [
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "n8n Automation", category: "ai" },
  { name: "OpenAI / Claude", category: "ai" },
  { name: "Meta Pixel & CAPI", category: "marketing" },
  { name: "Google Analytics 4", category: "marketing" },
  { name: "bKash Tokenized", category: "payment" },
  { name: "Nagad Checkout", category: "payment" },
  { name: "Steadfast Courier", category: "backend" },
  { name: "Pathao Logistics", category: "backend" }
];

export interface ClientLogo {
  name: string;
  industry: string;
}

export const clientList: ClientLogo[] = [
  { name: "Amar Organic Shop", industry: "Organic Food & E-commerce" },
  { name: "The Reform Times", industry: "News & Media Portal" },
  { name: "Luxe Modest Wear", industry: "Fashion & Retail" },
  { name: "CareDent Dental Clinic", industry: "Healthcare & Appointments" },
  { name: "Prime Agro Exports", industry: "B2B Export & Trading" },
  { name: "Apex Global Study", industry: "Education Consultancy" }
];
