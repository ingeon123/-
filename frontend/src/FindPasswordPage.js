import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

function FindPassword() {
  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [domainEmail, setDomainEmail] = useState("naver.com")
  const [idCheck, setIdCheck] = useState(false)
  const [passwordChack, setPasswordCheck] = useState(false)
  const [changePass, setChangePass] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordPatternCheck, setPasswordPatternCheck] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const navigator = useNavigate();

// 비밀번호 조건 기능 넣기

  async function userCheck(e) {
    const email = userEmail + "@" + domainEmail
    console.log(email)
    e.preventDefault();
    try {
      const tempData = {
        userId,
        userName,
        email
      };
      const response = await fetch('http://localhost:5000/api/findpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempData),
      });
      const data = await response.json()
      if(data.success==true) setIdCheck(true)
      alert(data.message)
    }
    catch (error) {
      console.error('회원가입 에러:', error);
    }
  }
//   수정
  function passwordCheck(e){
    const specialCharsPattern = /[!@#$%^&*()_+\-={}\[\]|:;"'<>,.?/\\`~]/g;
    const numberPattern = /\d/g;
    const englishPattern = /[a-zA-Z]/g;
    const koreanPattern = /[가-힣\u1100-\u115F\u1160-\u11A7]/g;

    const inputPassword = e.target.value;
    const passNum = numberPattern.test(inputPassword)
    const passeng = englishPattern.test(inputPassword)
    const passspe = specialCharsPattern.test(inputPassword)
    const passkor = koreanPattern.test(inputPassword)

    setChangePass(e.target.value); 
    setIsPasswordValid(e.target.value === confirmPassword);

    if(passNum&&passeng&&passspe&&inputPassword.length>=6){
      setPasswordPatternCheck(true)
    }
    else{
      setPasswordPatternCheck(false)
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    if(isPasswordValid == true && passwordPatternCheck == true){
      try {
        const response = await fetch('http://localhost:5000/api/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({changePass, userId}),
        });
        const data = await response.json()
        if(data.success==true){
            alert(data.message)
            navigator("../login")
        }
      }
      catch (error) {
        console.error('비밀번호 변경 에러:', error);
      }
    }
    else{
      setChangePass("")
      setConfirmPassword("")
      alert("비밀번호를 정확히 입력해주세요")
    }
  }
// 수정
  return (
    <div>
      {idCheck ? (
        <form onSubmit={changePassword}>
          <input type="text" placeholder="새로운 비밀번호 입력" value={changePass} 
          onChange={passwordCheck} required></input>
          <input type="text" placeholder="비밀번호를 다시 입력" value={confirmPassword} 
          onChange={(e) => {setConfirmPassword(e.target.value); setIsPasswordValid(e.target.value === changePass);}} required></input>
          <button type='submit'>변경</button>
        </form>          
      ):(
        <form onSubmit={userCheck}>
          <input type="text" placeholder="아이디 입력" value={userId} onChange={(e) => { setUserId(e.target.value) }} required />
          <br />
          <input type="text" placeholder="이름 입력" value={userName} onChange={(e) => { setUserName(e.target.value) }} required />
          <br />
          <input type='text' placeholder='Email 입력' value={userEmail} onChange={(e) => { setUserEmail(e.target.value); }} required />@
          <select onChange={(e) => { setDomainEmail(e.target.value); }}>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
          </select>
          <br/>
          <button type='submit'>재츌</button>
        </form>
      )}
      <br/>
      <Link to="../login">로그인 하러가기</Link>
    </div>


  )
}

export default FindPassword;