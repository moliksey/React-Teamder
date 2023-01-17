import './App.css';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/register/register";
function App() {
  return (

        <div className="App">
         <Header />
            <Register />
        </div>

  );
}

export default App;
