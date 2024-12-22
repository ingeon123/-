import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyUser = () => {
  const user_id = sessionStorage.getItem('user_id')
  const [userEditState, setUsetEditState] = useState(false)
  // const [userEditId, setUserEditId] = useState()
  const [userEditName, setUserEditName] = useState()
  const [userEditEmail, setUserEditEmail] = useState()
  const [userData, setUseData] = useState('')
  const [pwdState, setPwdState] = useState(false)
  const [newPwd, setNewPwd] = useState()
  const [newConfirmPwd, setNewConfirmPwd] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/myuser?id=${user_id}`);
        const data = await response.json();
        console.log(data.data[0])
        setUseData(data.data[0]);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchUser();
  }, []);

  const editUserData = async () => {
    const editData = {
      id: user_id,
      name: userEditName,
      email: userEditEmail,
    }
    try{
      const response = await fetch('http://localhost:5000/api/edituser',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),})
        if(response.ok){
          alert('회원 수정 성공')
          window.location.reload()
        }
    }catch (error){
      console.log(error)
    }
  }

  const EditPwd = async () => {
    const specialCharsPattern = /[!@#$%^&*()_+\-={}\[\]|:;"'<>,.?/\\`~]/g;
    const numberPattern = /\d/g;
    const englishPattern = /[a-zA-Z]/g;
    const koreanPattern = /[가-힣\u1100-\u115F\u1160-\u11A7]/g;

    const passNum = numberPattern.test(newPwd)
    const passeng = englishPattern.test(newPwd)
    const passspe = specialCharsPattern.test(newPwd)

    if(passNum&&passeng&&passspe&&newPwd.length>5&&newPwd==newConfirmPwd){
      console.log("성공 ")
      const editPwdData = {
        user_id: user_id,
        new_pwd: newPwd
      }
      try {
        const response = await fetch('http://localhost:5000/api/editPwd',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editPwdData),});
          
        if(response.ok){
          alert("비밀번호 변경 성공")
          navigate('../login')
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    }
    else{
      alert('비밀번호를 다시 입력해 주세요')
    }
    // const koreaTest = koreanPattern.test(inputId);
  }

  return (
    <div className="mypage-container">
      <h1>마이페이지</h1>
      {(userEditState==false)?(
        <div className="user-info">
          <p><strong>아이디:</strong> {userData.user_id}</p>
          <button onClick={() => setPwdState(true)}>비밀번호 변경</button>
          {(pwdState==true)?(
            <div>
              <input type='password' value={newPwd} onChange={(e) => setNewPwd(e.target.value)} placeholder='새 비밀번호 입력'/>
              <input type='password' value={newConfirmPwd} onChange={(e) => setNewConfirmPwd(e.target.value)} placeholder='비밀번호 재확인'/>
              <button onClick={EditPwd}>변경</button>
              <button onClick={() => setPwdState(false)}>취소</button>
            </div>
          ):null}
          <p><strong>이름:</strong> {userData.name}</p>
          <p><strong>이메일:</strong> {userData.email}</p>
          <button onClick={() => {
            setUsetEditState(true)
            // setUserEditId(userData.user_id)
            setUserEditName(userData.name)
            setUserEditEmail(userData.email)
            }}>수정</button>
        </div>
      ):(
        <div className="user-info">
          {/* <input type='text' value={userEditId} onChange={(e) => setUserEditId(e.target.value)}/><br/> */}
          <input type='text' value={userEditName} onChange={(e) => setUserEditName(e.target.value)}/><br/>
          <input type='text' value={userEditEmail} onChange={(e) => setUserEditEmail(e.target.value)}/><br/>
          <button onClick={editUserData}>수정</button>
          <button onClick={() => {setUsetEditState(false)}}>취소</button>
        </div>
      )}
    </div>
  );
};

export default MyUser;