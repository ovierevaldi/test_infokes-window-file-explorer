import Image from "next/image";

export default function Home() {
  type FolderData = {
    id: number, // unique, automatic
    name: string,
    children?: ChildData
    root: number,
  }

  type ChildData = {
    folders?: string[],
    files?: FileData[]
  }

  type FileData = {
    name: string,
    ext: string
  }

  const datas: FolderData[] = [
    {
      id: 0,
      name: 'root',
      children: 
        {
          folders: ['music', 'coding', 'travel'],
          files: []
        },
      root: 0,
    },

    {
      id: 1,
      name: 'music',
      children: 
        {
          folders: ['music', 'coding', 'travel'],
          files: []
        },
      root: 0,
    },

    {
      id: 2,
      name: 'coding',
      children: 
        {
          folders: ['angular', 'react', 'css'],
          files: [
            {name: 'index', ext: 'html'},
            {name: 'style', ext: 'css'}
          ]
        },
      root: 0,
    },
    
    {
      id: 3,
      name: 'travel',
      children: {},
      root: 0,
    },
    
  ];

  return (
   <>
    <ul>
      {datas.map((folderData: FolderData) => (<li key={folderData.name}>{folderData.name}</li>))}
    </ul>
   </>
  );
}
