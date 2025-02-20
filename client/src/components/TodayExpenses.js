import React, { useContext } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const TodayExpenses = () => {
  const { expenses } = useGlobalContext();
  const [...history] = todayHistory();

  return (
    <div>
      <Row>
        <Col xs={24} md={24}>
          <div className="item">
            <div className="today">Today</div>
            <div className="incomes">
              {history.map((income) => {
                const { _id, title, amount, date, category, type } = income;
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
    </div>
  );
};

export default TodayExpenses;
