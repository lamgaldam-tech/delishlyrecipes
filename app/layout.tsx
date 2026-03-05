import { AuthProvider } from "@/app/contexts/AuthContext";
import { RecipesProvider } from "@/app/contexts/RecipesContext";
import "@/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RecipesProvider>{children}</RecipesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
