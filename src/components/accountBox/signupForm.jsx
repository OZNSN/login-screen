import React, { useContext,useRef } from "react";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const nameRef = useRef(null)
  const cnameRef = useRef(null)
  const pwRef = useRef(null)
  const mailRef = useRef(null)

  function writeConsole() {
    const name = nameRef.current?.value
    const company_name = cnameRef.current?.value
    const email = mailRef.current?.value
    const password = pwRef.current?.value
    
    console.log(`Ad: ${name}\n Şirket Adı: ${company_name}\n Mail: ${email}\n Password: ${password}`)
  }

  return (
    <BoxContainer>
      <FormContainer>
       <Input ref={nameRef}type="name" placeholder="Kullanıcı Adı" />
       <Input ref={cnameRef} type="company_name" placeholder="Şirket Adı" />
       <Input ref={mailRef} type="user_mail" placeholder="Email" />
       <Input ref={pwRef} type="password" name="password" placeholder="Parola"></Input>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={writeConsole}>Kaydol</SubmitButton>
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
