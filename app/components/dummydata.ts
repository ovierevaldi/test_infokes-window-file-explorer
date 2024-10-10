import { FolderDataProps } from "../lib/types"; 

export const dummyData: FolderDataProps[] = [

    {
      id: 0,
      name: 'root',
      children:[
        {
            id: 1,
            name: 'music',
            ext: 'folder'
        },
        {
            id: 2,
            name: 'coding',
            ext: 'folder'
        },
        {
            id: 3,
            name: 'travel',
            ext: 'folder'
        }
      ],
      root: -1,
    },

    {
      id: 1,
      name: 'music',
      children: [
        {
            id: 0,
            name: 'bass chorus',
            ext: 'midi'
        },
        {
            id: 1,
            name: 'bass verse',
            ext: 'midi'
        },
        {
            id: 2,
            name: 'vocal',
            ext: 'folder'
        },
        {
            id: 3,
            name: 'guitar',
            ext: 'folder'
        },
        {
            id: 4,
            name: 'piano',
            ext: 'folder'
        },
      ],
      root: 0,
    },

    {
      id: 2,
      name: 'coding',
      children: 
      [
        {
            id: 0,
            name: 'style',
            ext: 'css'
        },
        {
            id: 1,
            name: 'index',
            ext: 'html'
        },
        {
            id: 2,
            name: 'css',
            ext: 'folder'
        },
        {
            id: 3,
            name: 'angular',
            ext: 'folder'
        },
        {
            id: 4,
            name: 'next.js',
            ext: 'folder'
        },
      ],
      root: 0,
    },
    
    {
      id: 3,
      name: 'travel',
      children: [],
      root: 0,
    },

  ];