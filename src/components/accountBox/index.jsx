import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignupForm } from "./signupForm";
import { ProfilePage } from "./profilePage";
import loginImg from "../assets/login.jpg";

const BoxContainer = styled.div`
  min-width: 250px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 275px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 8em;
`;

const BackDrop = styled(motion.div)`
  width: 100%;
  height: 100px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(90deg);
  top: -50px;
  left: -1000px;
  background: rgb(158, 164, 159);
  background: linear-gradient(
    90deg,
    rgba(158, 164, 159, 1) 0%,
    rgba(9, 121, 24, 1) 51%,
    rgba(18, 79, 199, 1) 88%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "500%",
    height: "1050px",
    borderRadius: "100%",
    transform: "rotate(0deg)",
  },
  collapsed: {
    width: "500%",
    height: "300px",
    borderRadius: "100%",
    transform: "rotate(0deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };
  const switchToSuccessLogin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signinsuccess");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin, switchToSuccessLogin };

  return (
    <AccountContext.Provider value={contextValue}>
      <div class="bg-blue-50 relative border-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
          <div className="hidden sm:block">
            <img className="w-full h-full object-cover" src={loginImg} alt="" />
          </div>
          <div class="container mx-auto  max-w-[40%] min-w-200 py-32   ">
            <BoxContainer>
              <TopContainer>
                <BackDrop
                  initial={false}
                  animate={isExpanded ? "expanded" : "collapsed"}
                  variants={backdropVariants}
                  transition={expandingTransition}
                />
                {active === "signin" && (
                  <HeaderContainer>
                    <HeaderText>Hoşgeldiniz</HeaderText>
                    <SmallText>Devam etmek için giriş yapın</SmallText>
                  </HeaderContainer>
                )}
                {active === "signup" && (
                  <HeaderContainer>
                    <HeaderText>Hesap</HeaderText>
                    <HeaderText>Yarat</HeaderText>
                    <SmallText>Devam etmek için kaydolun</SmallText>
                  </HeaderContainer>
                )}
                {active === "signinsuccess" && (
                  <HeaderContainer>
                    <HeaderText>Hoşgeldiniz</HeaderText>
                    <SmallText>Kullanıcı Bilgileri</SmallText>
                  </HeaderContainer>
                )}
              </TopContainer>
              <InnerContainer>
                {active === "signin" && <LoginForm />}
                {active === "signup" && <SignupForm />}
                {active === "signinsuccess" && <ProfilePage />}
              </InnerContainer>
            </BoxContainer>
          </div>
        </div>
      </div>
    </AccountContext.Provider>
  );
}
