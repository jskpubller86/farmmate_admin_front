import React, { useState } from 'react'
import Style from './board.module.css'
import { Link, useNavigate } from 'react-router-dom'
// import {  } from './BoardDetail';

const BoardForm: React.FC = () => {

const [title, setTitle] = useState('');
const [writer, setWriter] = useState('');
const [content, setContent] = useState('');
const [category, setCategory] = useState('자유');

const navigate = useNavigate();
const boardSubmit = (e:React.FormEvent<HTMLFormElement>) => {
e.preventDefault(); //막는애

if(!title.trim()|| !writer.trim() || !content.trim()){
alert ("비어있는 항목을 확인해주세요");
return;
}
console.log(`새 글 등록 :` , {title, writer, content});
const newBoard = {
id : Date.now(), //초 단위로 알아서 증가시키게하여 식별한다.
title,
writer,
content,
category,
createdAt: new Date().toISOString()
}//기존 스토리지에서 읽어온 뒤 처리해야한다.
const boardList = localStorage.getItem('boardList');
const list = boardList ? JSON.parse(boardList) : [];
list.push(newBoard); //localStorage에 저장해야한다.
localStorage.setItem("boardList",JSON.stringify(list));
alert("저장되었습니다.")
navigate('/board'); //board로 이동한다.

}

return (
<div className={Style.container}>
<h2>글쓰기</h2>
<form onSubmit={boardSubmit}>
<table className={Style.boardTable}>
<tbody>
                <tr>
                  <th>카테고리</th>
                  <td>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: '97%', padding: '8px' }}
                    >
                      <option value="자유">자유</option>
                      <option value="Q&A">Q&A</option>
                      <option value="정보">정보</option>
                      <option value="공지">공지</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>제목</th>
                  <td><input type="text" name="title" id="title"
                  style={{width : '97%', padding:'8px'}}
                  onChange={e => {setTitle(e.target.value)}}/></td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td><input type="text" name="writer" id="writer"
                  style={{width : '97%', padding:'8px'}}
                  onChange={e => {setWriter(e.target.value)}}/></td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td><textarea name="content" id="content"
                  style={{width : '97%', height: '150px', padding:'8px'}}
                  onChange={e => {setContent(e.target.value)}}></textarea></td>
                </tr>
</tbody>
<tfoot>
<tr>
<th colSpan={2}><button type="submit" className={Style.button}>등록하기</button>
<Link to="/board"><button className={Style.button}>취소</button></Link>
</th>
</tr>
</tfoot>
</table>
</form>
</div>
)
}

export default BoardForm