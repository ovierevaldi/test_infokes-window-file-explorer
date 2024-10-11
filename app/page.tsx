"use client"

import Image from "next/image";
import LeftFileButton from "./components/LeftFileButton";
import MainTypeButton from "./components/MainTypeButton";
import { useEffect, useState } from "react";
import { FileDataProps } from "./lib/types";
import NewFileModal from "./util_components/NewFileModal";
import { tree } from "next/dist/build/templates/app-page";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState<FileDataProps[]>([]);
  let [currentFile, setCurrentFile] = useState<FileDataProps>(fileData[0]);

  async function getAllData() {
    const url = 'http://localhost:5000/file';
    const options: RequestInit = {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, options);
      if(!response.ok)
        throw new Error(`Response Status: ${response.status}`)
  
      const data = await response.json();
      setFileData(data);
      // Set the default current file is the Root
      setCurrentFile(getRootFile(data));

    } catch (error : unknown) {
      if(error instanceof Error)
        console.log(error.message)
      else
        console.error("An unknown error occurred");
    } finally{
      setLoading(false);
    }
  };

  useEffect(() =>{
    getAllData();
  },[])

  async function refreshData(){
    await getAllData();
  }

  function getRootFile(data: FileDataProps[]): FileDataProps{
    const rootFile = data.find((element: FileDataProps) => element.root === -1)
    if(rootFile)
      return rootFile
    else
      return({name: '', root: 0, treeID: 0, type: '', childrens: []})
  }

  if(loading){
    return <div>Fetching Data...</div>;
  }


  function handleButtonClick(id: number){
    setCurrentFile(fileData[id])
  }

  function handleFileButtonClick(treeID: number){
    if(fileData[treeID].type === 'folder'){
      setCurrentFile(fileData[treeID])
    }
  }

  return (
   <>
    <main className="grid grid-cols-[0.8fr_4fr]">
      
      <LeftContainer name="List Folders" currentFile={currentFile} onButtonClick={handleButtonClick} fileData={fileData} refreshData={refreshData} rootFile={getRootFile(fileData)}/>
      <RightFolderContainer name={currentFile.name} currentFile={currentFile} onButtonClick={handleFileButtonClick} fileData={fileData}/>
    </main>
   </>
  );
}

type LeftContainerProps = {
  name: string
  currentFile: FileDataProps
  onButtonClick: (id: number) => void;
  fileData: FileDataProps[];
  refreshData: () => void;
  rootFile: FileDataProps;
}

function LeftContainer({name, currentFile, onButtonClick, fileData, refreshData, rootFile}: LeftContainerProps){
  const [modalState, setModalState] = useState(false);
 
  // Set the left folder is based on Root
  const listFolderButton = rootFile.childrens.map((value : number) => 
        <LeftFileButton key={fileData[value].treeID} id={fileData[value].treeID} label={fileData[value].name} onButtonClick={onButtonClick}></LeftFileButton>
  )

  function handleNewFileButton(state: boolean){
    setModalState(state)
  }

  async function handleSubmitForm(name: string, type: string, event: React.FormEvent){
    event.preventDefault();
    
    const newID = fileData.length++;

    await postNewFile({
      treeID: newID,
      name: name,
      type: type.toLowerCase(),
      childrens: [],
      root: currentFile.treeID,
    });

    await updateRootChildren(newID)

    setModalState(false);
    refreshData();
  }

  async function postNewFile(newFileData: FileDataProps){
    const url = 'http://localhost:5000/file';
    const options: RequestInit = {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFileData)
    };
    
    try {
      const response = await fetch(url, options);
      if(!response.ok)
        throw new Error(`Response Status: ${response.status}`)

      alert('Success!')

    } catch (error) {
      if(error instanceof Error)
          console.log(error.message)
        else
          console.error("An unknown error occurred");
    } 
  }

  async function updateRootChildren(childID: number){
    const url = 'http://localhost:5000/file/' + currentFile.treeID;
    const options: RequestInit = {
      method: 'PATCH',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        children: childID
      })
    };
    
    try {
      const response = await fetch(url, options);
      if(!response.ok)
        throw new Error(`Response Status: ${response.status}`)

    } catch (error) {
      if(error instanceof Error)
          console.log(error.message)
        else
          console.error("An unknown error occurred");
    } 
  }

  return(
    <div className="py-4 px-6 border-r min-h-screen">

        <div className="flex items-center py-4 ">
          <Image src={'/icons/folder.svg'} alt="folder icons" width={50} height={50}></Image>
          <span className="px-2"></span>
          <span className="text-4xl">Explorer</span>
        </div>

        <button className="px-8 py-3 my-6 rounded-xl border-2 hover:bg-gray-200 block mx-auto" onClick={()=> handleNewFileButton(true)}>
            <Image src={'/icons/plus.svg'} alt="Plus icon" width={30} height={30} className="inline-block"></Image>
            <span className="px-2">New</span>
        </button>


        <div className="">
          <p className="pb-2">{name}</p>
          {listFolderButton}
        </div>

        {modalState && <NewFileModal closeModal={handleNewFileButton} handleSubmitForm={handleSubmitForm}></NewFileModal>}
    </div>
  )
}


type RightContainerProps = {
  name: string
  fileData: FileDataProps[]
  currentFile: FileDataProps
  onButtonClick: (treeID: number) => void;
}


function RightFolderContainer({ name, onButtonClick, currentFile, fileData } : RightContainerProps) {
    const [search, setSearch] = useState('');

    const listFiles = currentFile.childrens.length ? 
    currentFile.childrens.map((value: number) => {
      return <MainTypeButton key={value} 
            fileData={{treeID: value, name: fileData[value].name, type: fileData[value].type, childrens: fileData[value].childrens, root: fileData[value].root}} 
            onButtonClick={onButtonClick} 
            />
    }) 
    : 
    <div className="text-center text-lg text-gray-700"><p>No files in here</p></div>


    return (
        <div className="py-4 px-6">
          <div className="py-4">
            <p className="font-bold text-2xl py-4 border-b">{name}:</p>
          
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
                    <input type="text" placeholder="Search" className="border px-2 py-2 rounded-lg" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                  </div>
            </div>  */}
            
            <div className="grid grid-cols-4 p-4 gap-x-4">
              {listFiles}
            </div>

          </div>
        </div>
    );
}