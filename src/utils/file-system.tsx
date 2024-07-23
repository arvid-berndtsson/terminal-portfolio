export interface FileSystem {
  [key: string]: {
    type: 'file' | 'directory';
    content?: string;
    children?: FileSystem;
  };
}

const fileSystem: FileSystem = {
  home: {
    type: 'directory',
    children: {
      user: {
        type: 'directory',
        children: {
          documents: {
            type: 'directory',
            children: {
              'file1.txt': {
                type: 'file',
                content: 'This is file1 content.',
              },
              'file2.txt': {
                type: 'file',
                content: 'This is file2 content.',
              },
            },
          },
          projects: {
            type: 'directory',
            children: {
              'project1': {
                type: 'directory',
                children: {
                  'readme.md': {
                    type: 'file',
                    content: 'Project 1 Readme',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default fileSystem;
