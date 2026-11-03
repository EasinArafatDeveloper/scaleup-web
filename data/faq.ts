export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "pricing" | "technical" | "support";
}

export const homeFAQList: FAQItem[] = [
  {
    id: "how-to-start",
    question: "How do we get started on a project together?",
    answer:
      "Simply fill out our 2-minute Free Audit or Contact form, or message us directly on WhatsApp. We will review your current business setup, schedule a brief discovery call if needed, and give you a fixed-price proposal with clear deliverables and delivery dates.",
    category: "general"
  },
  {
    id: "payment-terms",
    question: "What are your payment terms?",
    answer:
      "We operate on complete transparency: 50% advance to initiate the development sprint, and the remaining 50% only upon final delivery, testing, and your sign-off. Monthly retainers (SEO, GEO & chatbot hosting) are billed in advance on the 1st of each month.",
    category: "pricing"
  },
  {
    id: "timeline",
    question: "How long does it take to deliver a project?",
    answer:
      "A high-converting landing page takes 3–5 days. A complete business website or e-commerce store with bKash and courier integration takes 10–18 days. Custom software or ERP systems typically take 3–6 weeks depending on requirements.",
    category: "general"
  },
  {
    id: "domain-hosting",
    question: "Do you provide domain registration and hosting?",
    answer:
      "We help you configure and connect your domain (e.g. .com or .com.bd). We deploy frontend websites on enterprise global edge clouds (Vercel) with free SSL and lightning speed. Database and server hosting costs are paid directly to cloud providers so you retain 100% account control.",
    category: "technical"
  },
  {
    id: "support-after-delivery",
    question: "What kind of support do you provide after delivery?",
    answer:
      "Every project comes with 1 to 3 months of free warranty support covering any bug fixes, technical maintenance, and small tweaks. We also record video tutorials showing you and your team how to manage orders and content.",
    category: "support"
  },
  {
    id: "code-ownership",
    question: "Do I own 100% of my code and digital assets?",
    answer:
      "Yes, absolutely. Once the project is completed and final payment is cleared, full ownership of the GitHub repository, hosting credentials, domain access, and design assets are transferred to you.",
    category: "general"
  },
  {
    id: "outside-dhaka",
    question: "Do you work with businesses outside Dhaka or outside Bangladesh?",
    answer:
      "Yes! We work with clients across all divisions in Bangladesh (Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, etc.) as well as international clients in the USA, UK, Middle East, and Australia. All meetings and sprint reviews happen smoothly over Google Meet and WhatsApp.",
    category: "general"
  },
  {
    id: "chatbot-bangla",
    question: "How does your AI chatbot handle Bangla and Banglish?",
    answer:
      "Our AI chatbots are custom-prompted with real conversational transcripts. They effortlessly understand formal Bangla (বাংলা), conversational Banglish (e.g., 'bhai product price koto, delivery kobe pabo?'), and English, answering accurately with instant pricing and taking customer orders.",
    category: "technical"
  }
];
