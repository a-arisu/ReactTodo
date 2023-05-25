import React from "react";

export const Item = ({ todo, deleteTodo }) => {
  return (
    <div>
      <div key={todo.id}>
        <span>{todo.content} </span>
        {/**押したボタンのIDをdeleteTodoの引数に渡す */}
        <button onClick={() => deleteTodo(todo.id)}>-</button>
      </div>
    </div>
  );
};