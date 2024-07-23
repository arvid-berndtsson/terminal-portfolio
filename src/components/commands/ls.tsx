import { FileSystem } from "../../utils/file-system";

const ls = (currentDir: FileSystem): string[] => {
  if (!currentDir || typeof currentDir !== "object") {
    return ["No such directory"];
  }

  const children = currentDir.children;
  if (!children) {
    return ["No contents"];
  }

  return Object.keys(children).map((key) => {
    if (children[key].type === "directory") {
      return key + "/";
    } else {
      return key;
    }
  });
};

export default ls;
