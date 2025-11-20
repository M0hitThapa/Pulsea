const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Container - Scale this to resize the whole loader */}
      <div className="relative w-24 h-24">
        {/* Outer Glow (Atmosphere) */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>

        {/* Layer 1: Outer Orbit */}
        <div
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 dark:border-t-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-spin"
          style={{ animationDuration: "3s" }}
        ></div>

        {/* Layer 2: Middle Orbit (Counter-rotating) */}
        <div
          className="absolute inset-2 rounded-full border-[3px] border-transparent border-r-indigo-500 dark:border-r-violet-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "2s" }}
        ></div>

        {/* Layer 3: Inner Orbit */}
        <div
          className="absolute inset-5 rounded-full border-[3px] border-transparent border-l-purple-500 dark:border-l-fuchsia-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>

        {/* Core: The Energy Source */}
        <div className="absolute inset-[28px] rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
