import Image from "next/image";

type FolderButtonProps = {
    id: number
    label: string
    onButtonClick: (id: number) => void
}

function LeftFileButton({id, label, onButtonClick } : FolderButtonProps) {
    return ( 
        <button className="flex items-center px-4 py-2 rounded-xl hover:bg-gray-500 hover:text-white" onClick={() => onButtonClick(id)}>
           <Image src="/icons/folder.svg" alt="folder icon" width={30} height={30} className="mr-4"/>
            <span className="text-2xl">{label}</span>
        </button>
     );
}

export default LeftFileButton;