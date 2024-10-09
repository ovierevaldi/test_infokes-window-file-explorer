import Image from "next/image";

type Props = {
    name: string
}

function FolderButton({name} : Props) {
    return ( 
        <div className="flex items-center">
           <Image src="/icons/folder.svg" alt="folder icon" width={30} height={30} className="mr-4"/>
            <span className="text-2xl">{name}</span>
        </div>
     );
}

export default FolderButton;