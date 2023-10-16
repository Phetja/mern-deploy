import React from 'react';
import { InnerLayout } from '../../styles/Layouts';
import SelectDate from './SelectDate';
import Chart from '../Chart/Chart';
import { Col, Row, Space } from 'antd';

function Test() {
  return (
    <InnerLayout>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}
      >
        <Row>
          <Col xs={12} md={12}>
            <SelectDate />
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={8}>
            <Chart />
          </Col>
        </Row>
      </Space>
    </InnerLayout>
  );
}

export default Test;
