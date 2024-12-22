const express = require('express');
const app = express();
const port = 5000; 
const path = require('path');
const cors = require('cors');
const bodyparser = require("body-parser")
const connection = require("./dbConnect")
const { exec } = require('child_process');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyparser.json());

function runPythonScript() {
  const pythonPath = '"C:\\assignment\\wep_site\\web_project\\backend\\venv\\Scripts\\python.exe"'; //python 인터프리터 경로
  const scriptPath = '"C:\\assignment\\wep_site\\web_project\\backend\\main.py"'; //파이썬 코드 파일 경로

  exec(`${pythonPath} ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
      }
      if (stdout) {
        console.log("크롤링 완료"); 
    } else {
        console.log('빈 문자열 출력');
    }
  });
}

// runPythonScript()

// 메인페이지 초기 데이터 불러오기
app.get('/api/data', (req, res) => {
  const query = "SELECT * FROM project_info"
  connection.query(query,(err, result) => {
    if(err){
      console.log("DB쿼리 에러")
      return 0
    }
    res.json(result)
  })
});

// 사용자 로그인 요청
app.post('/api/login', (req,res) => {
  const { userId, password } = req.body;
  console.log(req.body)
  const query = "SELECT * FROM user WHERE user_id = ? AND password = ?";
  connection.query(query, [userId, password], (err,result) => {
    if(err){
      console.log("DB쿼리 에러");
      return 0
    }
    if(result[0]!=null){
      const logreturn = res.json({success: true, message:"로그인 성공", userId:result[0].user_id, userName:result[0].name})
      console.log("로그인 성공")
      return logreturn
    }
    else{
      console.log("로그인 실패")
      return res.status(401).json({success: false, message: "아이디 또는 비밀번호 오류"})
    }
  })
})

// id중복 확인
app.post('/api/check-userid',(req,res) => {
  const checkId = req.body.userId;
  const query = "SELECT * FROM user WHERE user_id = ?"
  connection.query(query, checkId, (err,result) => {
    if(err){
      console.log("DB쿼리 오류");
      return 0;
    }
    if(result[0]!=null){
      console.log("중복된 ID")
      return res.status(401).json({success: false, message: "아이디 또는 비밀번호 오류", isAvailable:false})
    }
    else{
      console.log("ID중복 없음")
      return res.json({success: true, message:"사용 가능한 아이디", isAvailable:true})
    } 
  })
})

// 사용자 회원가입
app.post('/api/signup', (req, res) => {
  const {userName, userId, password, email, selectCategory} = req.body
  console.log(selectCategory)
  const query = "INSERT INTO user (name, user_id, password, email) VALUE(?, ?, ?, ?)"
  connection.query(query, [userName ,userId, password, email], (err, result) => {
    if(err){
      console.log("DB쿼리 에러")
      return 0;
    }
    else{
      selectCategory.forEach(category => {
        const category_query = "INSERT INTO user_category (user_id, category) VALUE(?,?)"
        connection.query(category_query, [userId, category], (err, result) =>{
          if(err){
            console.log("카테고리 DB쿼리 에러")
            return 0;
          }
        })
      });
      console.log("회원가입 성공")
      return res.json({success: true, message:"회원가입 성공"})
    }
  })
})

// 사용자 ID찾기
app.post('/api/findid', (req,res) => {
  const {userName, email} = req.body
  const query = 'SELECT * FROM user WHERE name=? AND email=?'
  connection.query(query, [userName, email], (err, result) => {
    console.log(result)
    if(err){
      console.log("유저ID찾기 쿼리 에러")
      return 0;
    } else if(result.length!=0){
      return res.json({data:result[0].user_id, message:"ID찾기 완료" ,success:true})
    }
    else{
      console.log("id없는 경우")
      return res.json({data:null, message:"해당하는 ID가 없습니다" ,success:true})
    }
  })
})

// 사용자 비밀번호 찾기(ID체크)
app.post('/api/findpassword', (req, res) => {
  const {userId, userName, email} = req.body
  console.log(req.body)
  const query = 'SELECT * FROM user WHERE user_id = ? AND name = ? AND email = ?'
  connection.query(query, [userId, userName, email], (err,result) => {
    if(err){
      console.log("비밀번호 찾기(체크) 쿼리 에러")
      return 0;
    }
    else if(result.length!=0){
      console.log("비밀번호 찾기(id체크) 성공")
      return res.json({message:"새로운 비밀번호를 입력", success:true})
    }
    else{
      return res.json({message:"일치하지 않은 입력", success:false})
    }
  })
})
// 제작중
// 비밀번호 변경
app.post('/api/changepassword', (req, res) => {
  const {changePass, userId} = req.body
  const query = 'UPDATE user SET password = ? WHERE user_id = ?'
  connection.query(query, [changePass, userId], (err,result) => {
    if(err){
      console.log("비밀번호 변경 쿼리 에러")
      return 0;
    }
    else{
      console.log("비밀번호 변경 성공")
      return res.json({message:"비밀번호 변경 성공", success:true})
    }
  })
})

// 마이페이지 조회
app.get('/api/myuser', (req, res) => {
  const user_id = req.query.id
  const query = 'SELECT * FROM user WHERE user_id = ?'
  connection.query(query, user_id, (err, result) => {
    if(err){
      console.log('유저 조회 에러')
      return 0;
    }
    else{
      console.log('유저 조회 성공')
      res.status(200).json({data:result, message:'유저 조회 성공'})
    }
  })
})

// 마이 페이지 수정
app.post('/api/edituser', (req, res) => {
  const {id, name, email} = req.body
  const query = 'UPDATE user SET name = ?, email = ? WHERE user_id = ?'
  connection.query(query, [name, email, id], (err, result) => {
    if(err){
      console.log('회원 정보 수정 에러')
      return 0;
    }
    else{
      console.log('회원 정보 수정 성공')
      res.status(200).json({message:'회원 정보 수정 성공'})
    }
  })
})

// 마이 페이지 비밀번호 수정
app.post('/api/editPwd', (req, res) => {
  const {user_id, new_pwd} = req.body
  const query = 'UPDATE user SET password = ? WHERE user_id = ?'
  connection.query(query, [new_pwd, user_id], (err, result) => {
    if(err){
      console.log('유저 비밀번호 변경 에러')
      return 0;
    }
    else{
       console.log('유저 비밀번호 변경 성공')
       res.status(200).json({message:'비밀번호 변경 성공'})
    }
  })
})

// 게시판 게시글 조회
app.get('/api/posts', (req, res) => {
  const query = `SELECT * FROM board`
  connection.query(query, (err,result) =>{
    if(err){
      console.log(err)
      console.log("게시글 검색 쿼리 에러")
      return 0
    }
    else{
      console.log("게시글 검색 성공")
      return res.json(result)
    }
  })
})

// 커뮤니티 게시글 작성
app.post('/api/posts', (req, res) => {
  const {title, content, category, date, author} = req.body
  const query = `INSERT INTO board (title, content, category, creation_date, user_id) VALUE(?,?,?,?,?)`
  connection.query(query, [title, content, category, date, author], (err,result) =>{
    if(err){
      console.log(err)
      console.log("게시글 추가 쿼리 에러")
      return 0
    }
    else{
      console.log("게시글 추가 성공")
      return res.status(200).send();
    }
  })
})

// 게시글 상세 페이지 조회
app.get("/api/postdetail/:id", (req,res) => {
  const { id } = req.params;
  const query = "SELECT * FROM board WHERE board_num = ?"
  connection.query(query, id, (err, result) => {
    if(err){
      console.log("게시글 상세 조회 에러")
      return 0;
    }
    else{
      console.log("게시글 상세 조회 성공")
      return res.json(result)
    }
  })
})

// 게시글 수정
app.post('/api/postEdit', (req,res) => {
  const { board_num, title, content} = req.body
  const query = 'UPDATE board SET title = ?, content = ? WHERE board_num = ?'
  connection.query(query, [title, content, board_num], (err, result) => {
    if(err){
      console.log('게시글 수정 에러')
      return 0;
    }
    else{
      console.log('게시글 수정 성공')
      res.status(200).json({message:'게시글 수정 성공'})
    }
  })
})

// 게시글 삭제
app.get('/api/postDelete', (req,res) => {
  const board_num = req.query.no
  console.log(board_num)
  const query = 'DELETE FROM board WHERE board_num = ?'
  connection.query(query, board_num, (err,result) => {
    if(err){
      console.log(err)
      return 0;
    }
    else{
      console.log('게시글 삭제 완료')
      res.status(200).json({message:'게시글 삭제 완료'})
    }
  })
})

// 게시글 댓글 조회
app.get("/api/comments", (req, res) => {
  const boardNum = parseInt(req.query.boardNum, 10)
  const query = "SELECT * FROM comment WHERE board_num = ?"
  connection.query(query, boardNum, (err, result) => {
    if(err){
      console.log("댓글 조회 에러")
      return 0;
    }
    else{
      console.log("댓글 조회 성공")
      return res.json(result)
    }
  })
})

// 댓글 작성
app.post("/api/commentwrite", (req,res) => {
  const {newComment, userID, boardNum} = req.body
  const query = "INSERT comment(board_num, content, user_id) VALUE (?,?,?)"
  connection.query(query, [boardNum, newComment, userID], (err, result) => {
    if(err){
      console.log(err)
      return 0;
    }
    else{
      console.log("댓글 추가 성공")
      res.status(200).json({message:"댓글 작성 성공"})
    }
  })
})

// 댓글 수정
app.post('/api/commentEdit', (req,res) => {
  const {comment_num, content} = req.body
  const query = 'UPDATE comment SET content = ? WHERE comment_num = ?'
  connection.query(query, [content, comment_num], (err, result) => {
    if(err){
      console.log("댓글 수정 에러")
      return 0;
    }
    else{
      console.log('댓글 수정 완료')
      res.status(200).json({message:"댓글 수정 성공"})
    }
  })
})

// 댓글 삭제
app.get('/api/commentDelete', (req,res) => {
  const comment_num = req.query.no
  const query = 'DELETE FROM comment WHERE comment_num = ?'
  
  connection.query(query, comment_num, (err,result) => {
    if(err){
      console.log(err)
      console.log('댓글 삭제 오류')
      return 0;
    }
    else{
      console.log('댓글 삭제 완료')
      res.status(200).json({message:"댓글 삭제 완료"})
    }
  })
})

// 게시판 대댓글 조회
app.get("/api/reply", (req, res) => {
  const comment_num = parseInt(req.query.commentNum, 10)
  const query = "SELECT * FROM reply WHERE comment_num = ?"
  connection.query(query, comment_num, (err,result) => {
    if(err){
      console.log("대댓글 조회 오류")
      return 0;
    }
    else{
      console.log("대댓글 조회 성공")
      return res.json(result)
    }
  })
})

// 대댓글 작성
app.post('/api/replywrite', (req, res) => {
  const {newReply, userID, commentNum} = req.body
  const query = "INSERT reply(comment_num, content, user_id) VALUE (?,?,?)"
  connection.query(query, [commentNum, newReply, userID], (err, result) => {
    if(err){
      console.log(err)
      return 0;
    }
    else{
      console.log("대댓글 추가 성공")
      res.status(200).json({message:"댓글 작성 성공"})
    }
  })
})

// 대댓글 수정
app.post('/api/replyEdit', (req,res) => {
  const {reply_num, content} = req.body
  const query = "UPDATE reply SET content = ? WHERE reply_num = ?"
  connection.query(query, [content, reply_num], (err,result) => {
    if(err){
      console.log("댓글 수정 오류")
      return 0;
    }
    else{
      console.log("댓글 수정 완료")
      res.status(200).json({message:"댓글 수정 성공"})
    }
  })
})

// 대댓글 삭제
app.get('/api/replyDelete', (req,res) => {
  const reply_num = req.query.no
  const query = 'DELETE FROM reply WHERE reply_num = ?'
  connection.query(query, reply_num, (err,result) => {
    if(err){
      console.log('댓글 삭제 오류')
      return 0;
    }
    else{
      console.log('댓글 삭제 완료')
      res.status(200).json({message:"댓글 삭제 완료"})
    }
  })
})

// 뉴스 페이지 조회
app.get('/api/news', (req, res) => {
  const query = 'SELECT * FROM news'
  connection.query(query, (err, result) => {
    if(err){
      console.log("뉴스 조회 에러")
      return 0;
    }
    else{
      console.log("뉴스 요청 성공")
      return res.json(result)
    }
  })
  console.log("뉴스 요청")
})

// 사업공고 카테고리 필터
app.get('/api/annlisview', (req, res) => {
  const selCategory = req.query.category
  const query = "SELECT * FROM project_info WHERE category = ?"
  connection.query(query, selCategory, (err, result) => {

    console.log(result)
    if(err){
      console.log("DB쿼리 에러")
      return 0;
    }
    else{
      console.log("카테고리 검색 성공")
      res.setHeader('Content-Type', 'application/json');
      return res.json({data:result, success:true})
    }
  })
})

// 검색 기능 제작중
app.get('/api/search', (req, res) => {
  let query = "SELECT * FROM project_info WHERE 1=1"
  let params = [];
  connection.query(query,params,(err, result) => {
    if(err){
      console.log("DB쿼리 에러")
      return 0
    }
    res.json(result)
  })
});

// 찜 목록 조회
app.post("/api/favlist", (req,res) => {
  const favListUserID = req.body.user_id
  let query = "SELECT * FROM wish_list WHERE user_id = ?"
  connection.query(query, favListUserID, (err, result) => {
    if(err){
      console.log("찜목록 조회 에러")
      return 0;
    }
    else{
      return res.json(result);
    }
  }) 
})

// 이용안내 페이지 파일 전송
app.get("/api/gdinfo", (req,res) => {
  console.log("가이드 요청")
  const filePath = path.join(__dirname, 'test.json'); 
  res.sendFile(filePath);
})

// 광고 이미지 전송
app.get('/api/image', async (req,res) => {
  const query = 'SELECT * FROM ads WHERE ad_use = 1 AND CURDATE() BETWEEN ad_start_date AND ad_end_date'
  connection.query(query, (err, result) => {
    if(err){
      console.log('광고 가져오기 에러')
      return 0;
    }
    else if(result.length<1){
      const imagePath = `C:/assignment/wep_site/web_project/backend/public/del.png`
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');

      res.json({ image: base64Image })
    }
    else{
      const randomInt = Math.floor(Math.random() * result.length)
      const imagePath = `C:/assignment/wep_site/web_project/backend/public/${result[randomInt].ad_file}`
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');

      res.json({ image: base64Image })
    }
  })
})

// 누적 접속자 조회
app.get("/api/visit_user", (req,res) =>{
  let selectQuery = "SELECT * FROM visit WHERE visit_date = CURRENT_DATE"
  let insertQuery = "INSERT visit(visit_date, visit_count) VALUES(CURRENT_DATE, 0)"
  connection.query(selectQuery, (err, result) => {
    if(err){
      console.log("누적 접속자 SELECT 에러")
    }
    else if(result.length==0){
      connection.query(insertQuery, (err, result) => {
        if(err) console.log("누적 접속자 삽입 에러")
        else{
          console.log("일단 아무거나")
          return 0;     
        } 
      })
    }
    else{
      res.setHeader('Content-Type', 'application/json');
      return res.json({data:result, success:true})
    }
  })
})

// 누적 접속자 카운트 증가
app.post('/api/visit_counter', (req,res) => {
  // console.log("요청 성공")
  let query = 'UPDATE visit SET visit_count = visit_count+1 WHERE visit_date = CURRENT_DATE'
  connection.query(query, (err,result) => {
    if(err){
      console.log("누적 접속자 업데이트 쿼리 에리")
      return 0;
    }
  })
})

// 관리자 페이지 기능

// 회원 조회
app.get('/api/admin/userSelect', (req, res) => {
  const query = 'SELECT * FROM user'
  connection.query(query, (err, result) => {
    if(err){
      console.log('유저 조회 에러')
      return 0;
    }
    else{
      console.log('유저 조회 완료')
      res.status(200).json({data:result, message:'유저 조회 완료'})
    }
  })
})

// 유저 추가
app.post('/api/admin/addUser', (req,res) => {
  const {userId, password, name, email, rank} = req.body
  const query = 'INSERT INTO user(user_id, password, name, email, `rank`) VALUES(?,?,?,?,?)'
  connection.query(query, [userId, password, name, email, rank], (err, result) => {
    if(err){
      console.log('회원 추가 에러')
      return 0;
    }
    else{
      console.log('회원 추가 성공')
      res.status(200).json({message:'회원 추가 성공'})
    }
  })
})

// 유저 수정
app.put('/api/admin/editUser', (req, res) => {
  const {userId, oldUserId, password, name, email, rank} = req.body
  console.log(req.body)
  const query = 'UPDATE user SET user_id = ?, name = ?, email = ?, `rank` = ? WHERE user_id = ?'  
  connection.query(query, [userId, name, email, rank, oldUserId], (err, result) => {
    if(err){
      console.log('회원 수정 에러')
      console.log(err)
      return 0;
    }
    else{
      console.log('회원 수정 완료')
      res.status(200).json({message:'회원 수정 완료'})
    }
  })
})

// 유저 삭제
app.delete('/api/admin/deleteUser', (req,res) => {
  const user_id = req.body.user_id
  console.log(req.body)
  const query = 'DELETE FROM user WHERE user_id = ?'
  connection.query(query, user_id, (err, result) => {
    if(err){
      console.log('유저 삭제 에러')
      console.log(err)
      return 0;
    }
    else{
      console.log('유저 삭제 완료')
      res.status(200).json({message:'유저 삭제 완료'})
    }
  })
})

// 문의 내용 조회
app.get("/api/admin/inquiries", (req,res) => {
  const query = "SELECT * FROM qna"
  connection.query(query, (err, result) => {
    if(err){
      console.log("문의 조회 에러");
      console.log(err)
      return 0;
    }
    else{
      console.log("문의 조회 성공")
      res.status(200).json({data:result, message:"문의 조회 성공"})
    }
  })
})

// 문의 작성 요청 만들기
app.post("/api/admin/save-response", (req,res) => {
  const {inquiryTitle,inquiryContent,inquiryDate,responseContent} = req.body
  const query = "UPDATE qna SET qa_answer = ?, qa_datetime = NOW() WHERE qa_subject = ? AND qa_content = ?"
  connection.query(query, [responseContent,inquiryTitle,inquiryContent], (err, result) => {
    if(err){
      console.log("문의 답변 추가 에러")
      console.log(err)
      return 0;
    }
    else{
      console.log("문의 답변 추가 성공")
      res.status(200).json({message:"문의 답변 추가 성공"})
    }
  })
})

// 광고 목록 조회
app.get('/api/admin/getAdList', (req,res) => {
  const query = "SELECT * FROM ads"
  connection.query(query,(err,result) => {
    if(err){
      console.log("광고 목록 조회 에러")
      console.log(err)
      return 0;
    }
    else{
      console.log("광고 목록 조회 성공")
      res.status(200).json({data:result,message:"광고 목록 조회 성공"})
    }
  })
})

// 광고 추가 기능
app.post("/api/admin/addAd",(req,res) => {
  const {ad_subject, ad_file, ad_content, ad_use, ad_start_date, ad_end_date} = req.body
  const query = "INSERT INTO ads(ad_subject, ad_file, ad_content, ad_use, ad_start_date, ad_end_date, ad_datetime) VALUES(?, ?, ?, ?, ?, ?, NOW())";
  connection.query(query, [ad_subject, ad_file, ad_content, ad_use, ad_start_date, ad_end_date], (err, result) => {
    if(err){
      console.log("광고 추가 에러")
      console.log(err)
    }
    else{
      console.log("광고 추가 성공")
      res.status(200).json({message:"광고 추가 성공"})
    }
  })
})

// 광고 수정 기능
app.put("/api/admin/editad", (req,res) => {
  const {ad_id, ad_subject, ad_file, ad_content, ad_use, ad_start_date, ad_end_date} = req.body
  const query = "UPDATE ads SET ad_subject = ?, ad_file = ?, ad_content = ?, ad_use = ?, ad_start_date = ?, ad_end_date = ?, ad_datetime = NOW() WHERE ad_id = ?"
  connection.query(query, [ad_subject, ad_file, ad_content, ad_use, ad_start_date, ad_end_date, ad_id], (err, result) => {
    if(err){
      console.log("광고 수정 에러")
      console.log(err)
    }
    else{
      console.log("광고 수정 성공")
      res.status(200).json({message:"광고 수정 성공"})
    }
  })
  

})

// 광고 제거
app.delete("/api/admin/deleteAds", (req,res) => {
  const ad_id = req.body.adId
  const query = "DELETE FROM ads WHERE ad_id = ?"
  connection.query(query, ad_id, (err,result) => {
    if(err){
      console.log('광고 삭제 에러')
      console.log(err)
      return 0;
    }
    else{
      console.log("광고 제거 성공")
      res.status(200).json({message:"광고 제거 성공"})
    }
  })
})

app.post('/api/admin/save-custom-response', (req,res) => {
  console.log('요청')
})

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});