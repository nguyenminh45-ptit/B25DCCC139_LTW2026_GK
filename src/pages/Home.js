import React from 'react';

const Home = ({ tasks }) => {
  const total = tasks.length;
  const doneCount = tasks.reduce((sum, t) => (t.done ? sum + 1 : sum), 0);
  const hoursLeft = tasks.reduce((sum, t) => (t.done ? sum : sum + t.hours), 0);

  return (
    <div>
      <h1>Công việc nhóm</h1>
      <p>{`Tổng số công việc: ${total}`}</p>
      <p>{`Số công việc đã xong: ${doneCount}`}</p>
      <p>{`Tổng số giờ còn lại: ${hoursLeft}`}</p>
    </div>
  );
};

export default Home;
