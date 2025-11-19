const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <div className="relative">
        {/* Layer 1 - Outermost ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-900 dark:border-t-gray-100 animate-spin w-24 h-24"></div>

        {/* Layer 2 */}
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-r-gray-700 dark:border-r-gray-300 animate-spin w-20 h-20"
          style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
        ></div>

        {/* Layer 3 */}
        <div
          className="absolute inset-4 rounded-full border-4 border-transparent border-b-gray-600 dark:border-b-gray-400 animate-spin w-16 h-16"
          style={{ animationDuration: "0.8s" }}
        ></div>

        {/* Layer 4 */}
        <div
          className="absolute inset-6 rounded-full border-4 border-transparent border-l-gray-500 dark:border-l-gray-500 animate-spin w-12 h-12"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Layer 5 - Innermost ring */}
        <div
          className="absolute inset-8 rounded-full border-4 border-transparent border-t-gray-400 dark:border-t-gray-600 animate-spin w-8 h-8"
          style={{ animationDuration: "1s" }}
        ></div>

        {/* Center pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
