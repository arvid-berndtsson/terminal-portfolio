"use client";

import { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCommand, ParsedCommand } from "../utils/command-parser";
import fileSystem, { FileSystemNode } from "../utils/file-system";
import about from "./commands/about";
import cd from "./commands/cd";
import clear from "./commands/clear";
import contact from "./commands/contact";
import help from "./commands/help";
import ls from "./commands/ls";
import man from "./commands/man";
import projects from "./commands/projects";
import resume from "./commands/resume";
import website from "./commands/website";
import whoami from "./commands/whoami";

const Terminal = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState<string>("");
  const [currentDir, setCurrentDir] = useState<FileSystemNode>(fileSystem[""]?.children?.home?.children?.visitor ?? { type: "directory", children: {} });
  const [currentPath, setCurrentPath] = useState<string[]>(["home", "visitor"]);
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

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const parsedCommand = parseCommand(command);
      setHistory((prevHistory) => [...prevHistory, `$ ${command}`]);
      executeCommand(parsedCommand);
      setCommand("");
    }
  };

  const executeCommand = ({ command, args, flags }: ParsedCommand) => {
    let output: string[] = [];
    const navigate = (url: string) => router.push(url);

    switch (command) {
      case "help":
        output = help();
        break;
      case "projects":
        output = projects(args, flags, navigate);
        break;
      case "website":
        output = website();
        break
      case "whoami":
        output = whoami();
        break;
      case "about":
        output = about();
        break;
      case "contact":
        output = contact();
        break;
      case "resume":
        output = resume(navigate);
        break;
      case "clear":
        output = clear();
        setHistory([]);
        break;
      case "man":
        output = man(args);
        break;
      case "ls":
        output = ls(currentDir);
        break;
      case "cd":
        const [cdOutput, newDir, newPath] = cd(args, currentDir, currentPath);
        if (newDir) {
          setCurrentDir(newDir);
          setCurrentPath(newPath);
        }
        output = cdOutput;
        break;
      default:
        output = [`Command not found: ${command}`];
        break;
    }
    setHistory((prevHistory) => [...prevHistory, ...output]);
  };

  const getCurrentPath = () => {
    if (currentPath.join("/") === "home/visitor") {
      return `~`;
    }
    return `/${currentPath.join("/")}`;
  };

  return (
    <div className="bg-[#1e1e2e] text-[#cdd6f4] p-4 h-screen flex flex-col font-mono">
      <div className="flex-grow overflow-y-auto">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line.startsWith("$") ? (
              <span className="text-green-400">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
        <div className="flex">
          <span className="pr-2 text-green-400">{`visitor@arvid`}</span>
          <span className="text-blue-400">{getCurrentPath()}</span>
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
