import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('Tất cả');

  const handleQueryShift = (e) => setQuery(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);

  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.trim().toLowerCase()) &&
      (priority === 'Tất cả' || t.priority === priority)
  );

  return (
    <div>
      <FilterBar
        query={query}
        priority={priority}
        onQueryChange={handleQueryShift}
        onPriorityChange={handlePriorityChange}
      />
      <p>{`Tìm thấy ${filtered.length} công việc`}</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <TaskTable tasks={filtered} onDelete={onDelete} onToggle={onToggle} />
      )}
    </div>
  );
};

export default TaskList;
