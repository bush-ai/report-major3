interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <p
        className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
        style={{ color: "#a855f7" }}
      >
        {label}
      </p>
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight"
        style={{ color: "#f8fafc" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg" style={{ color: "#a1a1aa" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
