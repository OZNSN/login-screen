import React, { useContext } from "react";
import { BoxContainer, SubmitButton } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useProfile } from "./userContext";
export function ProfilePage(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { profile, changeProfile } = useProfile();
  //show user credientials on profile page
  return (
    <BoxContainer>
      <label> Ad Soyad: {profile.name}</label>
      <label> Şirket: {profile.company_name}</label>
      <label> Email: {profile.email}</label>
      <label> Password: {profile.password}</label>

      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={switchToSignin}>
        Çıkış Yap
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
    </BoxContainer>
  );
}
