export interface ParsedCommand {
  command: string;
  args: string[];
  flags: Record<string, boolean>;
}

export const parseCommand = (input: string): ParsedCommand => {
  const parts = input.trim().split(/\s+/);
  const command = parts[0] ?? "";
  const args: string[] = [];
  const flags: Record<string, boolean> = {};

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part?.startsWith('-')) {
      flags[part] = true;
    } else if (part) {
      args.push(part);
    }
  }

  return { command, args, flags };
};
