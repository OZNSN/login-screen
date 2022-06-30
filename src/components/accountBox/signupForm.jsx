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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
       <Input type="name" placeholder="Kullanıcı Adı" />
       <Input type="company_name" placeholder="Şirket Adı" />
       <Input type="user_mail" placeholder="Email" />
       <Input type="password" name="password" placeholder="Parola"></Input>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Kaydol</SubmitButton>
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
