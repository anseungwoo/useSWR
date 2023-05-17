import axios from 'axios';
import { useState } from 'react';

const LogIn = ({ setUser }) => {
  const [createUser, setCreateUser] = useState('');
  const [acountUser, setAcountUser] = useState('');
  const onSubmitCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          account: createUser,
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.error(error);

      alert('데이터를 불러오지 못했습니다.');
    }
  };
  const onSubmitAcountUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${acountUser}`
      );
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      alert('데이터를 불러오지 못했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form className="flex mt-2 my-16" onSubmit={onSubmitCreateUser}>
        <input
          className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
          type="text"
          value={createUser}
          onChange={(e) => setCreateUser(e.target.value)}
        />
        <input
          className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50 w-24"
          type="submit"
          value="계정 생성"
        />
      </form>
      <form className="flex mt-2 my-16" onSubmit={onSubmitAcountUser}>
        <input
          className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
          type="text"
          value={acountUser}
          onChange={(e) => setAcountUser(e.target.value)}
        />
        <input
          className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50 w-24"
          type="submit"
          value="로그인"
        />
      </form>
    </div>
  );
};

export default LogIn;
