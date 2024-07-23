import { FileSystemNode } from "../../utils/file-system";

const ls = (currentDir: FileSystemNode): string[] => {
  if (!currentDir || typeof currentDir !== "object") {
    return ["No such directory"];
  }

  const children = currentDir.children;
  if (!children) {
    return ["No contents"];
  }

  return Object.keys(children).map((key) => {
    const child = children[key];
    if (child && child.type === "directory") {
      return key + "/";
    } else {
      return key;
    }
  });
};

export default ls;
