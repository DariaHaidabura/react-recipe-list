import React, { useState, useEffect } from "react";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");
  const [searchText, setSearchText] = useState("");

  const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleInputChange = (e) => setTaskText(e.target.value);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskText, completed: false, priority: "Low" },
      ]);
      setTaskText("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditClick = (id, text) => {
    setEditMode(id);
    setEditedText(text);
  };

  const handleSaveClick = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editedText } : task
      )
    );
    setEditMode(null);
    setEditedText("");
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase())
    );

  const sortedTasks = filteredTasks.sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePriorityChange = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, priority: getNextPriority(task.priority) }
          : task
      )
    );
  };

  const getNextPriority = (currentPriority) => {
    if (currentPriority === "Low") {
      return "Medium";
    } else if (currentPriority === "Medium") {
      return "High";
    } else if (currentPriority === "High") {
      return "Low";
    } else {
      return "Low";
    }
  };

  return (
    <div className={`task-list-container ${theme}`}>
      <h1 className="task-list-header">Task Manager</h1>
      <div className="task-input-container">
        <input
          className="task-input"
          type="text"
          placeholder="Enter new task"
          value={taskText}
          onChange={handleInputChange}
        />
        <button className="add-task-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="filter-container">
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
          ></input>
        </div>

        <button className="button-toggle-theme" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>

      <div className="task-items-container">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""} ${
              editMode === task.id ? "editing" : ""
            }`}
          >
            {editMode === task.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <span
                className={`task-text ${task.completed ? "completed" : ""}`}
              >
                {task.text}
              </span>
            )}
            <div className="task-actions">
              <button
                className={`priority-btn ${task.priority.toLowerCase()}`}
                onClick={() => handlePriorityChange(task.id)}
              >
                {task.priority}
              </button>
              {editMode === task.id ? (
                <button
                  className="save-btn"
                  onClick={() => handleSaveClick(task.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(task.id, task.text)}
                >
                  Edit
                </button>
              )}
              <button
                className="complete-btn"
                onClick={() => handleComplete(task.id)}
              >
                Complete
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="task-status">
        <span>
          Remaining: {tasks.filter((t) => !t.completed).length} | Completed:{" "}
          {tasks.filter((t) => t.completed).length}
        </span>
      </div>
    </div>
  );
}

export default TaskList;
