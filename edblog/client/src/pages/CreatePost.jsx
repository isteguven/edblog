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
              'İmaj Yükle'
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
          <ReactQuill theme='snow' placeholder='Bir şeyler yaz...' className='h-72' mb-12 required/>
          <Button type='submit' gradientDuoTone='cyanToBlue' outline>
          Yayınla
        </Button>
        </form>
    </div>
  )
}
