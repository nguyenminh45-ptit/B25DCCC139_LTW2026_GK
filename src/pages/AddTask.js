import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIORITIES } from '../data';

const AddTask = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Trung bình');
  const [hours, setHours] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !assignee.trim() || String(hours).trim() === '') {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const hoursNum = Number(hours);
    if (!Number.isInteger(hoursNum) || hoursNum < 1 || hoursNum > 40) {
      setMessage('Số giờ phải từ 1 đến 40');
      return;
    }

    onAdd({ title: title.trim(), assignee: assignee.trim(), priority, hours: hoursNum });
    navigate('/tasks', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Tên công việc</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="assignee">Người làm</label>
        <input id="assignee" type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="priority">Mức ưu tiên</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="hours">Số giờ ước tính</label>
        <input id="hours" type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
      </div>
      <button type="submit">Thêm</button>
      {message && <p className="error-text">{message}</p>}
    </form>
  );
};

export default AddTask;
