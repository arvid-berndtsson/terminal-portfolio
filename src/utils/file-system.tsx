export interface FileSystemNode {
  type: "file" | "directory";
  content?: string;
  children?: FileSystem;
}

export type FileSystem = Record<string, FileSystemNode>;

const fileSystem: FileSystem = {
  "": {
    type: "directory",
    children: {
      home: {
        type: "directory",
        children: {
          visitor: {
            type: "directory",
            children: {
              documents: {
                type: "directory",
                children: {
                  "file1.txt": {
                    type: "file",
                    content: "This is file1 content.",
                  },
                  "file2.txt": {
                    type: "file",
                    content: "This is file2 content.",
                  },
                },
              },
              projects: {
                type: "directory",
                children: {
                  project1: {
                    type: "directory",
                    children: {
                      "readme.md": {
                        type: "file",
                        content: "Project 1 Readme",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      bin: {
        type: "directory",
        children: {
          bash: { type: "file", content: "Binary file for bash" },
          ls: { type: "file", content: "Binary file for ls" },
        },
      },
      etc: {
        type: "directory",
        children: {
          passwd: { type: "file", content: "User account information" },
          hosts: { type: "file", content: "Static table lookup for hostnames" },
        },
      },
      tmp: {
        type: "directory",
        children: {},
      },
      var: {
        type: "directory",
        children: {
          log: {
            type: "directory",
            children: {
              syslog: { type: "file", content: "System log file" },
            },
          },
        },
      },
      usr: {
        type: "directory",
        children: {
          bin: {
            type: "directory",
            children: {
              python: { type: "file", content: "Python interpreter" },
            },
          },
        },
      },
    },
  },
};

export default fileSystem;
