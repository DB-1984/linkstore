// app/layout.jsx
import "@/app/globals.css"; // The only place you need to import this

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>LinkStore | Organize your Web</title>
        <meta name="description" content="Save and tag your favorite links" />
      </head>
      <body className="antialiased text-slate-900 bg-slate-50">
        {/* The {children} here represents everything else in your app:
          The landing page, the login screen, and the entire dashboard.
        */}
        {children}
      </body>
    </html>
  );
}
