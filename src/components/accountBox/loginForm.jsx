import React, { useContext } from "react";
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

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="user_mail" placeholder="Email" />
        <Input type="password" name="password" placeholder="Parola"></Input>
      </FormContainer>
      <MutedLink href="#">Şifrenizi mi unuttunuz?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Giriş yap</SubmitButton>
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
