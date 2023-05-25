import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Input = ({ createTodo }) => {
  // inputに入力された値のstateを管理
  const [value, setValue] = useState("");

  const addTodo = () => {
    // 未入力の場合、alertを表示させる
    if (value === "") {
      alert("Todoが入力されていません。");
      return;
    }
    // 新しいtodoオブジェクトを生成
    const newTodo = {
      id: uuidv4(),
      content: value
    };
    // createTodoの引数にnewTodoを渡す
    createTodo(newTodo);
    // inputの中身を空にする
    setValue("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ここに入力"
        value={value}
        // 入力された値をvalueに反映する
        onChange={(e) => setValue(e.target.value)}
      />
      <Input createTodo={createTodo} />
      <button onClick={addTodo}>追加</button>
    </div>
  );
};

export default Input