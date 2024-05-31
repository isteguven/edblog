import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Güncel savunma projelerini öğrenmek ve takip etmek ister misiniz?
            </h2>
            <p className='text-gray-500 my-2'>
                Savunma projeleri hakkında buradan geniş bilgi edinebilirsiniz...
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.cyzyazilim.com" target='_blank' rel='noopener noreferrer'>
                    Güncel Savunma Projeleri
                </a>
            </Button>
        </div>
        <div className=" p-7 flex-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0x2ahu4X-iTzffu8iyJW-pp7RAuSDFXEHlw&s" />
        </div>
    </div>
  )
}