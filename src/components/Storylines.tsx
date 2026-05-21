import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface Storyline {
  id: string;
  title: string;
  supportingStats: { label: string; value: string | number }[];
  recommendedUse: string;
}

export default function Storylines({ data }: { data: Storyline[] }) {
  if (!data?.length) return null;

  return (
    <section id="storylines">
      <SectionHeader
        label="Narrative"
        title="Storylines"
        subtitle="The story threads that defined Championship Sunday — built from data, written for people."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:border-[rgba(168,85,247,0.4)]"
            style={{
              background: "#141421",
              border: "1px solid rgba(168,85,247,0.18)",
              backgroundImage: "linear-gradient(135deg, rgba(168,85,247,0.04) 0%, transparent 60%)",
            }}
            data-testid={`storyline-${story.id}`}
          >
            {/* Title */}
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase mb-2" style={{ color: "#a855f7" }}>
                Storyline {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-black leading-snug" style={{ color: "#f8fafc" }}>
                {story.title}
              </h3>
            </div>

            {/* Supporting stats */}
            {story.supportingStats?.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {story.supportingStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3"
                    style={{
                      background: "rgba(168,85,247,0.07)",
                      border: "1px solid rgba(168,85,247,0.12)",
                    }}
                  >
                    <p className="text-sm font-black" style={{ color: "#f8fafc" }}>{stat.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Recommended use */}
            {story.recommendedUse && (
              <div className="mt-auto">
                <span
                  className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(236,72,153,0.1)",
                    border: "1px solid rgba(236,72,153,0.25)",
                    color: "#ec4899",
                  }}
                >
                  {story.recommendedUse}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
