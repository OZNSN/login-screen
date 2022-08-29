import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const initialValues = {
    user_mail: "",
    user_pass: "",
    identifier: "88888888",
    name: "",
    company_name: "",
    deviceModel: "web",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  /*const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    axios
      .post("http://18.191.138.182/v1/api/signup", formValues)
      .then((response) => {
        if (response.data === "True") {
          toast.success("Kayıt Başarılı, gelen maili kontrol ediniz");
          //giriş ekranına geçmeden bekle mesaj timeout olana kadar
          setTimeout(() => {
            switchToSignin();
          }, 1500);
        } else if (response.data === "alreadyhaveusername") {
          toast.error("Bu kullanıcı adı kullanılıyor");
        } else if (response.data === "alreadyhavemail") {
          toast.error("Bu mail adresi zaten var");
        } else if (response.name === "AxiosError") {
          toast.error("Bağlantı Hatası");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log(formValues);
    }
  }, [formErrors, formValues]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Lütfen bir kullanıcı adı girin";
    }
    if (!values.user_mail) {
      errors.user_mail = "Lütfen mail adresinizi giriniz";
    } else if (!regex.test(values.user_mail)) {
      errors.user_mail = "Lütfen geçerli bir mail adresi giriniz";
    }
    if (!values.user_pass) {
      errors.user_pass = "Lütfen şifrenizi girin";
    } else if (values.user_pass.length < 8) {
      errors.user_pass = "Şifre 8 haneden küçük olamaz";
    }
    return errors;
  };

  const nameRef = useRef(null);
  const cnameRef = useRef(null);
  const pwRef = useRef(null);
  const mailRef = useRef(null);

  /*isim ve user_mail şifre zorunlulukları,obje oluşturup içine tanım,bu bilgilerin jsona aktarımı */

  /*function writeConsole() {
    const name = nameRef.current?.value
    const company_name = cnameRef.current?.value
    const user_mail = mailRef.current?.value
    const user_pass = pwRef.current?.value
    
    console.log(`Ad: ${name}\n Şirket Adı: ${company_name}\n Mail: ${user_mail}\n Parola: ${user_pass}`)
  }*/

  return (
    <BoxContainer>
      <ToastContainer />
      <Input
        ref={nameRef}
        type="text"
        name="name"
        placeholder="Kullanıcı Adı"
        value={formValues.name}
        onChange={handleChange}
      />
      <p>{formErrors.name}</p>
      <Input
        ref={cnameRef}
        type="text"
        name="company_name"
        placeholder="Şirket Adı"
        value={formValues.company_name}
        onChange={handleChange}
      />
      <Input
        ref={mailRef}
        type="text"
        name="user_mail"
        placeholder="user_mail"
        value={formValues.user_mail}
        onChange={handleChange}
      />
      <p>{formErrors.user_mail}</p>
      <Input
        ref={pwRef}
        type="password"
        name="user_pass"
        placeholder="Parola"
        value={formValues.user_pass}
        onChange={handleChange}
      ></Input>
      <p>{formErrors.user_pass}</p>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmit}>
        Kaydol
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Zaten bir hesabın var mı?
        <BoldLink href="#" onClick={switchToSignin}>
          Giriş yap
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
