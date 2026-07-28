import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://ai-job-fit-matcher-bay.vercel.app"),
  title: "AI Job-Fit Matcher — Know your fit before you apply",
  description:
    "Upload your resume, paste a job description, and get an instant AI-powered fit score, skill gap analysis, and ATS compatibility report.",
  keywords: ["resume checker", "job fit", "ATS score", "resume analyzer", "AI job matching"],
  authors: [{ name: "Sachin Singh" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AI Job-Fit Matcher",
    description: "Know your fit before you apply. Instant AI resume-to-job matching and ATS scoring.",
    url: "https://ai-job-fit-matcher-bay.vercel.app",
    siteName: "AI Job-Fit Matcher",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Job-Fit Matcher",
    description: "Know your fit before you apply. Instant AI resume-to-job matching and ATS scoring.",
  },
};

export const viewport = {
  themeColor: "#2f5c8a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
