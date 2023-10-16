import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/GlobalContext';
import Button from '../Button/Button.js';
import { plus } from '../../utils/icons.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ExpenseForm() {
  const { addExpense, error } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <Row>
        <Col xs={12} md={12}>
          <div className="input-control">
            <input
              type="text"
              value={title}
              name={'title'}
              placeholder="Salary Title"
              onChange={handleInput('title')}
            />
          </div>
        </Col>
        <Col xs={12} md={12}>
          <div className="input-control">
            <input
              value={amount}
              type="text"
              name={'amount'}
              placeholder={'Salary Amount'}
              onChange={handleInput('amount')}
            />
          </div>
        </Col>

        <Col xs={6} md={12}>
          <div className="input-control">
            <DatePicker
              id="date"
              placeholderText="Enter A Date"
              selected={date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                setInputState({ ...inputState, date: date });
              }}
            />
          </div>
        </Col>
        <Col xs={6} md={12}>
          <div className="selects input-control">
            <select
              required
              value={category}
              name="category"
              id="category"
              onChange={handleInput('category')}
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="groceries">อาหาร</option>
              <option value="coffee">กาแฟ</option>
              <option value="travelling">ค่าเดินทาง</option>
              <option value="clothing">เสื้อผ้า</option>
              <option value="mobile">ค่ามือถือ</option>
              <option value="store">7-11</option>
              <option value="health">ค่ายา</option>
              <option value="other">Other</option>
            </select>
          </div>
        </Col>

        <Col xs={12} md={12}>
          <div className="input-control">
            <textarea
              name="description"
              value={description}
              placeholder="Add A Reference"
              id="description"
              cols="30"
              rows="4"
              onChange={handleInput('description')}
            ></textarea>
          </div>
        </Col>
        <Col xs={12} md={12}>
          <div className="submit-btn">
            <Button
              name={'Add Income'}
              icon={plus}
              bPad={'.8rem 1.6rem'}
              bRad={'30px'}
              bg={'var(--color-accent'}
              color={'#fff'}
            />
          </div>
        </Col>
      </Row>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  padding-bottom: 1rem;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control {
    margin-bottom: 1rem;
    input,
    textarea,
    select,
    DatePicker {
      width: 100%;
    }
  }

  .input-control DatePicker {
    margin: 0;
  }

  .selects {
    display: flex;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
export default ExpenseForm;
