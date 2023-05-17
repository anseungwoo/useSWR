import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
const DetailPage = () => {
  const { id } = useParams();
  const { data: toDo } = useSWR(
    id ? `${process.env.REACT_APP_BACKEND_URL}/todo/${id}` : null,
    fetcher
  );
  console.log(toDo);

  return (
    <div className="h-full">
      {toDo ? (
        <div className="flex flex-col bg-[rgba(255, 255, 255, 0.9)] p-2.5 justify-center items-center h-screen my-4">
          <div>
            <table className="flex flex-row w-[80vw] m-auto bg-[rgba(255, 255, 255, 0.9)] border-collapse rounded-md">
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
                  <td className="h-10 text-2xl  text-[#005086] text-center m-[0_auto]">
                    {toDo.todos[0].todo}
                  </td>

                  <td className="h-10 text-2xl   text-[#545454] text-center">
                    {toDo.todos[0].userId}
                  </td>
                  {toDo.todos[0].isDone ? (
                    <td className="h-10 text-2xl  text-[#8c8c8c] text-center">
                      다했음
                    </td>
                  ) : (
                    <td className="h-6 text-2xl  mb-10 text-[#8c8c8c] text-center">
                      아직 안함
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-row justify-end w-[80vw] ">
            <Link to="/">
              <button className="p-[10px_20px] mr-5 text-base font-bold text-white bg-[#005086] border-none rounded-md cursor-pointer transition-[all_0.2s_ease-in-out] hover:bg-[#003c5a] focus:outline-none focus:shadow-[#00508666]">
                돌아가기
              </button>
            </Link>
            <Link
              to={`/editPage/${id}`}
              state={{
                title: toDo.todos[0].todo,
                desc: toDo.todos[0].userId,
                isDone: toDo.todos[0].isDone,
              }}
            >
              <button className='p-[10px_20px]  text-base font-bold text-white bg-[#e75ca2] border-none rounded-md cursor-pointer transition-[all_0.2s_ease-in-out] hover:bg-[#ff409f] focus:outline-none focus:shadow-[#ff409f]"'>
                수정하기
              </button>
            </Link>
          </div>
        </div>
      ) : (
        '데이터가없습니다'
      )}
    </div>
  );
};

export default DetailPage;
