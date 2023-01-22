import './App.css';
import Header from "./components/Header/Header";
import Adsview from "./components/Adsview/adsview";
import AddAd from "./components/Adsview/addAd";
import Authentication from "./components/Authentication/authentication";
import MyAds from "./components/Adsview/myAds";
import UpdateAd from "./components/Adsview/udateAd";
import Dialogs from "./components/Chat/Dialogs";
function App() {
  return (

        <div className="App">
         <Header />
            <Dialogs />
        </div>

  );
}

export default App;
