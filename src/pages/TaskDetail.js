import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkTimer from '../components/WorkTimer';

const TaskDetail = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div>
        <p>Không tìm thấy công việc</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const { title, assignee, priority, hours, done } = task;
  return (
    <div>
      <p>{`Tên công việc: ${title}`}</p>
      <p>{`Người làm: ${assignee}`}</p>
      <p>{`Mức ưu tiên: ${priority}`}</p>
      <p>{`Số giờ: ${hours}`}</p>
      <p>{`Trạng thái: ${done ? 'Đã xong' : 'Đang làm'}`}</p>
      <WorkTimer key={task.id} />
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default TaskDetail;
