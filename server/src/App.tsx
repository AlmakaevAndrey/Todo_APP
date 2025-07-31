import React from "react"
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useToggleTodoMutation,
} from "./features/api/apiSlice";
import { useState } from "react";
import "./main.css";

function App() {
  const { data: todos, error, isLoading } = useGetTodosQuery(undefined, {refetchOnMountOrArgChange: true});
  const [addTodo] = useAddTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleAdd = async () => {
    if (newTodo.trim() !== "") {
      await addTodo({ title: newTodo, completed: false });
      setNewTodo("");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div className="divider">
    <div>
      <h1>RTK query TODO</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleAdd}>Add</button>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
              />
              {todo.title}
              <button className="deleteButton"  onClick={() => deleteTodo(todo.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default App;
