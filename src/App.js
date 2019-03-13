import React, { useState } from 'react';
import './App.css';
import TreeTransfer from './TreeTransfer';

const App = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const dataSource = [
    {
      name: '分类1',
      children: [{ id: 1, name: '用例1' }, { id: 2, name: '用例2' }],
    },
    {
      name: '分类2',
      children: [{ id: 3, name: '用例3' }, { id: 4, name: '用例4' }],
    },
  ];

  return (
    <div className="App">
      <TreeTransfer dataSource={dataSource} onChange={keys => setSelectedKeys(keys)} selectedKeys={selectedKeys} />
    </div>
  );
};

export default App;
