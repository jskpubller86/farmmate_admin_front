import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import style from './board.module.css';

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('boardList');
    if (data) {
      const list = JSON.parse(data);
      const item = list.find((item: any) => item.id === Number(id));
      setDetails(item);
    }
  }, [id]); // id가 바뀌면 다시 실행됨

  const delBoard = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const oriBoardList = JSON.parse(localStorage.getItem('boardList') || '[]');
      const newBoardList = oriBoardList.filter((item: any) => item.id !== Number(id));
      localStorage.setItem('boardList', JSON.stringify(newBoardList));
      alert('삭제되었습니다.');
      navigate('/board');
    }
  };

  return (
    <div className={style.container}>
      <h2>게시글 상세내용</h2>
      <table className={style.boardTable}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>{details?.title}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{details?.writer}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{details?.content}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center' }}>
              <button className={style.button} onClick={delBoard}>
                삭제
              </button>
              <Link to="/board">
                <button className={style.button}>목록</button>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BoardDetail;