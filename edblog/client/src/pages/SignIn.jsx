import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { Alert, Badge, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";

export default function  SignIn () {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
   setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return dispatch(signInFailure('Lütfen tüm alanları eksiksiz doldurunuz!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="  font-semibold dark:text-white">
            <img className=" sm:w-[450px]" src={login} alt="" />
          </Link>
          <p className=" text-sm mt-5  w-max inline">
            {" "}
            <Badge color="info">
              Bu bir demo projedir. Eposta adresiniz ve şifrenizle veya google
              hesabınızla giriş yapabilirsiniz...
            </Badge>
          </p>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}
          className="flex flex-col gap-4">
           
            <div>
              <Label value="E-posta adresi" />
              <TextInput
                type="email"
                placeholder="isim@firma.com"
                id="email"  onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Şifre" />
              <TextInput type="password" placeholder="******" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' outline disabled={loading}>
              { 
              loading ?  (
                <>
                <Spinner size='sm'/>
                <span className="pl-3">Yükleniyor...</span>
                </>
              ) : 'Giriş' 
            }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
          <span>Hesabınız yok mu? </span>
          <Link to='/signup' className="text-blue-500">Kayıt</Link></div>
        </div>
        {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
      </div>
    </div>
  );
}


