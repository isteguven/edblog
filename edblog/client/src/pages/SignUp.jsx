import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { Alert, Badge, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
export default function  SignUp () {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
   setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Lütfen tüm alanları eksiksiz doldurunuz!');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
              <Label value="Kullanıcı adı" />
              <TextInput
                type="text"
                placeholder="kullanıcı adınız..."
                id="username"   onChange={handleChange}
              />
            </div>
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
              <TextInput type="password" placeholder="şifreniz..." id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' outline disabled={loading}>
              { 
              loading ?  (
                <>
                <Spinner size='sm'/>
                <span className="pl-3">Yükleniyor...</span>
                </>
              ) : 'Kayıt Ol' 
            }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
          <span>Hesabınız var mı? </span>
          <Link to='/signin' className="text-blue-500">Giriş</Link></div>
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


