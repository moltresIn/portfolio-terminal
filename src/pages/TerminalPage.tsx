import React, { useEffect } from "react";
import Terminal from "@/components/Terminal";

const TerminalPage: React.FC = () => {
  const asciiLogo = `
  ██╗  ██╗██╗███████╗██╗  ██╗ ██████╗ ██████╗ 
  ██║ ██╔╝██║██╔════╝██║  ██║██╔═══██╗██╔══██╗
  █████╔╝ ██║███████╗███████║██║   ██║██████╔╝
  ██╔═██╗ ██║╚════██║██╔══██║██║   ██║██╔══██╗
  ██║  ██╗██║███████║██║  ██║╚██████╔╝██║  ██║
  ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
                                             
  =============================================
  PORTFOLIO TERMINAL v1.0.0
  =============================================
  `;

  const initialMessages = [
    asciiLogo, // Include ASCII art as the first message in the terminal
    "✨ Welcome to the Interactive Portfolio Terminal! Type 'help' to discover all the exciting possibilities.",
    "🚀 Ready to explore? Let's begin an amazing journey through technology and innovation!",
  ];

  useEffect(() => {
    document.title = "Terminal | Portfolio";

    // Prevent scrolling on this page
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white font-mono overflow-hidden">
      {/* Terminal Component */}
      <Terminal initialMessages={initialMessages} />
    </div>
  );
};

export default TerminalPage;
