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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
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
        <Input ref={mailRef} type="user_mail" placeholder="Email" />
        <Input ref={pwRef} type="password" name="password" placeholder="Parola"></Input>
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
