import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Lütfen bir imaj seçin!');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('İmaj yükleme başarısız!');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('İmaj yükleme işlemi başarısız oldu!');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Bir şeyler ters gitti!');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-2xl my-7 font-semibold text-slate-700'>Yeni Yazı Oluştur</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
            <option value='Savunma Sanayii'>Savunma Sanayii</option>
            <option value='TSK'>TSK</option>
            <option value='Projeler'>Projeler</option>
            <option value='Askerlik'>Askerlik</option>
            <option value='Askeri Kariyer'>Askeri Kariyer</option>
            <option value='Asker Hakları'>Asker Hakları</option>
            <option value='Askerin Din Bilgisi'>Askerin Din Bilgisi</option>
          </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-cyan-300 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'   
            onChange={(e)=>setFile(e.target.files[0])}     
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline   
            onClick={handleUpdloadImage}        
             disabled={imageUploadProgress}
          >
           {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Görsel Yükle'
            )}           
          
          </Button>
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-96 object-cover'
          />
        )}
          <ReactQuill theme='snow' placeholder='Bir şeyler yaz...' className='h-72' mb-12 required
          onChange={
            (value)=>{
              setFormData({...formData, content:value})
            }
          } />
          <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Yayınla
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}
