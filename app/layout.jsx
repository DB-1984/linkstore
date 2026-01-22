// app/layout.jsx
import "@/app/globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>LinkStore | Organize your Web</title>
        <meta name="description" content="Save and tag your favorite links" />
      </head>
      {/* We removed the slate classes so it uses the variables in your globals.css */}
      <body className="antialiased">
        {children}

        {/* The Toast manager sitting at the root */}
        <Toaster
          position="top-center"
          // Match your new UI radius
          toastOptions={{
            style: { borderRadius: "1rem" },
          }}
        />
      </body>
    </html>
  );
}
