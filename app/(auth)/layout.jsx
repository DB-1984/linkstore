// app/auth/layout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="relative flex items-center justify-center p-4 mt-4 overflow-hidden">
      {/* SHARED BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0">
        {/* 1. The Grid */}
        <div className="bg-grid-gray mask-radial-fade absolute inset-0 opacity-40" />

        {/* 2. The Spotlight */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/50 rounded-full blur-[120px] pointer-events-none" />

        {/* 3. The Grain */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* THE PAGE CONTENT (Login or Register Card) */}
      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </div>
  );
}
