import axios from 'axios';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TodoCard = ({ isDone, title, index, userId, toDoList, setToDoList }) => {
  const [todoIsDone, setTodoIsDone] = useState(isDone);
  const onClickDone = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3010/todo/${index}/done/`
      );

      if (response.status !== 200) {
        alert('데이터를 불러오지 못했습니다.');
        return;
      }
      setTodoIsDone(response.data.todo.isDone);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${index}`,
        {
          headers: { 'Content-Type': 'application/json' },
          data: { userId },
        }
      );
      const array = toDoList.filter((v, i) => {
        return response.data.todo.id !== v.id;
      });
      setToDoList(array);
    } catch (error) {
      console.error(error);

      alert('데이터를 불러오지 못했습니다.');
    }
  };

  return (
    <>
      <div className="flex my-4">
        {todoIsDone ? (
          <button className="relative" onClick={onClickDone}>
            <div className="border-4 border-pink-400 w-8 h-8 rounded-xl bg-pink-400 p-2"></div>
            <div className="absolute border-4 border-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 scale-75 rounded-xl bg-pink-400 p-2"></div>
          </button>
        ) : (
          <button
            className="border-4 border-pink-400 w-8 h-8 rounded-xl"
            onClick={onClickDone}
          ></button>
        )}
        <Link to={`/detailPage/${index}`}>
          {todoIsDone ? (
            <div className="text-2xl ml-4 line-through">{title}</div>
          ) : (
            <div className="text-2xl ml-4">{title}</div>
          )}
        </Link>
        <button className="ml-4 hover:text-pink-400" onClick={onClickDelete}>
          <FiTrash2 size={24} />
        </button>
      </div>
    </>
  );
};

export default TodoCard;
