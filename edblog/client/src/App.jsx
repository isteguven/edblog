import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ='/' element={<Home/>}/>
      <Route path ='/about' element={<About/>}/>
      <Route path ='/projects' element={<Projects />}/>
      <Route path ='/signin' element={<SignIn/>}/>
      <Route path ='/signup' element={<SignUp/>}/>
      <Route path ='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App