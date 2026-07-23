import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "AI Job-Fit Matcher",
  description: "Know your fit before you apply.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}