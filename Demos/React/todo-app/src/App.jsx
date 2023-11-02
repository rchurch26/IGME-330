import "./styles.css";
import { useState } from "react";

const App = () => {
  const [newItem, setNewItem] = useState("test");
  const [todos, setTodos] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    // this adds a new todo object to the end of the array
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false
        }
      ]
    });
    setNewItem(""); //clear out input
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            onChange={e => setNewItem(e.target.value)}
            value={newItem}
            type="text"
            id="item" 
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map(todo => {
          return <li key={todo.id}>
          <label>
            <input type="checkbox"  checked={todo.completed}/>
            {todo.title}
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
        })}
      </ul>
    </>
  )
};

export default App;