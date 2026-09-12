import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sprout, User } from "lucide-react";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { inputClass } from "@/components/FormField";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "KisanSetu AI Assistant — Demo Farming Chat" },
      {
        name: "description",
        content:
          "Friendly prototype farming chat assistant with suggested questions about soil, seeds, crop care, equipment and seasons.",
      },
      { property: "og:title", content: "KisanSetu AI Assistant — Demo Farming Chat" },
      {
        property: "og:description",
        content: "Prototype farmer chat assistant built for a college mini-project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

type Msg = { id: number; role: "bot" | "user"; text: string };

const suggestions = [
  "Which crop is suitable for my soil?",
  "Which seed should I choose?",
  "How can I improve crop production?",
  "Which equipment should I rent?",
  "What should I grow this season?",
];

const answers: { match: string[]; reply: string }[] = [
  {
    match: ["soil"],
    reply:
      "For loamy or alluvial soil, wheat and paddy usually do well. Sandy soil suits mustard and potato, while black soil supports tomato. Get your soil tested at the nearest demo Krishi Kendra before sowing.",
  },
  {
    match: ["seed", "variety"],
    reply:
      "Pick a seed that matches your soil, season and water supply. In the demo catalogue, Sona Gold Wheat HD-2967 suits Rabi loamy plots, and Swarna Sub-1 paddy handles flood-prone Kharif fields.",
  },
  {
    match: ["production", "yield", "improve"],
    reply:
      "Four simple steps usually help: treat seeds before sowing, keep row spacing even, irrigate at the flowering stage, and add organic manure along with balanced fertiliser.",
  },
  {
    match: ["equipment", "rent", "tractor", "pump"],
    reply:
      "For plots under 2 acres a power tiller is enough. Larger fields benefit from a 42 HP tractor with rotavator. For irrigation, a 5 HP diesel or solar pump works well in the demo listings.",
  },
  {
    match: ["season", "grow", "sow"],
    reply:
      "Kharif (June–October) suits paddy and maize. Rabi (November–March) suits wheat, mustard and potato. Zaid (March–June) is good for short-duration maize and vegetables.",
  },
  {
    match: ["discount", "subsidy", "benefit"],
    reply:
      "The Demo Benefits page shows prototype discounts such as 15% off seeds and 10% off equipment rentals. These are sample cards only — not a real government scheme.",
  },
  {
    match: ["water", "irrigation"],
    reply:
      "Irrigate at the critical stages: crown root, tillering and flowering. Drip or sprinkler systems save water on vegetables, and mulching cuts evaporation in dry areas.",
  },
];

function reply(question: string) {
  const q = question.toLowerCase();
  const found = answers.find((a) => a.match.some((m) => q.includes(m)));
  return (
    found?.reply ??
    "I am a prototype assistant with a small set of demo answers. Try asking about soil, seeds, water, seasons, equipment or demo discounts."
  );
}

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: "Namaste! I am the KisanSetu AI Assistant 🌱 Ask me about soil, seeds, irrigation, equipment or the demo discounts.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: reply(value) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <PageHeader
        eyebrow="Farmer support"
        title="KisanSetu AI Assistant 🌱"
        description="A friendly prototype chat that answers common farming questions in simple language."
      />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          AI responses are for educational and prototype demonstration purposes and should not
          replace professional agricultural advice.
        </DisclaimerBanner>

        <div className="mt-8 flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-leaf px-5 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-foreground/20">
              <Sprout className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display font-bold text-primary-foreground">KisanSetu Assistant</p>
              <p className="text-xs text-primary-foreground/85">Demo assistant · always online</p>
            </div>
          </div>

          <div className="h-[26rem] space-y-4 overflow-y-auto bg-secondary/40 p-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-end gap-2.5 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "bot" && (
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Sprout className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft ${
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-card text-card-foreground"
                  }`}
                >
                  {m.text}
                </p>
                {m.role === "user" && (
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-earth-soft text-earth">
                    <User className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary">
                  <Sprout className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="rounded-2xl rounded-bl-sm bg-card px-4 py-3 text-sm text-muted-foreground shadow-soft">
                  Typing…
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-4">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-primary-soft hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                className={inputClass}
                placeholder="Type your farming question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Your question"
              />
              <button
                type="submit"
                aria-label="Send question"
                className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
