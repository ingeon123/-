import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function SignUpPage() {
    const [userName, setUserName] = useState("");
    const [nameCheck, setNameCheck] = useState(false);
    const [userId, setUserId] = useState('');
    // ID특수문자 검사
    const [idPatternCheck, setIdPatternCheck] = useState(false);
    // ID중복검사
    const [isUserIdValid, setIsUserIdValid] = useState(false);
    const [password, setPassword] = useState('');
    // password 더블체크
    const [confirmPassword, setConfirmPassword] = useState('');
    // password 조건 검사
    const [passwordPatternCheck, setPasswordPatternCheck] = useState(false)
    // ID중복 검사 및 password 더블체크
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const [domainEmail, setDomainEmail] = useState('naver.com')
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectCategory, setSelectCategory] = useState([])

    const navigator = useNavigate();
  
    const specialCharsPattern = /[!@#$%^&*()_+\-={}\[\]|:;"'<>,.?/\\`~]/g;
    const numberPattern = /\d/g;
    const englishPattern = /[a-zA-Z]/g;
    const koreanPattern = /[가-힣\u1100-\u115F\u1160-\u11A7]/g;
    const checkboxs = [
      { id: 1, label: '기술', value: '기술' },
      { id: 2, label: '경영', value: '경영' },
      { id: 3, label: '내수', value: '내수' },
      { id: 4, label: '금융', value: '금융' }
    ]

    useEffect(() => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/SignUpPage.css`;
      document.head.appendChild(link)
      return () => {
        document.head.removeChild(link);
      };

    },[])

    // 회원가입 폼 제출
    const handleSubmit = async (event) => {
      setLoading(true);
      const email = `${userEmail}@${domainEmail}`
      event.preventDefault();
      if(isUserIdValid!=true){
        alert("아이디 중복 확인을 해주세요")
      }
      else{
        if(nameCheck!=true){
          alert("2글자 이상의 한글로만 이름을 작성해주세요")
        }
        else{
          if(isPasswordValid!=true||passwordPatternCheck!=true){
            alert("비밀번호를 다시 입력해 주세요")
          }
          else{
            try {
              const tempData = {
                userName,
                userId,
                password,
                email,
                selectCategory};
              const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempData),
              });
        
              const data = await response.json();
              if (data.success) {
                setMessage('회원가입 성공');
                alert('회원가입 성공')
                navigator("../login")
              } else {
                setMessage('회원가입 실패: ' + data.message);
              }
            } catch (error) {
              console.error('회원가입 에러:', error);
            } finally {
              setLoading(false);
            }
          }
        }
      }
    };

    // id중복확인
    async function checkIdAvailability(){
      if(!userId){
        alert("아이디를 입력해 주세요")
      }
      else{
        try{
          const response = await fetch('http://localhost:5000/api/check-userid', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
          });
          const data = await response.json();
          if(data.success){
            setIsUserIdValid(true);
            alert("아이디 사용 가능")
          }
          else{
            alert("중복된 아이디입니다")
            setUserId("")
          }
        }catch (error){
          console.log("ID중복확인 에러 :",error);
        } 
      }
    }
    // id조건 확인(특수문자, 한글)
    function userIdCheck(e){
      const inputId = e.target.value
      setUserId(inputId)
      const test = specialCharsPattern.test(inputId);
      const koreaTest = koreanPattern.test(inputId);
      console.log(koreaTest)
      if(!test&&inputId.length>=3&&!koreaTest){
        setIdPatternCheck(true)
      }
      else{
        setIdPatternCheck(false)
      }
    }
    // password 조건 확인
    function passwordCheck(e){
      const inputPassword = e.target.value;
      const passNum = numberPattern.test(inputPassword)
      const passeng = englishPattern.test(inputPassword)
      const passspe = specialCharsPattern.test(inputPassword)
      const passkor = koreanPattern.test(inputPassword)

      setPassword(e.target.value); 
      setIsPasswordValid(e.target.value === confirmPassword);

      if(passNum&&passeng&&passspe&&inputPassword.length>=6){
        setPasswordPatternCheck(true)
      }
      else{
        setPasswordPatternCheck(false)
      }
    }

    // 선택한 카테고리 선택
    const handleCheckboxChange = (event) => {
      const value = event.target.value;
      if (event.target.checked) {
        setSelectCategory([...selectCategory, value]);
      } else {
        setSelectCategory(selectCategory.filter((item) => item !== value));
      }
    };

    // 사용자 이름 조건 확인
    function userNameCheck(e){
      const inputName = e.target.value;
      setUserName(inputName)
      const koreanPatternNmae = /^[가-힣\u1100-\u115F\u1160-\u11A7]+$/
      if(koreanPatternNmae.test(inputName)){
        setNameCheck(true)
      }
      else{
        setNameCheck(false)
      }
    }
    return (
    <body>
      {/* <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='User Name' value={userName}
            onChange={userNameCheck}/>
          <br/>
          <input type="text" placeholder="User ID" value={userId} 
            onChange={userIdCheck} required/>
          <button
            type='button'
            onClick={checkIdAvailability}
          >아이디 중복 확인</button>
          <br/>
          {idPatternCheck ? (<p></p>) : (<p>특수문자, 한글을 제외한 3글자 이상의 ID를 입력해주세요</p>)}
          <input type="password" placeholder="Password" value={password}
            onChange={passwordCheck} required/>
            {passwordPatternCheck ? (<p></p>) : (<p>영어 숫자 특수문자를 포함한 6글자 이상의 비밀번호를 입력해주세요</p>)}
          <br/>
          <input type='password' placeholder='confirmPassword' value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value); setIsPasswordValid(e.target.value === password);}} required/>
          <br/>
          <input type='text' placeholder='Email' value={userEmail} onChange={(e) => {setUserEmail(e.target.value);}} required></input>@
          <select onChange={(e) => {setDomainEmail(e.target.value);}}>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
          </select>
          <br/>
          {checkboxs.map((checkbox) => (
            <label key={checkbox.id} style={{ display: 'block', margin: '8px 0' }}>
              <input
                type="checkbox"
                value={checkbox.value}
                onChange={handleCheckboxChange}
                checked={selectCategory.includes(checkbox.value)}
              />
              <span style={{ marginLeft: '8px' }}>{checkbox.label}</span>
            </label>
          ))}
          <p>Selected Values: {selectCategory.join(', ')}</p>
          <br/>
          <input value={isPasswordValid}></input>
          <br/>
          <button type="submit">Sign Up</button>
        </form>
      </div> */}

      {/*  */}

      <div>
      <header>
        <div className="top-bar"></div>
      </header>

      <main>
        <div className="signup-container">
          <a href="/index.html">
            <img src="./logo.png" alt="Venchs Logo" className="logo" />
          </a>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">사용자명</label>
              <input
                type="text"
                id="username"
                placeholder="이름"
                required
                value={userName}
                onChange={userNameCheck}
              />
            </div>
            
            {/* <input type='text' placeholder='User Name' value={userName}
            onChange={userNameCheck}/> */}

            <div className="form-group">
              <label htmlFor="user-id">아이디</label>
              <input
                type="text"
                id="user-id"
                placeholder="아이디"
                required
                value={userId} 
                onChange={userIdCheck}
              />
              <button
            type='button'
            id='user-idbtn'
            onClick={checkIdAvailability}
          >중복 확인</button>
            </div>
            {/* <input type="text" placeholder="User ID" value={userId} 
            onChange={userIdCheck} required/> */}

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="text"
                id="email"
                placeholder="이메일"
                required
                value={userEmail} onChange={(e) => {setUserEmail(e.target.value);}}
              />
              <select id='select-email' onChange={(e) => {setDomainEmail(e.target.value);}}>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
              </select>
            </div>
            {/* <input type='text' placeholder='Email' value={userEmail} onChange={(e) => {setUserEmail(e.target.value);}} required></input>@ */}


            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="영문, 숫자 포함 7자리 이상"
                required
                value={password}
                onChange={passwordCheck}
              />
            </div>
            {/* <input type="password" placeholder="Password" value={password}
            onChange={passwordCheck} required/> */}

            <div className="form-group">
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="비밀번호 확인"
                required
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value)
                   setIsPasswordValid(e.target.value === password);}}
              />
            </div>
            {/* <input type='password' placeholder='confirmPassword' value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value); setIsPasswordValid(e.target.value === password);}} required/> */}

            <button type="submit" className="signup-button">
              회원가입
            </button>

            <div className="sns-signup">
              <p>SNS 간편 회원가입</p>
              <div className="sns-icons">
                <img src="/naver_icon.png" alt="Naver" />
                <img src="/kakao_icon.png" alt="Kakao" />
                <img src="/google_icon.png" alt="Google" />
                <img src="/apple_icon.png" alt="Apple" />
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Venchs. All rights reserved.</p>
      </footer>
    </div>
    </body>
    )
}
export default SignUpPage;