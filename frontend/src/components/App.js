import React from "react";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import '../App.css';
import Header from "./header/js/Header";
import Home from "./views/Home";
import Entretien from "./views/Entretien";
import { UserProvider } from "./context/ConversationContext";
import Login from "./login/js/Login";
import Register from "./register/js/Register";
import Informations from "./entretienInformations/js/Informations";

function App() {
  return (
    <React.StrictMode>
          <Router>
            <UserProvider>
                <Header />
                <Routes>
                    <Route path="/" element = {<Home />}/>
                    <Route path="preview" element = {<Informations />} />
                    <Route path="entretien" element = {<Entretien />} />
                    <Route path="Login" element = {<Login />} />
                    <Route path="Register" element = {<Register />} />
                </Routes>
            </UserProvider>
          </Router>
    </React.StrictMode>
  );
}

export default App;
