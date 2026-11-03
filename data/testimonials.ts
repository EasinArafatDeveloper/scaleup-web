export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  results: string;
  avatarText: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "amar-organic",
    name: "Mahmudur Rahman",
    role: "Founder & CEO",
    company: "Amar Organic Shop",
    location: "Dhaka, Bangladesh",
    content:
      "ScaleUp Web migrated our slow Facebook page sales into a custom Next.js storefront with automated bKash checkout and Steadfast courier sync. Our order handling time dropped by 70%, and delivery cancellations decreased dramatically.",
    rating: 5,
    results: "70% faster order fulfillment",
    avatarText: "MR"
  },
  {
    id: "care-dent",
    name: "Dr. Farah Naz",
    role: "Managing Director",
    company: "CareDent Dental Clinic",
    location: "Dhanmondi, Dhaka",
    content:
      "The WhatsApp automation bot they set up answers patient queries 24/7 and confirms appointments automatically. No more missing patient calls after 8 PM, and no double bookings.",
    rating: 5,
    results: "+45% booked consultations",
    avatarText: "FN"
  }
];
