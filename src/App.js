const BUILD_TAG = "zr-5093";
/* eslint-disable import/first */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mounting: đọc localStorage hoặc gọi API; Unmounting: hủy request
  useEffect(() => {
    const controller = new AbortController();
    const saved = localStorage.getItem('gk_tasks');
    let usedSaved = false;

    if (saved) {
      try {
        setTasks(JSON.parse(saved));
        setLoading(false);
        usedSaved = true;
      } catch (e) {
        usedSaved = false;
      }
    }

    if (!usedSaved) {
      axios
        .get('/data/tasks.json', { signal: controller.signal })
        .then((res) => {
          setTasks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          setError('Không tải được dữ liệu');
          setLoading(false);
        });
    }

    return () => controller.abort();
  }, []);

  // Updating: lưu dữ liệu sau khi đã tải xong
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading, error]);

  const addTask = ({ title, assignee, priority, hours }) => {
    const newId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    const newTask = { id: newId, title, assignee, priority, hours, done: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="app" data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home tasks={tasks} />} />
          <Route
            path="tasks"
            element={<TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />}
          />
          <Route path="tasks/new" element={<AddTask onAdd={addTask} />} />
          <Route path="tasks/:id" element={<TaskDetail tasks={tasks} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
