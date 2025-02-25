import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Navigation from './components/Navigation/Navigation';
import { useState } from 'react';
import { useGlobalContext } from './context/GlobalContext';
import Analysis from './components/Analysis/Analysis';
import Transfer from './components/Transfer/Transfer';
import HomePage from './Pages/HomePage';
import DailyBudget from './Pages/DailyBudget';
import Report from './Pages/Report';
function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        // return <Home />;
        return <HomePage />;
      case 2:
        // return <Analysis />;
        return <Report />;
      case 3:
        return <Transfer />;
      case 4:
        return <DailyBudget />;

      case 5:
        return <Transfer />;
      default:
        return <HomePage />;
    }
  };
  return (
    <AppStyled className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}
const AppStyled = styled.div`
  height: 100vh;
  background: #fff;
  position: flex;
  main {
    flex: 1;
    background: #f7f7f8;
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  @media screen and (max-width: 750px) {
    main {
      border: none;
      border-radius: 0px;
      padding: 0;
    }
  }
`;
export default App;
