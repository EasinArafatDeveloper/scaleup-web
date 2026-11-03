export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

export const statsData: StatItem[] = [
  {
    id: "projects",
    value: 65,
    suffix: "+",
    label: "Projects Delivered",
    sublabel: "Websites, AI bots & custom apps"
  },
  {
    id: "clients",
    value: 48,
    suffix: "+",
    label: "Active Clients",
    sublabel: "Across Bangladesh & overseas"
  },
  {
    id: "support_rate",
    value: 99,
    suffix: "%",
    label: "On-Time Delivery",
    sublabel: "Backed by fixed-price guarantee"
  }
];
