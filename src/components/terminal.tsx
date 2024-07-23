"use client";

import { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCommand, ParsedCommand } from "../utils/command-parser";
import fileSystem, { FileSystem } from "../utils/file-system";
import help from "./commands/help";
import projects from "./commands/projects";
import resume from "./commands/resume";
import clear from "./commands/clear";
import man from "./commands/man";
import ls from "./commands/ls";
import cd from "./commands/cd";

const Terminal = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState<string>("");
  const [currentDir, setCurrentDir] = useState<FileSystem>(
    fileSystem[""].children!.home.children!.visitor,
  );
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
      "",
    ]);
  }, []);

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [command, history]);

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
      case "cat":
        output = cat(args, currentDir);
        break;
      case "echo":
        output = echo(args, currentDir);
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
    <div className="flex h-screen flex-col bg-[#1e1e2e] p-4 font-mono text-[#cdd6f4]">
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
            className="flex-grow bg-transparent pl-2 text-[#cdd6f4] outline-none"
            type="text"
            value={command}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCommand(e.target.value)
            }
            onKeyPress={handleCommand}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
