import React from 'react';
import styled from 'styled-components';
import { menuItems } from '../../utils/menuItems';
import { Button } from 'antd';
import { plus2, check } from '../../utils/icons';

function Navigation({ active, setActive }) {
  return (
    <NavStyled>
      <div className="nav" role="tablist">
        <div className="nav__menu">
          <ul className="menu-items">
            {menuItems.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={active === item.id ? 'active' : ''}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Button
        type="primary"
        shape="circle"
        icon={active === 5 ? check : plus2}
        className={active === 5 ? 'btn-active btn-income' : 'btn-income'}
        onClick={active === 5 ? () => setActive(4) : () => setActive(5)}
      />
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  box-shadow: 0px 2px 5px grey;
  width: 200px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .nav {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
  }
  .menu-items {
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      width: 100%;
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }
  .nav .active {
    color: #126fec !important;
    i {
      color: #126fec !important;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #126fec;
      border-radius: 0 10px 10px 0;
    }
  }
  .btn-income {
    display: none;
  }

  @media screen and (max-width: 750px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    width: 100%;
    z-index: 3;
    padding: 0;
    background: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    justify-content: space-around;
    .nav {
      padding: 0px;
    }
    .nav__menu {
      width: 100%;
    }
    .user-con {
      display: none;
    }
    .menu-items {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin: 0;
      li {
        width: 100%;
        display: flex;
        padding-left: 0rem;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        i {
          color: rgba(34, 34, 96, 0.6);
          font-size: 2rem;
          transition: all 0.4s ease-in-out;
        }
      }
    }

    .menu-items i {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .active {
      color: #126fec !important;
      i {
        color: #126fec !important;
      }
      &::before {
        display: none;
      }
    }

    ul li span {
      display: none;
    }
    .btn-income {
      display: block;
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      i {
        font-size: 30px;
      }
    }
  }
`;

export default Navigation;
