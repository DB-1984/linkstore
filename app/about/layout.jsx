// app/about/layout.jsx
export default function AboutLayout({ children }) {
  return (
    // We only need the max-width and padding here
    // The background and navbar are already provided by the RootLayout
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="bg-white/50 backdrop-blur-sm p-8 sm:p-12 rounded-[2.5rem] border-2 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        {children}
      </div>
    </section>
  );
}
