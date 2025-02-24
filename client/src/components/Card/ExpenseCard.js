import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: ${(props) =>
    props.bgColor || '#f5f5f5'}; /* กำหนดสีพื้นหลัง */
  color: ${(props) => props.labelColor || '#222260'};
  display: flex;
  align-items: center;
  padding: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${(props) =>
    props.progressColor || '#ff4d6d'}; /* กำหนดสี Progress */
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

const Title = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const Amount = styled.span`
  font-size: 28px;
  font-weight: bold;
`;

const Percentage = styled.span`
  font-size: 14px;
  margin-top: 6px;
`;

const ExpenseCard = ({
  title,
  amount,
  percentage,
  bgColor,
  labelColor,
  progressColor,
}) => {
  return (
    <CardContainer bgColor={bgColor} labelColor={labelColor}>
      {/* Progress Background */}
      <ProgressBar
        progressColor={progressColor}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Card Content */}
      <Content>
        <Title>{title}</Title>
        <Amount>{amount} บาท</Amount>
        {percentage !== undefined &&
          percentage !== null &&
          percentage !== '' && <Percentage>{percentage}%</Percentage>}
      </Content>
    </CardContainer>
  );
};
export default ExpenseCard;
