import { Link } from "react-router-dom";
import login from "../assets/login.png";
import { Badge, Button, Label, TextInput } from "flowbite-react";
const SignUp = () => {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Kullanıcı adı" />
              <TextInput
                type="text"
                placeholder="kullanıcı adınız..."
                id="username"
              />
            </div>
            <div>
              <Label value="E-posta adresi" />
              <TextInput
                type="text"
                placeholder="isim@firma.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Şifre" />
              <TextInput type="text" placeholder="şifreniz..." id="password" />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' outline>
              Kayıt Ol
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
          <span>Hesabınız var mı? </span>
          <Link to='/signin' className="text-blue-500">Giriş</Link></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
