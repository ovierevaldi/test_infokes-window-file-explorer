"use client"

import Image from "next/image";
import FolderButton from "./components/FolderButton";
import MainTypeButton from "./components/MainTypeButton";
import { useState } from "react";
import { FileDataProps, FolderDataProps } from "./lib/types";
import { dummyData } from "./components/dummydata";

const folderData : FolderDataProps[] = dummyData;

export default function Home() {
  let [currentFolder, setCurrentFolder] = useState<FolderDataProps>(folderData[0]);


  function handleButtonClick(id: number){
    setCurrentFolder(folderData[id])
  }

  function handleFileButtonClick(fileData: FileDataProps){
    if(fileData.ext === 'folder'){
      setCurrentFolder(folderData[fileData.id])
    }
  }

  return (
   <>
    <main className="grid grid-cols-[1fr_4fr]">
      <LeftContainer name="List Folders" foldersData={folderData} onButtonClick={handleButtonClick}/>
      <RightFolderContainer name={currentFolder.name} fileDatas={currentFolder.children || []} onButtonClick={handleFileButtonClick}/>
    </main>
   </>
  );
}

type LeftContainerProps = {
  name: string
  foldersData: FolderDataProps[]
  onButtonClick: (id: number) => void;
}

function LeftContainer({name, foldersData, onButtonClick}: LeftContainerProps){
  const listFolderButton = foldersData.map((value : FolderDataProps) => 
          <FolderButton key={value.id} id={value.id} label={value.name} onButtonClick={onButtonClick}></FolderButton>
  )
  return(
    <div className="py-4 px-6">
        <div className="flex items-center py-4">
          <Image src={'/icons/folder.svg'} alt="folder icons" width={50} height={50}></Image>
          <span className="px-2"></span>
          <span className="text-4xl">Explorer</span>
        </div>

        <div>
          <p className="pb-2">{name}</p>
          {listFolderButton}
        </div>
    </div>
  )
}


type RightContainerProps = {
  name: string
  fileDatas: FileDataProps[]
  onButtonClick: (id: FileDataProps) => void;
}


function RightFolderContainer({ name, onButtonClick, fileDatas } : RightContainerProps) {
    const listFiles = fileDatas.length ? 
    fileDatas.map((value) => {
      return <MainTypeButton key={value.id} fileData={{id: value.id, name: value.name, ext: value.ext}} onButtonClick={onButtonClick} />
    }) : 
    <div className="text-center text-lg text-gray-700"><p>No files in here</p></div>

    return (
        <div className="py-4 px-6">
          <div className="py-4">
            <p className="font-bold text-2xl py-4">{name}</p>
          
            {/* <div className="flex gap-x-4 pt-2 pb-4 px-2 border-b-2">
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
            </div>  */}
            
            {listFiles}

          </div>
        </div>
    );
}