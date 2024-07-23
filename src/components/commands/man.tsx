const man = (args: string[]) => {
  if (args.length === 0) {
    return [`Usage: man <command>`];
  }

  switch (args[0]) {
    case 'help':
      return [`help: Show available commands`];
    case 'projects':
      return [
        `projects: List my projects`,
        `Usage: projects [-o]`,
        `-o: Open the projects page`,
      ];
    case 'resume':
      return [`resume: Go to the resume page`];
    case 'clear':
      return [`clear: Clear the terminal`];
    case 'man':
      return [`man: Show manual for a command`];
    default:
      return [`No manual entry for ${args[0]}`];
  }
};

export default man;
