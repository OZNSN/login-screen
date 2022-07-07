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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const initialValues = {email: "", password: "" };
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
    if (!values.email) {
      errors.email = "Lütfen mail adresinizi giriniz";
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



  const pwRef = useRef(null)
  const mailRef = useRef(null)   

  function writeConsole() {
    const password = pwRef.current?.value
    const email = mailRef.current?.value
    console.log(`Mail: ${email}\n Password: ${password}`)
  }

  return (
    <BoxContainer>
     
     <Input ref={mailRef} type="text" name="email" placeholder="Email" value={ formValues.email} onChange= {handleChange} />        <p>{formErrors.email}</p>
        <Input ref={pwRef} type="password" name="password" placeholder="Parola" value={ formValues.password} onChange= {handleChange}></Input>
        <p>{formErrors.password}</p>
      
      <MutedLink href="#">Şifrenizi mi unuttunuz?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>Giriş yap</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Henüz bir hesabın yok mu?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Kaydol
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
