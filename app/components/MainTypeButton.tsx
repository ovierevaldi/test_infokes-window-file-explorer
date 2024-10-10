import Image from "next/image";
import { FileDataProps } from "../lib/types";

type MainTypeButtonProps = {
    fileData: FileDataProps;
    onButtonClick: (id: FileDataProps) => void
}

function MainTypeButton({fileData, onButtonClick} : MainTypeButtonProps) {
    return (
    <button className="p-12 hover:bg-black hover:text-white rounded-2xl  max-w-[250px]" onClick={() => onButtonClick(fileData)}>
        <Image src={fileData.ext === 'folder' ? '/icons/folder.svg' : '/icons/document.svg'} alt='' width={75} height={75} className="mx-auto"></Image>
        <p className="text-center">{fileData.name}</p>
    </button >
    );
}

export default MainTypeButton;