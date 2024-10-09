import Image from "next/image";


function MainTypeButton() {
    return (
    <button className="p-12 hover:bg-black hover:text-white rounded-2xl  max-w-[250px]">
        <Image src={'/icons/folder.svg'} alt='' width={75} height={75} className="mx-auto"></Image>
        <p className="text-center">Users</p>
    </button >
    );
}

export default MainTypeButton;