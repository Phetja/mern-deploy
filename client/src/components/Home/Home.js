import React, { useEffect } from 'react';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import styled from 'styled-components';
import HistoryHomeItem from '../../History/HistoryHomeItem';
import { Col, Row } from 'antd';
import { numFormat } from '../../utils/numFormat';
import logo from '../../img/asa2.png';
import Loading from '../Loading/Loading';

function Home() {
  const {
    loading,
    totalLoad,
    getIncomes,
    getExpense,
    getIncomesToday,
    getExpenseToday,
    todayHistory,
    totalBalance,
    totalExpenseToday,
  } = useGlobalContext();
  const [...history] = todayHistory();
  useEffect(() => {
    getIncomes();
    getExpense();
    totalBalance();
    getIncomesToday();
    getExpenseToday();
  }, []);
  return (
    <InnerLayout>
      {loading ? (
        <Loading />
      ) : (
        <HomeStyled>
          <Row gutter={[8]}>
            <Col xs={24} md={12}>
              <Row>
                <Col xs={24} md={24}>
                  <div className="title">
                    {' '}
                    <h1>My Wallet</h1>
                    <img src={logo} className="asa" />
                  </div>

                  <div className="card">
                    <div className="card-balance">
                      <h2>Total Balance</h2>

                      {totalLoad ? (
                        <div>Test</div>
                      ) : (
                        <h3>
                          {numFormat(totalBalance())} {'บาท'}
                        </h3>
                      )}
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={24}>
                  <div className="card">
                    <div className="card-balance">
                      <h2>Total Today</h2>
                      <h3>
                        {' '}
                        {numFormat(totalExpenseToday())} {'บาท'}
                      </h3>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs={24} md={12}>
              <Row>
                <Col xs={24} md={24}>
                  <div className="item">
                    <div className="today">Today</div>
                    <div className="incomes">
                      {history.map((income) => {
                        const { _id, title, amount, date, category, type } =
                          income;
                        return (
                          <HistoryHomeItem
                            key={_id}
                            id={_id}
                            title={title}
                            amount={amount}
                            date={date}
                            type={type}
                            category={category}
                            indicatorColor="var(--color-green)"
                          />
                        );
                      })}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </HomeStyled>
      )}
    </InnerLayout>
    // <InnerLayout>
    //   <HomeStyled>
    //     <Row gutter={[8]}>
    //       <Col xs={24} md={12}>
    //         <Row>
    //           <Col xs={24} md={24}>
    //             <h1>PHETMAJA</h1>
    //             <div className="card">
    //               <div className="card-balance">
    //                 <h2>คงเหลือ</h2>
    //                 <h3>
    //                   {' '}
    //                   {numFormat(totalBalance())} {'บาท'}
    //                 </h3>
    //               </div>
    //               <div className="card-balance line">
    //                 <h2>ใช้จ่ายวันนี้</h2>
    //                 <h3>
    //                   {' '}
    //                   {numFormat(totalExpenseToday())} {'บาท'}
    //                 </h3>
    //               </div>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Col>
    //       <Col xs={24} md={12}>
    //         <Row>
    //           <Col xs={24} md={24}>
    //             <div className="item">
    //               <div className="today">Today</div>
    //               <div className="incomes">
    //                 {history.map((income) => {
    //                   const { _id, title, amount, date, category, type } =
    //                     income;
    //                   return (
    //                     <HistoryHomeItem
    //                       key={_id}
    //                       id={_id}
    //                       title={title}
    //                       amount={amount}
    //                       date={date}
    //                       type={type}
    //                       category={category}
    //                       indicatorColor="var(--color-green)"
    //                     />
    //                   );
    //                 })}
    //               </div>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Col>
    //     </Row>
    //   </HomeStyled>
    // </InnerLayout>
  );
}
const HomeStyled = styled.nav`
  .title {
    display: flex;
    justify-content: space-between;
  }
  .asa {
    display: none;
    widht: 2rem;
    height: 2rem;
  }
  .card {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 1rem;
    .card-balance {
      width: 100%;
      padding-left: 1rem;
      h3 {
        font-size: 2rem;
      }
    }
    .line {
      border-left: 3px solid #222260;
    }
  }
  .today {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-item: center;
    font-size: 24px;
  }

  @media screen and (max-width: 750px) {
    .title {
      justify-content: space-between;
    }
    .asa {
      display: block;
    }

    .item {
      margin-top: 1rem;
    }
    .card {
      padding: 1rem;
      .card-balance {
        padding-left: 0rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Home;
