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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const initialValues = {name: "", company_name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }


  const nameRef = useRef(null)
  const cnameRef = useRef(null)
  const pwRef = useRef(null)
  const mailRef = useRef(null)

   /*isim ve email şifre zorunlulukları,obje oluşturup içine tanım,bu bilgilerin jsona aktarımı */

  function writeConsole() {
    const name = nameRef.current?.value
    const company_name = cnameRef.current?.value
    const email = mailRef.current?.value
    const password = pwRef.current?.value
    
    console.log(`Ad: ${name}\n Şirket Adı: ${company_name}\n Mail: ${email}\n Password: ${password}`)
  }

  return (
    <BoxContainer>
      <pre>{ JSON.stringify(formValues, undefined, 2)}</pre>
      <FormContainer>
       <Input ref={nameRef}type="text" name="name" placeholder="Kullanıcı Adı" value={ formValues.name} onChange= {handleChange} />
       <Input ref={cnameRef} type="text" name="company_name" placeholder="Şirket Adı" value={ formValues.company_name} onChange= {handleChange} />
       <Input ref={mailRef} type="text" name="email" placeholder="Email" value={ formValues.email} onChange= {handleChange} />
       <Input ref={pwRef} type="password" name="password" placeholder="Parola"value={ formValues.password} onChange= {handleChange}></Input>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onSubmit={handleSubmit} onClick={writeConsole}>Kaydol</SubmitButton>
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
