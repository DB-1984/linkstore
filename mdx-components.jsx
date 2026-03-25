// mdx-components.jsx
import Link from "next/link";

export function useMDXComponents(components) {
  return {
    // This turns all Markdown links into high-speed Next.js Links
    a: ({ href, children }) => (
      <Link
        href={href}
        className="font-black text-black underline underline-offset-4 decoration-zinc-400 hover:text-zinc-800 transition-colors"
      >
        {children}
      </Link>
    ),
    h1: ({ children }) => (
      <h1 className="text-5xl sm:text-6xl font-black tracking-tighter italic mb-8 uppercase leading-none">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-black tracking-tight mt-12 mb-4 flex items-center gap-2 uppercase text-zinc-800">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-lg font-medium leading-relaxed text-zinc-800 mb-6">
        {children}
      </p>
    ),
    hr: () => <hr className="my-10 border-t-2 border-zinc-100" />,
    ...components,
  };
}
