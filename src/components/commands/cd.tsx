import fileSystem, { FileSystem, FileSystemNode } from "../../utils/file-system";

const cd = (
  args: string[],
  currentDir: FileSystemNode,
  currentPath: string[]
): [string[], FileSystemNode | null, string[]] => {
  if (args.length === 0) {
    const homeDir = fileSystem[""]?.children?.home?.children?.visitor ?? null;
    if (homeDir) {
      const homePath = ["home", "visitor"];
      return [[], homeDir, homePath];
    }
    return [["cd: home directory not found"], currentDir, currentPath];
  }

  const targetDir = args[0];
  if (targetDir === "..") {
    if (currentPath.length === 0) {
      return [["cd: already at root directory"], fileSystem[""] ?? null, []];
    }
    const newPath = currentPath.slice(0, -1);
    let newDir: FileSystemNode | null = fileSystem[""] ?? null;
    for (const dir of newPath) {
      newDir = newDir?.children?.[dir] ?? null;
      if (newDir === null) break;
    }
    return [[], newDir, newPath];
  } else if (targetDir && currentDir.children) {
    const newDir = currentDir.children[targetDir] ?? null;
    if (newDir && newDir.type === "directory") {
      return [[], newDir, [...currentPath, targetDir]];
    } else {
      return [[`cd: no such file or directory: ${targetDir}`], currentDir, currentPath];
    }
  } else {
    return [[`cd: no such file or directory: ${targetDir}`], currentDir, currentPath];
  }
};

export default cd;
