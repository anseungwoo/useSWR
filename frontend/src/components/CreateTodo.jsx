import axios from 'axios';
import { useState } from 'react';

const CreateTodo = ({ getToDoList, toDoList, userId }) => {
  // SWR 훅을 이용해 Todo 리스트를 가져옵니다.

  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // title이 빈 문자열일 때, 경고창을 띄웁니다.
    if (!title) {
      alert('타이틀을 입력해주세요!');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo/`,
        {
          todo: title,
          userId,
        }
      );

      if (response.status !== 200) {
        alert('데이터를 불러오지 못했습니다.');
        return;
      }
      console.log(response.data.todo);

      getToDoList([response.data.todo, ...toDoList], false); //response.data.todo
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex mt-2" onSubmit={handleSubmit}>
      <input
        className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50"
        type="submit"
        value="새 투두 생성"
      />
    </form>
  );
};

export default CreateTodo;
