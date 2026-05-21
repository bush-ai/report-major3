import bushAiLogo from "@assets/bushAiLogo_1779324838107.png";

export default function LoadingState() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "#07070d" }}
    >
      <img src={bushAiLogo} alt="BushAI" className="w-20 h-20 animate-pulse" />
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "#a855f7",
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="text-[#a1a1aa] text-sm tracking-widest uppercase">
        Loading Report…
      </p>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
