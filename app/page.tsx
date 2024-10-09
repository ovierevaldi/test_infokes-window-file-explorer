import Image from "next/image";
import FolderButton from "./components/FolderButton";
import MainTypeButton from "./components/MainTypeButton";

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

type PropFolderContainer = {
  title: string
  datas: FolderData[]
}

type FolderContainerData = {
  data: PropFolderContainer[];
}


export default function Home() {
  const datas: FolderData[] = [
    {
      id: 0,
      name: 'root',
      children: 
        {
          folders: ['music', 'coding', 'travel'],
          files: []
        },
      root: -1,
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
    <main className="grid grid-cols-[1fr_4fr]">
      <LeftContainer data={[
        // {title: 'Favourites', datas: []}, 
        {title: 'List Folders', datas: datas}
      ]}/>
      
      <div className="py-4 px-6">
        <div className="py-4">
          <p className="font-bold text-2xl py-4">Music</p>
          <div className="flex gap-x-4 pt-2 pb-4 px-2 border-b-2">
              <button>
                <Image src="icons/chevron.svg" alt="chevron icon" height={25} width={25} className="rotate-180"></Image>
              </button>

              <button>
                <Image src="icons/chevron.svg" alt="chevron icon" height={25} width={25}></Image>
              </button>

              <button>
                <Image src="icons/arrow.svg" alt="arrow icon" height={25} width={25}></Image>
              </button>
              
              <div className="flex gap-x-4 items-center grow">
                    <button className="text-xl">Music</button>  
                    <Image src="icons/chevron.svg" alt="chevron icon" height={25} width={25}></Image>
                    <button className="text-xl">Guitar</button>  
                </div>
                
                <div>
                  <Image src="icons/search.svg" alt="search icon" height={25} width={25} className="inline-block mr-4"></Image>
                  <input type="text" placeholder="Search" className="border px-2 py-2 rounded-lg"/>
                </div>
          </div>

           <div className="grid grid-cols-4 gap-y-8">
            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />

            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />

            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />

            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />

            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />
            <MainTypeButton />
           </div>

        </div>
      </div>

    </main>
   </>
  );
}

function FolderContainer({title, datas}: PropFolderContainer){
  const listFolder =  datas.map((folderData) => {
    if(folderData.root >= 0){
      return <li key={folderData.id} className="px-4 py-2 hover:bg-[#4A4142] rounded-xl">
              <FolderButton name={folderData.name}/>
            </li>
    }
  })
  return(
    <div>
      <p className="pb-2">{title}</p>
      <ul className="">
          { listFolder }
      </ul>
    </div>
  )
}

function LeftContainer({ data }: FolderContainerData){
  return(
    <div className="py-4 px-6">
        <div className="flex items-center py-4">
          <Image src={'/icons/folder.svg'} alt="folder icons" width={50} height={50}></Image>
          <span className="px-2"></span>
          <span className="text-4xl">Explorer</span>
        </div>

        {
          data.map((values: PropFolderContainer) => {
            return(
              <FolderContainer title={values.title} datas={values.datas}/>
            )
          })
        }

    </div>
  )
}


