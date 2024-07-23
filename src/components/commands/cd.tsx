import fileSystem, { FileSystem } from "../../utils/file-system";

const cd = (
  args: string[],
  currentDir: FileSystem,
  currentPath: string[],
): [string[], FileSystem | null, string[]] => {
  if (args.length === 0) {
    const homeDir = fileSystem[""].children!.home.children!.visitor;
    const homePath = ["home", "visitor"];
    return [[], homeDir, homePath];
  }

  const targetDir = args[0];
  if (targetDir === "..") {
    if (currentPath.length === 0) {
      return [["cd: already at root directory"], fileSystem, []];
    }
    const newPath = currentPath.slice(0, -1);
    let newDir: FileSystem = fileSystem[""];
    newPath.forEach((dir) => {
      newDir = newDir.children![dir];
    });
    return [[], newDir, newPath];
  } else if (
    currentDir.children &&
    currentDir.children[targetDir] &&
    currentDir.children[targetDir].type === "directory"
  ) {
    return [[], currentDir.children[targetDir], [...currentPath, targetDir]];
  } else {
    return [
      [`cd: no such file or directory: ${targetDir}`],
      currentDir,
      currentPath,
    ];
  }
};

export default cd;
