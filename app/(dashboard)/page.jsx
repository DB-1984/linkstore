// app/(dashboard)/page.jsx
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Links</h1>
      <p className="text-slate-600">
        Your latest 10 saved links will appear here.
      </p>

      {/* This is where your Shadcn Collapsibles will eventually go */}
      <div className="mt-6 space-y-4">
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          Sample Link:{" "}
          <span className="text-blue-500 underline">google.com</span>
        </div>
      </div>
    </div>
  );
}
