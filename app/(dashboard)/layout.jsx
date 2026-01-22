// app/(dashboard)/layout.jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      {/* We removed the <aside> from here. 
          The header is now handled inside each page 
          to ensure perfect responsiveness.
      */}
      {children}
    </div>
  );
}
