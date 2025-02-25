import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = () => {
  return (
    <div style={styles.container}>
      <Spin size="large" />
      <p style={styles.text}>Loading, please wait...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // เต็มหน้าจอ
    backgroundColor: '#f0f2f5', // สีพื้นหลังอ่อนๆ
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
};

export default LoadingScreen;
