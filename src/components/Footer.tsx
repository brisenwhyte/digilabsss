import { navItems } from "@/data/landing";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 text-sm text-white/46 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white">DigiLabss</p>
          <p className="mt-3">AI-engineered marketing for growing brands.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-white">{item.label}</a>)}
          <a href="#quote" className="hover:text-white">Contact</a>
          <a href="mailto:hello@digilabss.com" className="hover:text-white">hello@digilabss.com</a>
          <a href="https://digilabss.com/" className="hover:text-white">Original Site</a>
        </div>
        <p>Copyright {new Date().getFullYear()} DigiLabss.</p>
      </div>
    </footer>
  );
}