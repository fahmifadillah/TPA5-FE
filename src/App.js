import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const filterToDos = () => {
    switch (filter) {
      case "all":
        return toDo;
      case "active":
        return toDo.filter((item) => !item.completed);
      case "completed":
        return toDo.filter((item) => item.completed);
      default:
        return toDo;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>WHAT'S THE PLAN FOR TODAY?</h1>

        <div className="top">
          <input type="text" placeholder="Add ToDos..." value={text} onChange={(e) => setText(e.target.value)} />

          <div className="add" onClick={isUpdating ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="filters">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>
            Active
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>

        <div className="list">
          {filterToDos().map((item) => (
            <ToDo key={item._id} text={item.text} updateMode={() => updateMode(item._id, item.text)} deleteToDo={() => deleteToDo(item._id, setToDo)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
