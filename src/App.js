import React, { createContext, useRef, useState, useContext } from "react";

const TodoListContext = createContext([
  {
    todos: []
  },
  () => {}
]);

const Input = () => {
  const inputRef = useRef(null);
  const [todos, setTodos] = useContext(TodoListContext);

  const addTodo = () => {
    const { current } = inputRef;
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 0,
      description: current.value,
      completed: false
    };
    console.log("todos", todos);
    console.log("newtodo", newTodo);
    setTodos([...todos, newTodo]);
  };
  return (
    <div>
      <input type="text" ref={inputRef}></input>
      <button onClick={addTodo}>Add todo</button>
    </div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useContext(TodoListContext);

  const removeTodo = todoId => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const setComplete = todoId => {
    let index = todos.findIndex(({id}) => id === todoId);
    setTodos(Object.assign([...todos], {[index] : {...todos[index], completed: true} } ));
  };

  return (
    <ul>
      {!todos.length && 'Your todo list is empty'}
      {todos.length > 0 &&
        todos.map(todo => (
          <li key={todo.id}>
            <button onClick={() => removeTodo(todo.id)}>X</button>{" "}
            {todo.description} : {todo.completed ? "Completed" : "To be done"}{" "}
            <button onClick={() => setComplete(todo.id)}>
              Mark as completed
            </button>
          </li>
        ))}
    </ul>
  );
};

const App = () => {
  const [state, setState] = useState({
    todos: []
  });

  return (
    <TodoListContext.Provider
      value={[state.todos, todos => setState({ todos: todos })]}
    >
      <TodoList />
      <Input />
    </TodoListContext.Provider>
  );
};

export default App;
