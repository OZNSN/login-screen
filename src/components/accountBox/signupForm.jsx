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
      <Marginer direction="vertical" margin={0} />
       <Input type="name" placeholder="Kullanıcı Adı" />
       <Marginer direction="vertical" margin="0.5em" />
       <Marginer direction="vertical" margin={5} />
       <Input type="company_name" placeholder="Şirket Adı" />
       <Marginer direction="vertical" margin="0.5em" />
       <Marginer direction="vertical" margin={5} />
       <Input type="user_mail" placeholder="Email" />
       <Marginer direction="vertical" margin="0.5em" />
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
