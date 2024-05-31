import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
      <Route path ='/' element={<Home/>}/>
      <Route path ='/about' element={<About/>}/>
      <Route path ='/projects' element={<Projects />}/>
      <Route path ='/post/:postSlug' element={<PostPage />}/>
      <Route path ='/signin' element={<SignIn/>}/>
      <Route path ='/signup' element={<SignUp/>}/>
      <Route  element={<PrivateRoute/>}>
      <Route path ='/dashboard' element={<Dashboard/>}/>
      </Route>
      <Route  element={<OnlyAdminPrivateRoute/>}>
      <Route path ='/create-post' element={<CreatePost/>}/>
      <Route path ='/update-post/:postId' element={<UpdatePost/>}/>
      </Route>

    </Routes>
    <Footer/>
    </BrowserRouter>

  )
}

export default App