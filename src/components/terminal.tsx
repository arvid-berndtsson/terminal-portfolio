'use client';

import { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCommand, ParsedCommand } from '../utils/command-parser';
import help from './commands/help';
import projects from './commands/projects';
import resume from './commands/resume';
import clear from './commands/clear';
import man from './commands/man';

const Terminal = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    // Add introductory text to history
    setHistory([
      "                      _     _ ",
      "     /\\              (_)   | |",
      "    /  \\   _ ____   ___  __| |",
      "   / /\\ \\ | '__\\ \\ / / |/ _` |",
      "  / ____ \\| |   \\ V /| | (_| |",
      " /_/    \\_\\_|    \\_/ |_|\\__,_|",
      "                              ",
      "                              ",
      "Welcome to my portfolio! Type 'help' to see available commands.",
      ""
    ]);
  }, []);

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsedCommand = parseCommand(command);
      setHistory((prevHistory) => [...prevHistory, `$ ${command}`]);
      executeCommand(parsedCommand);
      setCommand('');
    }
  };

  const executeCommand = ({ command, args, flags }: ParsedCommand) => {
    let output: string[] = [];
    const navigate = (url: string) => router.push(url);

    switch (command) {
      case 'help':
        output = help();
        break;
      case 'projects':
        output = projects(args, flags, navigate);
        break;
      case 'resume':
        output = resume(navigate);
        break;
      case 'clear':
        output = clear();
        setHistory([]);
        break;
      case 'man':
        output = man(args);
        break;
      default:
        output = [`Command not found: ${command}`];
        break;
    }
    setHistory((prevHistory) => [...prevHistory, ...output]);
  };

  return (
    <div className="bg-[#1e1e2e] text-[#cdd6f4] p-4 h-screen flex flex-col font-mono">
      <div className="flex-grow overflow-y-auto">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line.startsWith('$') ? (
              <span className="text-green-400">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
        <div className="flex">
          <span className="pr-2 text-green-400">{`user@hostname`}</span>
          <span className="text-blue-400">~/current-dir</span>
          <span className="text-green-400"> $</span>
          <input
            ref={inputRef}
            className="bg-transparent text-[#cdd6f4] outline-none flex-grow pl-2"
            type="text"
            value={command}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCommand(e.target.value)}
            onKeyPress={handleCommand}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
