import { Button, TextInput } from 'flowbite-react';
import {useSelector} from 'react-redux';
export default function DashProfile() {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-2xl' >Profil Bilgileri</h1>
        <form  className='flex flex-col gap-4' >
            <div className='w-32 h-32 self-center cursor-pointer shadow-lg 
            overflow-hidden rounded-full'>
            <img src={currentUser.profilePicture} alt="kullanıcı foto"
className='rounded-full w-full h-full border-8 object-cover border-[lightgray]' />
            </div>
            <TextInput type='text' id='username' placeholder='kullanıcı adı...'
            defaultValue={currentUser.username}></TextInput>
            <TextInput type='email' id='email' placeholder='e-posta adresi...'
            defaultValue={currentUser.email}></TextInput>
            <TextInput type='password' id='password' placeholder='şifre...'
            defaultValue='**********'></TextInput>
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Profil Bilgilerimi Güncelle
            </Button>
        </form>
<div className='flex justify-between mt-5 bg-white'>
<span className='cursor-pointer text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white '>Hesabı Sil</span>
<span className='cursor-pointer text-yellow-500 border-2 border-yellow-300 rounded-lg hover:bg-yellow-500 hover:text-white'>Çıkış</span>
</div>

    </div>
  )
}
