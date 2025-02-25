import { useState } from 'react';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import { useGlobalContext } from './context/GlobalContext';

// 🛠 Components
import Navigation from './components/Navigation/Navigation';
import Transfer from './components/Transfer/Transfer';

// 📄 Pages
import HomePage from './Pages/HomePage';
import DailyBudget from './Pages/DailyBudget';
import Report from './Pages/Report';

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  // 🏷️ ใช้ Object Mapping แทน switch-case เพื่อเพิ่มประสิทธิภาพ
  const pages = {
    1: <HomePage />,
    2: <Report />,
    3: <Transfer />,
    4: <DailyBudget />,
  };

  return (
    <AppStyled className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{pages[active] || <HomePage />}</main>
      </MainLayout>
    </AppStyled>
  );
}

// 🎨 Styles
const AppStyled = styled.div`
  height: 100vh;
  background: #fff;
  display: flex; /* เปลี่ยนจาก position: flex เป็น display: flex */

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
