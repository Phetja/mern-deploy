import React, { useState, useEffect } from 'react';
import { InnerLayout } from '../styles/Layouts';
import { Button, Col, Input, Row, Space, Modal } from 'antd';
import { useGlobalContext } from '../context/GlobalContext';
import NumberPad from '../components/Numpad/Numpad';
import ExpenseCard from '../components/Card/ExpenseCard';
import { numFormat } from '../utils/numFormat';
import Loading from '../components/Loading/Loading';

function DailyBudget() {
  const { addDailyBudget, getDailyBudget, daily, insertStatus, dataLoaded } =
    useGlobalContext();

  // State สำหรับค่าที่จะส่งไปยัง MongoDB
  const [inputState, setInputState] = useState({
    dailybudget: '',
    monthlybudget: '',
  });

  // State สำหรับแสดง/ซ่อนแป้นตัวเลข
  const [showPad, setShowPad] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // ใช้ useEffect โหลดค่าปัจจุบันจาก DB
  useEffect(() => {
    getDailyBudget();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPad &&
        !event.target.closest('.number-pad, .number-pad-btn, input')
      ) {
        setShowPad(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPad]);
  // อัปเดตค่าของ inputState
  const handleAddNumber = (num) => {
    setInputState((prev) => ({
      ...prev,
      dailybudget: prev.dailybudget + num,
    }));
  };

  // ลบตัวเลขทีละตัว
  const handleDelete = () => {
    setInputState((prev) => ({
      ...prev,
      dailybudget: prev.dailybudget.slice(0, -1),
    }));
  };

  // ส่งข้อมูลเมื่อกดปุ่มและ Modal
  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetValue = parseFloat(inputState.dailybudget);

    if (!budgetValue) {
      Modal.warning({
        title: 'แจ้งเตือน',
        content: 'กรุณากรอกค่า Daily Budget!',
        okText: 'ตกลง',
      });
      return;
    }

    if (budgetValue > 5000) {
      Modal.error({
        title: 'แจ้งเตือน',
        content: 'ค่าที่ใส่สูงเกิน 5,000! กรุณากรอกใหม่',
        okText: 'ตกลง',
      });
      return;
    }

    // ถ้าค่าถูกต้อง ให้เปิด Modal Confirm
    Modal.confirm({
      title: 'ยืนยันการกำหนดงบ?',
      content: `คุณต้องการเพิ่มงบต่อวันเป็น ${budgetValue} ใช่หรือไม่?`,
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => {
        addDailyBudget(inputState);
        setInputState({ dailybudget: '', monthlybudget: '' });
      },
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // อนุญาตเฉพาะตัวเลข
    if (/^\d*$/.test(value)) {
      setInputState({ dailybudget: value });
    }
  };

  return (
    <InnerLayout>
      {' '}
      {!dataLoaded ? (
        <Loading />
      ) : (
        <div>
          <Row gutter={[8]}>
            <Col xs={24} md={12} style={{ marginBottom: '1rem' }}>
              <div>
                <ExpenseCard
                  title={'งบประมาณที่ตั้งไว้ล่าสุด'}
                  amount={
                    isNaN(daily.dailybudget)
                      ? 'Loading...'
                      : numFormat(daily.dailybudget)
                  }
                  percentage={''}
                  bgColor="#F7F9FC" // พื้นหลังสีขาว
                  labelColor={'#4A4A68'}
                />
                <ExpenseCard
                  title={'งบประมาณที่ตั้งไว้ล่าสุด'}
                  amount={
                    isNaN(daily.dailybudget)
                      ? 'Loading...'
                      : numFormat(daily.monthlybudget)
                  }
                  percentage={''}
                  bgColor="#F7F9FC" // พื้นหลังสีขาว
                  labelColor={'#4A4A68'}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={24} md={12} style={{ marginBottom: '1rem' }}>
              <form onSubmit={handleSubmit}>
                <Space direction="vertical" style={{ display: 'flex' }}>
                  {/* Input */}
                  <Input
                    onFocus={() => isMobile && setShowPad(true)}
                    onChange={handleChange} // ให้พิมพ์ตัวเลขได้
                    placeholder="Enter daily budget"
                    size="large"
                    value={inputState.dailybudget}
                    inputMode={isMobile ? 'none' : 'numeric'} // ปิดคีย์บอร์ดมือถือเมื่อใช้ Numpad
                  />

                  <Input
                    placeholder="Enter daily budget"
                    size="large"
                    value={inputState.monthlybudget}
                  />

                  {/* แสดงแป้นตัวเลข */}
                  {showPad && isMobile && (
                    <NumberPad
                      handleAddNumber={handleAddNumber}
                      handleDelete={handleDelete}
                      setShowPad={setShowPad}
                    />
                  )}
                  {insertStatus ? (
                    <Button type="primary" htmlType="submit" size="large" block>
                      Confirm Budget
                    </Button>
                  ) : (
                    <Button type="primary" size="large" loading block>
                      Loading
                    </Button>
                  )}
                </Space>
              </form>
            </Col>
          </Row>
        </div>
      )}
    </InnerLayout>
  );
}

export default DailyBudget;
