import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { ProfileProvider } from "./components/accountBox/userContext";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <ProfileProvider>
      <AppContainer>
        <AccountBox />
      </AppContainer>
    </ProfileProvider>
  );
}

export default App;
