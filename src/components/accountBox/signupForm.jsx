import React, { useContext,useEffect,useRef,useState } from "react";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const initialValues = { name: "",company_name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Bu alan boş kalamaz";
    }
    if (!values.email) {
      errors.email = "Bu alan boş kalamaz";
    } else if (!regex.test(values.email)) {
      errors.email = "Lütfen geçerli bir mail giriniz";
    }
    if (!values.password) {
      errors.password = "Lütfen şifrenizi girin";
    } else if (values.password.length < 8) {
      errors.password = "Şifre 8 haneden küçük olamaz";
    } 
    return errors;
 };

  const nameRef = useRef(null)
  const cnameRef = useRef(null)
  const pwRef = useRef(null)
  const mailRef = useRef(null)

   /*isim ve email şifre zorunlulukları,obje oluşturup içine tanım,bu bilgilerin jsona aktarımı */

  function writeConsole() {
    const name = nameRef.current?.value
    const company_name = cnameRef.current?.value
    const email = mailRef.current?.value
    const password = pwRef.current?.value
    
    console.log(`Ad: ${name}\n Şirket Adı: ${company_name}\n Mail: ${email}\n Password: ${password}`)
  }

  return (
    <BoxContainer>
       <Input ref={nameRef}type="text" name="name" placeholder="Kullanıcı Adı" value={ formValues.name} onChange= {handleChange} />
       <p>{formErrors.name}</p>
       <Input ref={cnameRef} type="text" name="company_name" placeholder="Şirket Adı" value={ formValues.company_name} onChange= {handleChange} />
       <Input ref={mailRef} type="text" name="email" placeholder="Email" value={ formValues.email} onChange= {handleChange} />
       <p>{formErrors.email}</p>
       <Input ref={pwRef} type="password" name="password" placeholder="Parola"value={ formValues.password} onChange= {handleChange}></Input>
       <p>{formErrors.password}</p>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit"  onClick={handleSubmit} >Kaydol</SubmitButton>
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
