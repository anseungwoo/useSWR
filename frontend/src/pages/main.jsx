import axios from 'axios';
import TodoCard from '../components/TodoCard';
import { useState } from 'react';
import useSWR from 'swr';
import CreateTodo from '../components/CreateTodo';
import LogIn from '../components/LogIn';

function Main() {
  const [user, setUser] = useState();

  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data.todos;
  };

  const {
    data: toDoList,
    error,
    mutate,
  } = useSWR(
    user
      ? `${process.env.REACT_APP_BACKEND_URL}/todo/user/${user.id}?skip=${0}`
      : null,
    fetcher
  );

  const onClickReload = async () => {
    try {
      await mutate(async (toDoList) => {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/todo/user/${user.id}?skip=0`
        );
        return [...response.data.todos, ...toDoList];
      }, false);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setUser(undefined);
  };

  if (!user) {
    return <LogIn setUser={setUser} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold flex items-center">
        {user.account}님 환영합니다~ 😎
        <button
          className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50 text-base"
          onClick={onClickLogOut}
        >
          로그아웃
        </button>
      </h1>

      <div>
        <div className="mt-8 text-sm font-semibold">
          If I only had an hour to chop down a tree, I would spend the first 45
          minutes sharpening my axe, Abrabam Lincoln
        </div>
        <div className="text-xs">
          나무 베는데 한 시간이 주어진다면, 도끼를 가는데 45분을 쓰겠다,
          에비브러햄 링컨
        </div>
        <CreateTodo getToDoList={mutate} toDoList={toDoList} userId={user.id} />
      </div>
      <div className="mt-16">
        <button
          className="ml-4 px-4 py-2 w-24 h-24 bg-pink-200 hover:bg-pink-400 rounded-full text-gray-50 text-2xl"
          onClick={onClickReload}
        >
          갱 신
        </button>
      </div>
      <div className="mt-16 flex flex-col w-1/2">
        {toDoList &&
          toDoList.map((v) => {
            return (
              <TodoCard
                key={v.id}
                isDone={v.isDone}
                toDoList={toDoList}
                setToDoList={mutate}
                title={v.todo}
                index={v.id}
                userId={user.id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Main;
