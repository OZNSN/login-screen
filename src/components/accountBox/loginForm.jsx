import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useProfile } from "./userContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../assets/login.jpg";
export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const { switchToSuccessLogin } = useContext(AccountContext);
  const { profile, changeProfile } = useProfile();

  const initialValues = {
    user_mail: "",
    user_pass: "",
    deviceModel: "Google Pixel 2",
    identifier: "c46f08285ddd7e4386ad01e37e2188257b2eaaa7",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const pwRef = useRef(null);
  const mailRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    axios
      .post("http://18.191.138.182/v1/api/login", formValues)
      .then((response) => {
        if (response.data.msg === "Successfully logged in") {
          toast.success("Giriş Başarılı");

          //farklı bir değişkene response.data ve mail ve pw değerlerini ata
          response.data.email = formValues.user_mail;
          response.data.password = formValues.user_pass;
          changeProfile(response.data);
          setTimeout(() => {
            switchToSuccessLogin();
          }, 1500);
        } else if (response.data.msg === "Password is wrong") {
          toast.error("Hatalı Şifre");
        } else if (response.data.msg === "There is no such user") {
          toast.error("Hatalı Mail");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0) {
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
    } else if (values.user_pass.length < 7) {
      errors.user_pass = "Şifre 8 haneden küçük olamaz";
    }
    return errors;
  };

  return (
    <BoxContainer>
      <ToastContainer />
      <Input
        ref={mailRef}
        type="text"
        name="user_mail"
        placeholder="user_mail"
        value={formValues.user_mail}
        onChange={handleChange}
      />{" "}
      <p>{formErrors.user_mail}</p>
      <Input
        ref={pwRef}
        type="password"
        name="user_pass"
        placeholder="Parola"
        value={formValues.user_pass}
        onChange={handleChange}
      ></Input>
      <p>{formErrors.user_pass}</p>
      <MutedLink href="#">Şifrenizi mi unuttunuz?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        Giriş yap
      </SubmitButton>
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
