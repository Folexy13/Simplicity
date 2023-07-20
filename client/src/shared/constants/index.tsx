export const Packages = [
  {
    title: "Basic",
    price: "FREE",
    content: [
      {
        icon: "accepted",
        details: "3 requests per day",
      },
      {
        icon: "accepted",
        details: "4 free courses max",
      },
      {
        icon: "accepted",
        details: "Summarize Note",
      },
      {
        icon: "accepted",
        details: "Only PDFs uploads",
      },
      {
        icon: "rejected",
        details: "Generate random questions from note",
      },
      {
        icon: "rejected",
        details: "Form quizs from note",
      },
      {
        icon: "rejected",
        details: "Solve assignments from note",
      },
      {
        icon: "rejected",
        details: "Write non-plagirized Research on any topic",
      },
    ],
  },
  {
    title: "Standard",
    price: "$5/month",
    titleColor: "blueviolet",
    content: [
      {
        icon: "accepted",
        details: "7 requests per day",
      },
      {
        icon: "accepted",
        details: "12 free courses max",
      },
      {
        icon: "accepted",
        details: "Summarize Note",
      },
      {
        icon: "accepted",
        details: "Only PDFs and Docs uploads",
      },
      {
        icon: "accepted",
        details: "Generate random questions from note",
      },
      {
        icon: "rejected",
        details: "Form quizs from note",
      },
      {
        icon: "accepted",
        details: "Solve assignments from note",
      },
      {
        icon: "rejected",
        details: "Write non-plagirized Research on any topic",
      },
    ],
  },
  {
    title: "Premium",
    price: "$15/month",
    titleColor: "orange",
    content: [
      {
        icon: "accepted",
        details: "10 requests per day",
      },
      {
        icon: "accepted",
        details: "12 free courses max",
      },
      {
        icon: "accepted",
        details: "Summarize Note",
      },
      {
        icon: "accepted",
        details: "Only PDFs,Docs and Images uploads",
      },
      {
        icon: "accepted",
        details: "Generate random questions from note",
      },
      {
        icon: "accepted",
        details: "Form quizs from note",
      },
      {
        icon: "accepted",
        details: "Solve assignments from note",
      },
      {
        icon: "accepted",
        details: "Write non-plagirized Research on any topic",
      },
    ],
  },
];

const CategoryBYTitle = [
  { name: "Languages", slug: "languages" },
  { name: "STEM", slug: "stem" },
  { name: "Computer & Programming", slug: "computer_programming" },
  { name: "Business", slug: "business" },
  { name: "Fashions", slug: "fashions" },
  { name: "Arts", slug: "arts" },
  { name: "Soft Skills", slug: "soft_skills" },
];
const CategoryByDuration = [
  { name: "1-4 hrs", slug: "1" },
  { name: "5-8hrs", slug: "2" },
  { name: "9-12hrs", slug: "3" },
  { name: "13-16hrs", slug: "4" },
  { name: "17-20hrs", slug: "5" },
  { name: "21-24hrs", slug: "6" },
  { name: "24hrs+", slug: "7" },
];
const CategoryByCertificate = [
  { name: "Google Certified", slug: "google" },
  { name: "Facebook Certified", slug: "facebook" },
  { name: "Havard Certified", slug: "havard" },
  { name: "MIT Certified", slug: "mit" },
  { name: "Udemy Certified", slug: "udemy" },
  { name: "Alison Certified", slug: "alison" },
];

const CategoryByLiveSession = [
  { name: "AI", slug: "ai" },
  { name: "Human", slug: "human" },
];

const CategoryByCensus = [
  {name:"Most Popular",slug:"most_popular"},
  {name:"Most Recent",slug:"most_recent"},
  {name:"Most Comprehensive"}
]

export const AllCategories = {
  CategoryBYTitle,
  CategoryByDuration,
  CategoryByCertificate,
  CategoryByLiveSession,
  CategoryByCensus
};
