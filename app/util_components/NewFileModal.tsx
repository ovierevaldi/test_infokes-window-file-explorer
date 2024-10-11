import Image from "next/image";
import { useState } from "react";

type NewFileModalProp = {
    closeModal: (value: boolean)=> void;
    handleSubmitForm: (name: string, type: 'FILE' | 'FOLDER' , e: React.FormEvent) => void;
  }

export default function NewFileModal({ closeModal, handleSubmitForm }: NewFileModalProp){
    const [name, setName] = useState(''); 
    const [type, setType] = useState<'FILE' | 'FOLDER'>('FILE');

    function handleChangeName(e : React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }

    function handleChangeType(event : React.ChangeEvent<HTMLSelectElement>){
        setType(event.target.value as 'FILE' | 'FOLDER')
    }

    return(
        <div className=" bg-black w-full min-h-screen bg-opacity-20 absolute content-center top-0 left-0">
            <div className="w-[400px] bg-white border rounded-xl p-6 border-gray-500 mx-auto">
                <div className="text-end">
                    <button onClick={()=>{closeModal(false)}}><Image src={'/icons/close.svg'} alt={'close icon'} width={25} height={25}/></button>
                </div>
                <p className="text-xl text-center">Add New File</p>
                <form className='p-5' onSubmit={(e) => handleSubmitForm(name, type, e)}>
                    <div className='grid grid-cols-[70px_1fr] gap-y-4 gap-x-2'>
                        <label className=''>
                            Name:
                        </label>
                        <input
                            className='border p-2'
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChangeName}
                            required
                            />
                        <label className=''>
                            Type:
                        </label>
                        <select className="border p-2" value={type} onChange={handleChangeType}>
                            <option value={'FILE'}>File</option>
                            <option value={'FOLDER'}>Folder</option>
                        </select>
                    </div>
        
                    <br></br>
                    <div className='text-center'>
                        <button className='border-2 px-8 py-2 rounded-md hover:bg-gray-600 hover:text-white hover:border-white transition ease-in delay-[25]' type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}