import {  Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



import { useState } from 'react';

import { useNavigate } from 'react-router-dom';


export default function CreatePost() {

    const [formData, setFormData] = useState({});

  
    const navigate = useNavigate();
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-2xl my-7 font-semibold text-slate-700'>Yeni Yazı Oluştur</h1>
        <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput
            type='text'
            placeholder='Başlık'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Kategori Seç</option>
            <option value='ss'>Savunma Sanayii</option>
            <option value='tsk'>TSK</option>
            <option value='prj'>Projeler</option>
            <option value='ask'>Askerlik</option>
            <option value='ak'>Askeri Kariyer</option>
            <option value='ah'>Asker Hakları</option>
            <option value='adb'>Askerin Din Bilgisi</option>
          </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-cyan-300 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'        
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline            
          >İmaj Yükle</Button>
          </div>
          <ReactQuill theme='snow' placeholder='Bir şeyler yaz...' className='h-72' mb-12 required/>
          <Button type='submit' gradientDuoTone='cyanToBlue' outline>
          Yayınla
        </Button>
        </form>
    </div>
  )
}
