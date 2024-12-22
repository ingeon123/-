import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AnnListView from './AnnListView';
import NewsFd from './NewsFd';
import CommBoard from './CommBoard';
import FavList from './FavList';
import GdInfo from './GdInfo';
import PrivacyPolicy from './PrivacyPolicy';
import EmailPolicy from './EmailPolicy';
import Terms from './Terms';
import FindUser from './FindUser';
import FindId from './FindIdPage';
import FindPassword from './FindPasswordPage';
import UserBoard from './UserBoard';
import Notice_Post from './Notice_Post';
import UserBoardDetail from './UserBoardDetail';
import MyUser from './MyUser';
import UserSelect from './admin/UserSelect';
import UserAdd from './admin/UserAdd';
import Complainmanage from './admin/Complainmanage';
import Complainresponse from './admin/Complainresponse';
import Rolemanage from './admin/Rolemanage';
import UserList from './admin/UserList';
import Usermanage from './admin/Usermanage';
import Userinquiry from './admin/Userinquiry';
import Adsandcampaigns from './admin/Adsandcampaigns';
import AdsList from './admin/AdsList';
import AddAds from './admin/AddAds';


function App() {
  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([
    { id: 1, category: '정보공유', title: '[창업진흥원] 창업 정책 아이디어 공모전', date: '2024-08-09', author: '익명' }
  ]);

  useEffect(()=>{
    const fetchdata = async () => {
    try{
      const response = await fetch("http://localhost:5000/api/data")
      const result = await response.json();
      setdata(result);
    }
    catch (error){
      console.log("초기 데이터 에러:",error)
    }
    finally {
      setLoading(false);
    }
  }
  fetchdata();
  },[]);
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage data={data} loading={loading} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path='/annlist' element={<AnnListView data={data}/>}/>
          <Route path='/newsfd' element={<NewsFd/>}/>
          <Route path='/commboard' element={<CommBoard/>}/>
          <Route path='/userboard' element={<UserBoard/>}/>
          <Route path='/UserBoardDetail/:id' element={<UserBoardDetail/>}/>
          <Route path='/favlist' element={<FavList/>}/>
          <Route path='/gdinfo' element={<GdInfo/>}/>
          <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
          <Route path='/emailpolicy' element={<EmailPolicy/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/finduser' element={<FindUser/>}/>
          <Route path='/findid' element={<FindId/>}/>
          <Route path='/findpassword' element={<FindPassword/>}/>
          <Route path="/notice-post" element={<Notice_Post addPost={addPost} />} />
          <Route path='/myUser' element={<MyUser/>}/>
          <Route path='/admin/userselect' element={<UserSelect/>}/>
          <Route path='/admin/useradd' element={<UserAdd/>}/>
          <Route path='/admin/adsandcampaigns'element={<Adsandcampaigns/>}/>
          <Route path='/admin/adsList'element={<AdsList/>}/>
          <Route path='/admin/addAds'element={<AddAds/>}/>
          {/* <Route path='/dashboard' element={<대시보드/>}/>
          <Route path='/sitetraffic' element={<사이트트래픽/>}/> */}
          <Route path='/admin/usermanage' element={<Usermanage/>}/>
          <Route path='/admin/userlist' element={<UserList/>}/>
          <Route path='/admin/rolemanage' element={<Rolemanage/>}/>
          <Route path='/admin/Complainmanage' element={<Complainmanage/>}/>
          <Route path='/admin/complainresponse' element={<Complainresponse/>}/>
          {/* <Route path='/securitysettings' element={<보안설정/>}/> */}
          <Route path='/admin/userinquiry' element={<Userinquiry/>}/>
        </Routes>
      </Router>
  )
}

export default App;
