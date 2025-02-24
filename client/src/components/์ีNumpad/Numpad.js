import React, { useState } from 'react';
import { Row, Col, Button, Input, Space } from 'antd';
import styled from 'styled-components';
const NumberPad = ({ handleAddNumber, handleDelete, setShowPad }) => {
  return (
    <NumpadStyled>
      <div className="number-pad-overlay">
        <div className="number-pad">
          <Row gutter={[10, 10]}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Col span={8} key={num}>
                <Button
                  className="number-pad-btn"
                  onMouseDown={(e) => {
                    handleAddNumber(num);
                    e.preventDefault();
                  }}
                >
                  {num}
                </Button>
              </Col>
            ))}
            {/* ปุ่มลบ */}
            <Col span={8}>
              <Button
                className="number-pad-btn delete"
                onMouseDown={handleDelete}
              >
                ลบ
              </Button>
            </Col>

            {/* ปุ่ม 0 ตรงกลาง */}
            <Col span={8}>
              <Button
                className="number-pad-btn"
                onMouseDown={(e) => {
                  handleAddNumber(0);
                  e.preventDefault();
                }}
              >
                0
              </Button>
            </Col>

            {/* ปุ่มตกลง */}
            <Col span={8}>
              <Button
                className="number-pad-btn confirm"
                onMouseDown={() => setShowPad(false)}
              >
                ตกลง
              </Button>
            </Col>
          </Row>
          <Button className="close-pad-btn" onClick={() => setShowPad(false)}>
            ปิด
          </Button>
        </div>
      </div>
    </NumpadStyled>
  );
};
const NumpadStyled = styled.nav`
  .number-pad-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 15px;
    z-index: 1000;
    transition: transform 0.3s ease-out;
  }

  .number-pad {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ปรับแต่งปุ่ม */
  .number-pad-btn {
    width: 100%;
    height: 50px;
    font-size: 18px;
    background: white;
    border: 1px solid #ccc;
    transition: 0.2s;
  }

  .number-pad-btn:hover {
    background: #e6e6e6;
  }

  /* ปุ่มลบ */
  .number-pad-btn.delete {
    background: #ff4d4f;
    color: white;
    border: none;
  }

  /* ปุ่มตกลง */
  .number-pad-btn.confirm {
    background: #1890ff;
    color: white;
    border: none;
  }

  /* ปุ่มปิด Numpad */
  .close-pad-btn {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background: #333;
    color: white;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
`;
export default NumberPad;
