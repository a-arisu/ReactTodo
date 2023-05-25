import React from "react";

export const List = ({ todos, deleteTodo }) => {
  return (
    <div>
        <ul>
      {/**受け取ったtodosをmapで回してtodoを取得する */}
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <span>{todo.content} </span>
            {/**押したボタンのIDをdeleteTodoの引数に渡す */}
            <button onClick={() => deleteTodo(todo.id)}>-</button>
            
          </div>
        );
      })}
      </ul>
    </div>
  );
};