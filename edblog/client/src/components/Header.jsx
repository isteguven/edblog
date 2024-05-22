import { Button, Navbar, TextInput } from "flowbite-react"
import { Link,useLocation } from "react-router-dom"
import logo from '../assets/logo.png'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
export default function Header()  {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
<Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-3xl font-semibold dark:text-white'
      >
  <img className='w-28 sm:w-28' src={logo} alt="" />
</Link>
<form action="">
    <TextInput
    type="text"
    placeholder="Arama Yap..."
    rightIcon={AiOutlineSearch}
    className="hidden lg:inline"
    ></TextInput>
</form>
<Button className="w-12 h-10 lg:hidden" color='gray' pill><AiOutlineSearch/></Button>
<div className="flex gap-2 md:order-2 ">
<Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
    <FaMoon/>
</Button>
<Link to='/signin'>
    <Button  gradientDuoTone='purpleToBlue' outline>Giriş</Button>
</Link>
<Navbar.Toggle/> 
</div>
<Navbar.Collapse>
    <Navbar.Link active={path==="/"} as={'div'}>
        <Link to='/'>
            Ana Sayfa
        </Link>
    </Navbar.Link>
    <Navbar.Link active={path==="/about"} as={'div'}>
        <Link to='/about'>
        Hakkında
        </Link>
    </Navbar.Link>
    <Navbar.Link active={path==="/projects"} as={'div'}>
        <Link to='/projects'>
            Projeler
        </Link>
    </Navbar.Link>
</Navbar.Collapse>
    </Navbar>
  )
}

