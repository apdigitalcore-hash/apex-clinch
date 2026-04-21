import { useEffect, useRef, ReactNode, FormEvent } from "react";

const CALENDLY_URL = "https://calendly.com/apdigital-core/30min";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Section({ dark, deep, children, className = "" }: { dark?: boolean; deep?: boolean; children: ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <section ref={ref} className={`${deep ? "section-deep" : dark ? "section-dark" : "section-white"} py-20 md:py-28 px-5 opacity-0 ${className}`} style={{ animationFillMode: "both" }}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}

function CTAButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`cta-button block text-center ${className}`}>
      {children}
    </a>
  );
}

/* ─── LEAD FORM ─── */
function LeadForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Name: ${data.get("name")}\nCoaching Type: ${data.get("type")}\nCity/Province: ${data.get("city")}\nPhone: ${data.get("phone")}`;
    window.location.href = `mailto:apdigital.core@gmail.com?subject=Strategy Call Request - ${data.get("type")} Coach in ${data.get("city")}&body=${encodeURIComponent(body)}`;
  };
  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3 text-center">Ready to Fill Your Coaching Calendar?</h2>
        <p className="text-center opacity-60 mb-8 text-base md:text-lg leading-relaxed">
          Book a free 20-minute call. We'll show you exactly how many potential clients are searching for coaches like you in your area.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full rounded-lg border px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2"
            style={{ background: "hsla(254,100%,64%,0.05)", border: "1px solid hsla(254,100%,64%,0.25)", color: "inherit" }}
          />
          <select
            name="type"
            required
            className="w-full rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2"
            style={{ background: "hsla(254,100%,64%,0.05)", border: "1px solid hsla(254,100%,64%,0.25)", color: "inherit" }}
          >
            <option value="" disabled>Coaching Type</option>
            <option>Life Coach</option>
            <option>Business Coach</option>
            <option>Fitness Coach</option>
            <option>Health Coach</option>
            <option>Other</option>
          </select>
          <input
            name="city"
            type="text"
            placeholder="City / Province"
            required
            className="w-full rounded-lg border px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2"
            style={{ background: "hsla(254,100%,64%,0.05)", border: "1px solid hsla(254,100%,64%,0.25)", color: "inherit" }}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full rounded-lg border px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2"
            style={{ background: "hsla(254,100%,64%,0.05)", border: "1px solid hsla(254,100%,64%,0.25)", color: "inherit" }}
          />
          <button
            type="submit"
            className="w-full rounded-lg font-extrabold py-4 text-base md:text-lg tracking-wide transition-colors duration-200"
            style={{ background: "hsl(25, 95%, 53%)", color: "white" }}
          >
            Book My Free Strategy Call
          </button>
        </form>
      </div>
    </Section>
  );
}

/* ─── 1. HERO ─── */
function HeroSection() {
  return (
    <section className="section-dark pt-16 pb-20 md:pt-24 md:pb-28 px-5">
      <div className="max-w-5xl mx-auto text-center reveal">
        <span className="pill-badge mb-8 inline-flex">
          <span className="w-2 h-2 rounded-full bg-purple inline-block" /> MARKETING FOR PRIVATE COACHES | BC CANADA
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mt-8 mb-6" style={{ textWrap: "balance" as any }}>
          BC Coaching Marketing — Get More Clients with Meta Ads &amp; Content
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-60 leading-relaxed" style={{ textWrap: "pretty" as any }}>
          We build your Instagram, run your Meta Ads, and create content that turns followers into paying coaching clients — done for you by Arjun Sharma personally
        </p>

        <CTAButton className="max-w-lg mx-auto mb-16">BOOK YOUR FREE STRATEGY CALL →</CTAButton>

        {/* Stats */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <span className="w-2 h-2 rounded-full bg-purple inline-block" />
            <span className="text-xs font-bold tracking-widest uppercase opacity-60">REAL CLIENT RESULTS — BC CANADA</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: "12", label: "NEW CLIENTS", desc: "First 60 days — Online coach, Vancouver BC" },
              { num: "847%", label: "FOLLOWER GROWTH", desc: "0 to 4,200 followers in 90 days" },
              { num: "$11", label: "COST PER LEAD", desc: "Meta Ads — Fitness coach, Surrey BC" },
              { num: "3.8x", label: "RETURN ON AD SPEND", desc: "Average across coaching clients BC" },
            ].map((s, i) => (
              <div key={i} className={`stat-card reveal-delay-${i + 1}`}>
                <div className="text-3xl md:text-4xl font-black text-purple mb-1">{s.num}</div>
                <div className="text-xs font-bold tracking-wider uppercase mb-2">{s.label}</div>
                <div className="text-xs opacity-50">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. SOCIAL PROOF BAR ─── */
function SocialProofBar() {
  const stats = [
    { num: "100%", label: "FOUNDER DIRECT", desc: "Arjun handles every account personally" },
    { num: "30", label: "DAYS TO FIRST LEAD", desc: "Average for new coaching clients" },
    { num: "$0", label: "LOCK-IN CONTRACTS", desc: "Month-to-month, cancel anytime" },
    { num: "2", label: "NICHES ONLY", desc: "Trades + Coaches. No generalists." },
  ];
  return (
    <Section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`text-center reveal-delay-${i + 1}`}>
            <div className="text-4xl md:text-5xl font-black text-purple mb-2">{s.num}</div>
            <div className="text-xs font-bold tracking-wider uppercase mb-1">{s.label}</div>
            <div className="text-sm opacity-60">{s.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── 3. THE PROBLEM ─── */
function ProblemSection() {
  const problems = [
    "You're posting consistently but getting likes from other coaches — not paying clients",
    "You've tried running ads yourself and burned money with nothing to show for it",
    "Every agency you've spoken to has no idea what a coaching funnel actually looks like",
  ];
  return (
    <Section dark>
      <span className="pill-badge mb-6 inline-flex">WHY MOST COACHES STAY BROKE ONLINE</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-10" style={{ textWrap: "balance" as any }}>
        You're doing everything right. So why aren't the clients coming?
      </h2>
      <div className="space-y-4">
        {problems.map((p, i) => (
          <div key={i} className={`problem-card reveal-delay-${i + 1}`}>
            <p className="text-lg font-medium">{p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── 4. THE SYSTEM ─── */
function SystemSection() {
  const steps = [
    { title: "Content Strategy", desc: "30-day content calendar that positions you as the authority in your niche" },
    { title: "Trust Building", desc: "Reels, carousels and stories that turn cold followers into warm leads" },
    { title: "Paid Ads", desc: "Meta Ads targeting your ideal clients in BC — right people, right message, right budget" },
    { title: "Client Flow", desc: "Inbound leads land in your DMs or booking page. You close. We keep the pipeline full." },
  ];
  return (
    <Section>
      <span className="pill-badge mb-6 inline-flex">THE AP DIGITAL COACHING SYSTEM</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-12" style={{ textWrap: "balance" as any }}>
        The exact framework we use to turn your Instagram into a client machine
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={i} className={`step-card reveal-delay-${i + 1}`}>
            <div className="step-number">{i + 1}</div>
            <h3 className="text-lg font-bold mb-2">{s.title}</h3>
            <p className="text-sm opacity-70">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── 5. OFFER STACK ─── */
function OfferSection() {
  const items = [
    { title: "Instagram & Reels Management", desc: "3–5 posts/week. Content that positions you as the go-to coach in BC" },
    { title: "Meta Lead Ads", desc: "Targeted ads to your ideal clients. We set up, manage and optimize until cost-per-lead is dialled in" },
    { title: "Custom Content Carousels", desc: "Authority-building posts that get saved and shared by your target audience" },
    { title: "Monthly Strategy Calls with Arjun", desc: "Direct calls with the founder. Review results, adjust strategy" },
    { title: "Coaching Landing Page", desc: "High-converting page built to turn clicks into booked discovery calls" },
    { title: "Monthly Performance Reports", desc: "Follower growth, leads, cost per lead, ROAS — clear and jargon-free" },
  ];
  const valueStack = [
    { name: "Instagram Management", price: "$1,200/mo" },
    { name: "Meta Ads Management", price: "$800/mo" },
    { name: "Content Creation & Carousels", price: "$600/mo" },
    { name: "Monthly Strategy Calls", price: "$400/mo" },
    { name: "Coaching Landing Page", price: "$1,500 one-time" },
  ];
  return (
    <Section dark>
      <span className="pill-badge mb-6 inline-flex">WHAT YOU GET WITH AP DIGITAL</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-12" style={{ textWrap: "balance" as any }}>
        Everything a coaching business needs to get clients online. Nothing you don't.
      </h2>
      <div className="space-y-0 mb-12">
        {items.map((item, i) => (
          <div key={i} className={`offer-item reveal-delay-${i + 1}`}>
            <div className="offer-number">{i + 1}</div>
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm opacity-60 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Value Stack */}
      <div className="rounded-xl p-8 md:p-10" style={{ background: "hsl(228 55% 6%)", border: "1px solid hsla(254, 100%, 64%, 0.3)" }}>
        <div className="space-y-3 mb-8">
          {valueStack.map((v, i) => (
            <div key={i} className="flex justify-between items-center text-sm md:text-base opacity-70">
              <span>{v.name}</span>
              <span className="line-through">{v.price}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-6" style={{ borderColor: "hsla(254, 100%, 64%, 0.3)" }}>
          <div className="flex justify-between items-center text-lg mb-1">
            <span className="font-bold">TOTAL VALUE:</span>
            <span className="line-through opacity-60">$4,500/mo</span>
          </div>
          <div className="flex justify-between items-center text-2xl md:text-3xl font-black">
            <span>YOUR INVESTMENT:</span>
            <span className="text-purple">Starting at $997/mo</span>
          </div>
        </div>
      </div>

      <CTAButton className="mt-10 max-w-xl mx-auto">GET STARTED — BOOK A FREE CALL →</CTAButton>
    </Section>
  );
}

/* ─── 6. WHO THIS IS FOR ─── */
function WhoIsForSection() {
  const yes = [
    "You're a private coach or personal trainer in BC",
    "You want consistent client flow, not feast-and-famine",
    "You're ready to invest in marketing for real ROI",
    "You want one person handling everything personally",
    "You want leads in 30 days, not 6 months",
  ];
  const no = [
    "You want the cheapest option regardless of results",
    "You want to micromanage every post and caption",
    "You have zero budget for paid ads",
    "You're not serious about growing your coaching business",
    "You expect results without giving us time to work",
  ];
  return (
    <Section dark>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-12">This is for you if...</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {yes.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0" style={{ color: "hsl(142, 71%, 45%)" }}>✅</span>
              <p className="text-base">{item}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {no.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">❌</span>
              <p className="text-base opacity-70">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 7. TESTIMONIALS ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      text: "I was posting on Instagram every day and barely getting DMs. AP Digital set up a simple Meta Ads campaign and I had 6 discovery calls booked in the first month.",
      name: "Sarah M.",
      role: "Life Coach — Vancouver, BC",
    },
    {
      text: "The ROI is real. I charge $2,500 for my business coaching package and I signed two new clients in the first 5 weeks. The ads paid for themselves fast.",
      name: "James K.",
      role: "Business Coach — Burnaby, BC",
    },
    {
      text: "Arjun understood the coaching space right away. He didn't treat me like just another client — he actually knew what makes coaching ads convert.",
      name: "Priya L.",
      role: "Fitness Coach — Surrey, BC",
    },
  ];
  return (
    <Section>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-12">What BC Coaches Are Saying</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-xl p-8 shadow-lg relative" style={{ borderTop: "4px solid hsl(254, 100%, 64%)" }}>
            <div className="text-xl mb-4" style={{ color: "hsl(38, 92%, 50%)" }}>★★★★★</div>
            <p className="text-base leading-relaxed mb-6 opacity-80">"{t.text}"</p>
            <div>
              <div className="font-bold">{t.name}</div>
              <div className="text-sm opacity-60">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── 8. FAQ ─── */
function FAQSection() {
  const faqs = [
    { q: "How fast will I get new coaching clients?", a: "Most clients see first leads within 2 weeks of running Meta Ads. Instagram growth compounds over 60-90 days. We track everything weekly." },
    { q: "Do I need a big following already?", a: "No. We build Instagram and run Meta Ads at the same time. Many of our clients started from zero." },
    { q: "Will Arjun personally handle my account?", a: "Yes. No team, no account managers, no outsourcing. Arjun personally manages every account. You text him directly." },
    { q: "What types of coaches do you work with?", a: "Personal trainers, online coaches, nutrition coaches, mindset coaches, fitness instructors, yoga teachers across Metro Vancouver, Surrey, Langley, BC Canada." },
    { q: "Is there a long-term contract?", a: "No lock-in. Month-to-month. Cancel with 30 days notice. Results keep you here — not a contract." },
  ];
  return (
    <Section dark>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-12">Your questions, answered:</h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem key={i} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </Section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={detailsRef} className="group rounded-lg overflow-hidden" style={{ background: "hsla(254, 100%, 64%, 0.06)", border: "1px solid hsla(254, 100%, 64%, 0.15)" }}>
      <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-base md:text-lg list-none [&::-webkit-details-marker]:hidden">
        {question}
        <span className="text-purple text-2xl transition-transform duration-200 group-open:rotate-45 flex-shrink-0 ml-4">+</span>
      </summary>
      <div className="px-5 pb-5 text-sm opacity-70 leading-relaxed">{answer}</div>
    </details>
  );
}

/* ─── 9. GUARANTEE ─── */
function GuaranteeSection() {
  return (
    <Section deep className="text-center">
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold mb-8" style={{ background: "hsla(142, 71%, 45%, 0.15)", color: "hsl(142, 71%, 45%)", border: "1px solid hsla(142, 71%, 45%, 0.3)" }}>
          🛡️ 30-DAY RESULTS GUARANTEE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6" style={{ textWrap: "balance" as any }}>
          If you don't get results in 30 days, you don't pay for month 2.
        </h2>
        <p className="text-lg opacity-60 leading-relaxed">
          If we don't generate measurable results — leads, booked discovery calls, or meaningful Instagram growth — in your first 30 days, your second month is free.
        </p>
      </div>
    </Section>
  );
}

/* ─── 10. FINAL CTA ─── */
function FinalCTASection() {
  useEffect(() => {
    // Trigger Calendly widget rendering after mount
    if ((window as any).Calendly) {
      (window as any).Calendly.initInlineWidget({
        url: "https://calendly.com/apdigital-core/30min?background_color=080d1a&text_color=ffffff&primary_color=6c47ff",
        parentElement: document.getElementById("calendly-embed"),
      });
    }
  }, []);

  return (
    <Section dark className="text-center">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-8" style={{ background: "hsla(38, 92%, 50%, 0.15)", color: "hsl(38, 92%, 50%)", border: "1px solid hsla(38, 92%, 50%, 0.3)" }}>
        ⚡ Only 3 new coaching client spots open this month in BC
      </div>

      <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-6" style={{ textWrap: "balance" as any }}>
        READY TO FINALLY GET CLIENTS FROM INSTAGRAM?
      </h2>

      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 opacity-60 leading-relaxed">
        Book a free 20-minute strategy call. We'll audit your online presence, show you what's missing, and give you a custom game plan — whether you work with us or not.
      </p>

      <p className="text-sm opacity-40 mb-12">
        No commitment. No sales pressure. Arjun personally reviews your account before the call.
      </p>

      {/* Calendly embed */}
      <div className="max-w-[700px] mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(254, 100%, 64%)" }}>
        <div
          id="calendly-embed"
          className="calendly-inline-widget"
          data-url="https://calendly.com/apdigital-core/30min?background_color=080d1a&text_color=ffffff&primary_color=6c47ff"
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </Section>
  );
}

/* ─── COACHING TYPES ─── */
function CoachingTypesSection() {
  const types = ["Life Coaches", "Business Coaches", "Fitness Coaches", "Health & Wellness Coaches", "Mindset Coaches", "Career Coaches", "Executive Coaches"];
  return (
    <Section>
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-8">We Work With All Types of BC Coaches</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {types.map((t) => (
            <span key={t} className="rounded-full px-5 py-2 text-sm font-semibold" style={{ border: "1px solid hsla(254,100%,64%,0.4)", color: "inherit" }}>
              {t}
            </span>
          ))}
        </div>
        <p className="max-w-2xl mx-auto text-base md:text-lg opacity-60 leading-relaxed">
          Whether you're building your first client roster or scaling to 20+ clients, AP Digital creates a marketing system that fits your coaching niche and budget.
        </p>
      </div>
    </Section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="section-deep py-10 px-5 text-center space-y-2">
      <p className="text-sm opacity-40">© 2026 AP Digital — Vancouver, BC Canada</p>
      <p className="text-sm opacity-40">apdigital.core@gmail.com</p>
      <p className="text-sm">
        <a href="https://ap-digital.ca" className="opacity-60 hover:opacity-100 underline transition-opacity duration-200">
          ← Back to AP Digital | Full-Service Digital Marketing
        </a>
      </p>
    </footer>
  );
}

/* ─── MOBILE STICKY BAR ─── */
function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 text-center font-extrabold text-base tracking-wide"
        style={{ background: "hsl(254, 100%, 64%)", color: "white" }}
      >
        📞 Book Your Free Strategy Call →
      </a>
    </div>
  );
}

/* ─── PAGE ─── */
export default function LandingPage() {
  return (
    <div className="pb-16 md:pb-0">
      <HeroSection />
      <LeadForm />
      <SocialProofBar />
      <ProblemSection />
      <SystemSection />
      <OfferSection />
      <TestimonialsSection />
      <WhoIsForSection />
      <FAQSection />
      <GuaranteeSection />
      <FinalCTASection />
      <CoachingTypesSection />
      <LeadForm />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}

