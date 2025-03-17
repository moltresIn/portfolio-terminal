import React, { useState, useEffect, useRef } from "react";
import { commands } from "@/utils/commands";

interface TerminalProps {
  initialMessages?: string[];
}

interface TerminalHistory {
  input?: string;
  output: React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ initialMessages = [] }) => {
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Process the initial messages
  useEffect(() => {
    if (initialMessages.length > 0) {
      const initialEntries = initialMessages.map((msg) => ({
        output: (
          <pre className="mb-4 whitespace-pre-wrap max-w-full overflow-auto text-sm sm:text-base lg:text-lg leading-snug">
            {msg}
          </pre>
        ),
      }));
      setHistory(initialEntries);
    }
  }, [initialMessages]);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [history]);

  const processCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(" ");
    const mainCommand = parts[0];

    // Add to command history
    if (trimmedCmd && !commandHistory.includes(trimmedCmd)) {
      setCommandHistory((prev) => [trimmedCmd, ...prev].slice(0, 20));
      setHistoryIndex(-1);
    }

    let output: React.ReactNode;

    if (trimmedCmd === "") {
      output = <p>&nbsp;</p>;
    } else if (commands[mainCommand]) {
      output = commands[mainCommand](parts.slice(1));
    } else {
      output = (
        <p className="text-terminal-amber">
          Command not found: {trimmedCmd}. Type{" "}
          <span className="text-terminal-green">help</span> for available
          commands.
        </p>
      );
    }

    return output;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: TerminalHistory = {
      input,
      output: <p className="opacity-60">Processing...</p>,
    };

    setHistory((prev) => [...prev, newEntry]);
    const processedOutput = await processCommand(input);

    setHistory((prev) =>
      prev.map((entry, i) =>
        i === prev.length - 1 ? { ...entry, output: processedOutput } : entry
      )
    );

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Up/Down arrows for command history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const availableCommands = Object.keys(commands);
      const match = availableCommands.find((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div
      className="terminal-window h-full max-h-screen w-full bg-terminal text-white font-mono p-4 overflow-y-auto text-base sm:text-lg lg:text-xl"
      ref={terminalRef}
    >
      {/* Terminal History */}
      {history.map((entry, index) => (
        <div key={index} className="mb-3 sm:mb-4">
          {entry.input !== undefined && (
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <span className="terminal-prompt text-lg sm:text-xl lg:text-2xl">
                $
              </span>
              <span className="break-all">{entry.input}</span>
            </div>
          )}
          <div className="pl-0 sm:pl-4 md:pl-6 space-y-2">{entry.output}</div>
        </div>
      ))}

      {/* Input Line */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 sm:gap-3 mt-4"
      >
        <span className="terminal-prompt text-lg sm:text-xl lg:text-2xl">
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input text-base sm:text-lg lg:text-xl bg-terminal text-white outline-none border-none w-full"
          autoFocus
          aria-label="Terminal input"
        />
      </form>
    </div>
  );
};

export default Terminal;
