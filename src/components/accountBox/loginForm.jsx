
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
import axios from 'axios';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const initialValues = {user_mail: "", user_pass: "", deviceModel:"web",
  identifier:"88888888" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const pwRef = useRef(null)
  const mailRef = useRef(null)   

  /*function writeConsole() {
    const user_pass = pwRef.current?.value
    const user_mail = mailRef.current?.value
    console.log(`Mail: ${user_mail}\n user_pass: ${user_pass}`)
  }*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    axios
			.post('http://rotaportal-test.teknokurgu.com.tr/v1/api/login', initialValues)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})

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
    if (!values.user_mail) {
      errors.user_mail = "Lütfen mail adresinizi giriniz";
    } else if (!regex.test(values.user_mail)) {
      errors.user_mail = "Lütfen geçerli bir mail giriniz";
    }
    if (!values.user_pass) {
      errors.user_pass = "Lütfen şifrenizi girin";
    } else if (values.user_pass.length < 8) {
      errors.user_pass = "Şifre 8 haneden küçük olamaz";
    } 
    return errors;
 };


  return (
    <BoxContainer>
     
     <Input ref={mailRef} type="text" name="user_mail" placeholder="user_mail" value={ formValues.user_mail} onChange= {handleChange} /> <p>{formErrors.user_mail}</p>
        <Input ref={pwRef} type="password" name="user_pass" placeholder="Parola" value={ formValues.user_pass} onChange= {handleChange}></Input>
        <p>{formErrors.user_pass}</p>
      
      <MutedLink href="#">Şifrenizi mi unuttunuz?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit} >Giriş yap</SubmitButton>
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
