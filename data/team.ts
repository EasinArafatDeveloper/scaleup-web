/**
 * People shown in the "Team" section on /about.
 * To add a member: put their photo in /public/team and add an entry to
 * `teamMembers` below (founder first, then the team).
 */
export interface TeamMember {
  name: string;
  role: string;
  /** Square-ish photo in /public/team. */
  photo: string;
  linkedin?: string;
  /** Internal profile page, if they have one. */
  href?: string;
}

export const founderData = {
  name: "Easin Arafat",
  role: "Founder & Lead Solutions Architect",
  title: "Building high-performance digital engines for growing businesses",
  story: [
    "I started coding in 2023 out of a deep obsession with building systems that create real commercial leverage for business owners. As a Computer Science student and practitioner, I witnessed countless Bangladeshi SME entrepreneurs burning lakhs of Taka on Facebook ad boosts with broken websites, zero tracking, and slow Messenger replies.",
    "Over the past 2 years, I have trained 75+ students in digital marketing and web tech, and engineered conversion systems for dozens of businesses across Dhaka, Chittagong, and overseas.",
    "At ScaleUp Web, we do not believe in bloated retainers or empty buzzwords. We build fast, high-converting websites, automated AI response systems, and bulletproof server-side tracking that directly turn visitors into booked calls and paid orders."
  ],
  stats: [
    { label: "Coding & Building", value: "Since 2023" },
    { label: "Students Trained", value: "75+" },
    { label: "Production Deployments", value: "65+" }
  ],
  linkedin: "https://www.linkedin.com/in/easin-arafat-web-developer",
  photo: "/team/easin-arafat.webp",
  email: "founder@scaleupweb.xyz"
};

export const teamMembers: TeamMember[] = [
  {
    name: founderData.name,
    role: founderData.role,
    photo: founderData.photo,
    linkedin: founderData.linkedin,
    href: "/easin-arafat"
  }
  // Add team members here, e.g.
  // { name: "Full Name", role: "Frontend Developer", photo: "/team/full-name.webp", linkedin: "https://www.linkedin.com/in/…" },
];
