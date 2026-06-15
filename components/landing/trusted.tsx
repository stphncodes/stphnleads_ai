import { trustedLogos } from "@/data/landing";

export function Trusted() {
  return (
    <section className="border-y border-white/[0.05] bg-white/[0.012] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-faint">
          Trusted by modern revenue teams
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-16">
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="select-none whitespace-nowrap text-xl font-semibold tracking-tight text-white/35 transition-colors hover:text-white/70"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
