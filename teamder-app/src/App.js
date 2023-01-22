import './App.css';
import Header from "./components/Header/Header";
import Authentication from "./components/Authentication/authentication";
import Register from "./components/register/register";

function App() {
    return (

        <div className="App">
            <Header/>
            <Authentication/>
            <Register/>
        </div>

    );
}

export default App;
