import React, { useState,useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoList = () => {
  const [todos, setTodos] = useState([]);                 //TODOリスト用
  const [inputValue, setInputValue] = useState('');       //入力フィールド用
  const url = "https://todolist-team1.deno.dev/api/todo";

  //入力フィールドの値が変更されたらinputValueを更新
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //新しいTodo作成とPOST、空だったら作らない
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        name: inputValue,
        state: "open",
      };
      fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTodo)
      });
      
      //既存のTodoリストの要素を展開してそこに新しいTodoを追加
      setTodos([...todos, newTodo]);

      //入力フィールドを空にする
      setInputValue('');
    }
  };

  //Todoの完了状態を切り替える
  const handleToggleComplete = (id) => {
    
    const setUrl = `${url}/${id}`;

    //mapでTodoのIDが切り替え対象かを探す
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {

        let chengeTodo;
        
        if(todo.state==="open"){
          chengeTodo = {state: "done",};
        }else{
          chengeTodo = {state: "open",};
        }
          
        fetch(setUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(chengeTodo)
        });
      }      
      return todo;
    });
    

    //todosの値更新
    setTodos(updatedTodos);
  };

  

  //IDが一致したものをDELETE
  const handleDeleteTodo = (id) => {

    const deleteUrl = `${url}/${id}`;

    fetch(deleteUrl, {method:'DELETE'})
      .then(response => {
        if (response.ok) {
           const filteredTodos = todos.filter((todo) => todo.id !== id);
           setTodos(filteredTodos);
        } 
      })
      .catch(() => alert("error"));
  };


  //GET
  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((res) => setTodos(res))
    .catch(() => alert("error"));
  },[]);

 
  return (
    <div>
      <h1>Todoリスト</h1>
      
      <TextField id="outlined-basic" label="新しいTodo" variant="outlined" value={inputValue} onChange={handleInputChange} />
      <Button variant="contained" onClick={handleAddTodo}>追加</Button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>

            <Checkbox {...label} defaultChecked={todo.state==="open"?false:true} onChange={() => handleToggleComplete(todo.id)}/>

              {todo.name}

              <Button variant="text" onClick={() => handleDeleteTodo(todo.id)}>削除</Button>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
