import React, { useContext,useRef,useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
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
  const handleChange = (e) => {
    console.log(e.target); 
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
      <FormContainer>
        <Input ref={mailRef} type="user_mail" placeholder="Email" value={ formValues.email} onChange= {handleChange} />
        <Input ref={pwRef} type="password" name="password" placeholder="Parola" value={ formValues.password} onChange= {handleChange}></Input>
      </FormContainer>
      <MutedLink href="#">Şifrenizi mi unuttunuz?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={writeConsole}>Giriş yap</SubmitButton>
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
