import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), title: inputValue, isEditing: false },
      ]);
      setInputValue(""); // Clear the input after adding
    }
  };

  // Edit an existing task
  const editTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  // Save an edited task
  const saveTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, isEditing: false } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">Get Things Done!</h1>
      <div className="add-task">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What is the task for today?"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="tasks">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            {task.isEditing ? (
              <input
                className="edit-input"
                type="text"
                defaultValue={task.title}
                onBlur={(e) => saveTask(task.id, e.target.value)}
                autoFocus
              />
            ) : (
              <p>{task.title}</p>
            )}
            <div className="buttons">
              <FontAwesomeIcon
                className="edit"
                icon={faPenToSquare}
                onClick={() => editTask(task.id)}
              />
              <FontAwesomeIcon
                className="delete"
                icon={faTrashCan}
                onClick={() => deleteTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
