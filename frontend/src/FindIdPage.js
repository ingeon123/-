import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FindId() {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userId,setUserId] = useState("")
  const [domainEmail, setDomainEmail] = useState("naver.com")

  async function sub(e){
    const email = userEmail+"@"+domainEmail
    console.log(email)
    e.preventDefault();
    try {
      const tempData = {
        userName,
        email};
      const response = await fetch('http://localhost:5000/api/findid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempData),
      });
      const data = await response.json()
      if(data.data){
        setUserId(data.data)
      }
      else{
        console.log("id가 없는 경우")
        setUserId("이름 또는 이메일을 다시 입력해 주세여")
      }
      alert(data.message)
      }
      catch (error) {
        console.error('회원가입 에러:', error);
      }
  }

  return (
    <div>
      <form onSubmit={sub}>
        <input type="text" placeholder="이름 입력" value={userName} onChange={(e) => {setUserName(e.target.value)}} required/>
        <br/>
        <input type='text' placeholder='Email 입력' value={userEmail} onChange={(e) => {setUserEmail(e.target.value);}} required/>@
          <select onChange={(e) => {setDomainEmail(e.target.value);}}>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
          </select>
          <br/>
          <button type='submit'>재츌</button>
      </form>
      <br/>
      <p>{userId}</p>
      <Link to="../login">로그인 하러가기</Link>
      <br/>
      <Link to="../findpassword">비밀번호 찾기</Link>
    </div>
  )
}
export default FindId;