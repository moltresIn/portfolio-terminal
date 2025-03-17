import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const bootMessages = [
  "[ OK ] Started System Initialization",
  "[ OK ] Started Load Kernel Modules",
  "[ OK ] Started User Manager for UID 0",
  "[ OK ] Started Hostname Service",
  "[ OK ] Started Portfolio Data Service",
  "[ OK ] Started Resume Database",
  "[ OK ] Started Project Repository Service",
  "[ OK ] Reached Target Professional Network",
  "[ OK ] Started Portfolio Terminal Interface",
];

const BootAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [showStartPrompt, setShowStartPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate boot sequence with messages
    const messageInterval = setInterval(() => {
      if (currentMessageIndex < bootMessages.length - 1) {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(messageInterval);
        setBootComplete(true);
        setTimeout(() => setShowStartPrompt(true), 500);
      }
    }, 600);

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const next = prevProgress + (100 - prevProgress) * 0.1;
        return next >= 100 ? 100 : next;
      });
    }, 300);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [currentMessageIndex]);

  const handleStartTerminal = () => {
    navigate("/terminal");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && bootComplete) {
      handleStartTerminal();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootComplete]);

  return (
    <div className="boot-animation">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-left mb-8">
          <h1 className="linux-header text-xl sm:text-2xl md:text-3xl font-mono text-terminal-green mb-2">
            Portfolio OS <span className="text-terminal-amber">v1.0.4</span>
          </h1>
          <p className="text-terminal-light-gray text-sm sm:text-base">
            Portfolio Terminal{" "}
            <span className="text-terminal-amber">[Running]</span>
          </p>
        </div>

        <div className="linux-boot-log w-full bg-black/30 border border-terminal-gray/20 rounded p-3 sm:p-4 text-left mb-6 h-60 sm:h-72 md:h-80 overflow-y-auto">
          <pre className="text-xs sm:text-sm md:text-base font-mono text-terminal-light-gray">
            Starting Portfolio System v1.0.4 (tty1) Portfolio OS 1.0.4 LTS
            portfolio tty1 portfolio login: admin Password: ********* Last
            login: {new Date().toLocaleString()}
            Loading developer profile...
          </pre>

          <div className="mt-4 space-y-1">
            {bootMessages
              .slice(0, currentMessageIndex + 1)
              .map((message, index) => (
                <div
                  key={index}
                  className="font-mono text-xs sm:text-sm text-terminal-green animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {message}
                </div>
              ))}
          </div>
        </div>

        <div className="linux-progress w-full">
          <div className="flex justify-between text-xs sm:text-sm text-terminal-light-gray mb-1">
            <span>System boot</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-terminal-green/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-terminal-green"
              style={{
                width: `${progress}%`,
                transition: "width 0.3s ease-out",
              }}
            ></div>
          </div>
        </div>

        {bootComplete && (
          <div className="text-center mt-8 sm:mt-10">
            <p className="text-terminal-green text-sm sm:text-base mb-4">
              System ready
            </p>
            {showStartPrompt && (
              <>
                <button
                  onClick={handleStartTerminal}
                  className="linux-button px-5 py-2 sm:px-6 sm:py-3 bg-transparent border border-terminal-green text-terminal-green 
  rounded hover:bg-terminal-green/10 transition-all duration-300 font-mono text-sm sm:text-base
  opacity-100 shadow-[0_0_5px_#50fa7b] hover:shadow-[0_0_15px_#50fa7b]"
                  style={{ animationDelay: "0.3s" }}
                >
                  Start Terminal
                </button>

                <p className="linux-prompt text-terminal-amber text-sm sm:text-base mt-4 animate-blink">
                  kishor@portfolio:~${" "}
                  <span className="typing-effect">startx</span>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BootAnimation;
