import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const EditPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const editTodo = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${id}`,
        {
          todo: title,
          isDone: false,
        }
      );

      if (response.status !== 200) {
        alert('데이터를 불러오지 못했습니다.');
        return;
      }

      document.location.href = `/detailPage/${id}`;
      alert('데이터를 변경했습니다.');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setTitle(location.state.title);
    setDesc(location.state.desc);
  }, []);

  return (
    <div className="h-full">
      <form
        onSubmit={editTodo}
        className="flex flex-col bg-[rgba(255, 255, 255, 0.9)] p-2.5 justify-center items-center h-screen my-4"
      >
        <div>
          <table className="flex flex-row w-[80vw] m-auto bg-[rgba(255, 255, 255, 0.9)] border-collapse rounded-md pb-5">
            <thead className=" w-[20vw] ">
              <tr className="flex flex-col">
                <th className="h-10 text-2xl  text-[#c1c7cc] text-center ">
                  할일 목록
                </th>
                <th className="h-10 text-2xl text-[#005086] text-center ">
                  Title
                </th>
                <th className="h-10 text-2xl  text-[#005086] text-center ">
                  Description
                </th>
                <th className="h-10 text-2xl  text-[#005086] text-center ">
                  IsDone
                </th>
              </tr>
            </thead>
            <tbody className=" w-[80vw]">
              <tr className="flex flex-col w-[100%]">
                <td className="h-10 text-2xl  text-[#005086] text-center m-[0_auto] font-bold">
                  상태/목적
                </td>
                <td className="h-10 text-2xl  text-[#005086] text-center ">
                  <input
                    className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg w-full"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>

                <td className="h-10 text-2xl   text-[#545454] text-center">
                  <input
                    className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg w-full"
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </td>

                <td className="h-10 text-2xl  text-[#8c8c8c] text-center">
                  수정시 안함 상태로 변경
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-end w-[80vw] ">
          <Link to={`/detailPage/${id}`}>
            <button className="p-[10px_20px] mr-5 text-base font-bold text-white bg-[#005086] border-none rounded-md cursor-pointer transition-[all_0.2s_ease-in-out] hover:bg-[#003c5a] focus:outline-none focus:shadow-[#00508666]">
              돌아가기
            </button>
          </Link>
          <input
            type="submit"
            value="수정 완료 하기"
            className='p-[10px_20px]  text-base font-bold text-white bg-[#e75ca2] border-none rounded-md cursor-pointer transition-[all_0.2s_ease-in-out] hover:bg-[#ff409f] focus:outline-none focus:shadow-[#ff409f]"'
          ></input>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
