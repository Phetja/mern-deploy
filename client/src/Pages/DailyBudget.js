import React, { useState, useEffect } from 'react';
import { InnerLayout } from '../styles/Layouts';
import { Button, Col, Input, Row, Space, Modal, Card, Typography } from 'antd';
import { useGlobalContext } from '../context/GlobalContext';
import ExpenseCard from '../components/Card/ExpenseCard';
import { numFormat } from '../utils/numFormat';
import Loading from '../components/Loading/Loading';
import NumberPad from '../components/Numpad/Numpad';

const { Title } = Typography;

function DailyBudget() {
  const { addDailyBudget, getDailyBudget, daily, dataLoaded } =
    useGlobalContext();

  const [inputState, setInputState] = useState({
    dailybudget: '',
    monthlybudget: '',
  });
  const [editMode, setEditMode] = useState(null);
  const [showPad, setShowPad] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    getDailyBudget();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setInputState({
      dailybudget: daily.dailybudget ? daily.dailybudget.toString() : '',
      monthlybudget: daily.monthlybudget ? daily.monthlybudget.toString() : '',
    });
  }, [daily]);

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

  const handleEditClick = (type) => {
    setEditMode(type);
    setShowPad(isMobile);
  };

  const handleAddNumber = (num) => {
    if (editMode) {
      setInputState((prev) => ({
        ...prev,
        [editMode]: prev[editMode] + num,
      }));
    }
  };

  const handleDelete = () => {
    if (editMode) {
      setInputState((prev) => ({
        ...prev,
        [editMode]: prev[editMode].slice(0, -1),
      }));
    }
  };

  const handleSubmit = () => {
    if (!editMode) return;
    const budgetValue = parseFloat(inputState[editMode]);

    if (!budgetValue) {
      Modal.warning({
        title: 'แจ้งเตือน',
        content: `กรุณากรอกค่า ${
          editMode === 'dailybudget' ? 'งบรายวัน' : 'งบรายเดือน'
        }!`,
        okText: 'ตกลง',
      });
      return;
    }

    if (editMode === 'dailybudget' && budgetValue > 5000) {
      Modal.error({
        title: 'แจ้งเตือน',
        content: 'ค่าสูงเกิน 5,000! กรุณากรอกค่าใหม่',
        okText: 'ตกลง',
      });
      return;
    }

    if (editMode === 'monthlybudget' && budgetValue > 20000) {
      Modal.error({
        title: 'แจ้งเตือน',
        content: 'ค่าสูงเกิน 20,000! กรุณากรอกค่าใหม่',
        okText: 'ตกลง',
      });
      return;
    }

    Modal.confirm({
      title: `ยืนยันการกำหนดงบ${
        editMode === 'dailybudget' ? 'รายวัน' : 'รายเดือน'
      }?`,
      content: `คุณต้องการตั้งงบ${
        editMode === 'dailybudget' ? 'รายวัน' : 'รายเดือน'
      }เป็น ${budgetValue} ใช่หรือไม่?`,
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => {
        const updatedBudget = {
          dailybudget:
            editMode === 'dailybudget' ? budgetValue : daily.dailybudget,
          monthlybudget:
            editMode === 'monthlybudget' ? budgetValue : daily.monthlybudget,
        };
        addDailyBudget(updatedBudget);
        setEditMode(null);
        setShowPad(false);
      },
    });
  };

  return (
    <InnerLayout>
      {!dataLoaded ? (
        <Loading />
      ) : (
        <Card
          style={{
            maxWidth: 500,
            margin: 'auto',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <Title level={3}>จัดการงบประมาณ</Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ExpenseCard
                title={'งบประมาณรายวันล่าสุด'}
                amount={numFormat(daily.dailybudget)}
                bgColor="#F7F9FC"
                labelColor={'#4A4A68'}
              />
            </Col>
            <Col span={24}>
              <ExpenseCard
                title={'งบประมาณรายเดือนล่าสุด'}
                amount={numFormat(daily.monthlybudget)}
                bgColor="#F7F9FC"
                labelColor={'#4A4A68'}
              />
            </Col>
          </Row>

          <Space
            direction="vertical"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            <Button
              type="dashed"
              onClick={() => handleEditClick('dailybudget')}
              block
            >
              แก้ไขงบรายวัน
            </Button>
            <Button
              type="dashed"
              onClick={() => handleEditClick('monthlybudget')}
              block
            >
              แก้ไขงบรายเดือน
            </Button>

            {editMode && (
              <>
                <Input
                  placeholder={`Enter ${
                    editMode === 'dailybudget' ? 'daily' : 'monthly'
                  } budget`}
                  onFocus={() => isMobile && setShowPad(true)}
                  inputMode={isMobile ? 'none' : 'numeric'}
                  size="large"
                  value={inputState[editMode]}
                  onChange={(e) =>
                    setInputState({ ...inputState, [editMode]: e.target.value })
                  }
                />
              </>
            )}
          </Space>

          {showPad && isMobile && (
            <NumberPad
              handleAddNumber={handleAddNumber}
              handleDelete={handleDelete}
              setShowPad={setShowPad}
            />
          )}

          {editMode && (
            <Button
              type="primary"
              onClick={handleSubmit}
              size="large"
              block
              style={{ marginTop: '1rem' }}
            >
              ยืนยัน
            </Button>
          )}
        </Card>
      )}
    </InnerLayout>
  );
}

export default DailyBudget;
