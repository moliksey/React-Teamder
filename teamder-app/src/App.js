import './App.css';
import Header from "./components/Header/Header";
import Authentication from "./components/Authentication/authentication";
import Register from "./components/register/register";
import Dialogs from "./components/Chat/Dialogs";
import Adsview from "./components/Adsview/adsview";
import Messenger from "./components/Chat/messenger";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyAds from "./components/Adsview/myAds";
import AddAd from "./components/Adsview/addAd";
import UpdateAd from "./components/Adsview/udateAd";
import UserInformationForm from "./components/userInformation/userInformationForm";
import UserInformation from "./components/userInformation/userInformation";


function App() {
    return (

        <div className="App">
            <BrowserRouter>
         <Header />
            <div style={{height:'90px'}}/>
            <Routes>
                <Route path={"/mainPage"} element={<Adsview/>}/>
                <Route path={"/auth"} element={<Authentication/>}/>
                <Route path={"/reg"} element={<Register/>}/>
                <Route path={"/myAds"} element={<MyAds/>}/>
                <Route path={"/myDialogs"} element={<Dialogs/>}/>
                <Route path={"/aboutMe"} element={<div></div>}/>
                <Route path={"/addAd"} element={<AddAd/>}/>
                <Route path={"/updateAd/:id"} element={<UpdateAd />}/>
                <Route path={"/dialog/:id"} element={<Messenger />}/>
                <Route path={"/me"} element={<UserInformationForm/>}/>
                <Route path={"/you/:id"} element={<UserInformation/>}/>
            </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
