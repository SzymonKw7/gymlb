import "./css/App.css";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import AddUser from "./components/AddUser/AddUser";
import UserList from "./components/UserList/UserList";
import CalculatorWILKS from "./components/CalculatorWILKS/CalculatorWILKS";
import {AnimatePresence} from "framer-motion";
import {useState} from "react";

function App() {
    const location = useLocation();

    const [userData, setUserData] = useState({});
    const [image, setImage] = useState(null);

    return <AnimatePresence mode={"wait"}>
        <Routes location={location} key={location.pathname}>
            <Route path={"/scoreboard"}>
                <Route index element={<Scoreboard handleImageChange={setImage}/>}/>
                <Route path={":name"} element={<Scoreboard handleImageChange={setImage}/>}/>
            </Route>
            <Route path={"/calc"}>
                <Route index element={<CalculatorWILKS userData={userData} userImage={image}/>}/>
            </Route>
            <Route path={"/users"}>
                <Route index element={<UserList/>}/>
                <Route path={"add"} element={<AddUser handleUserDataChange={setUserData} handleImageChange={setImage} userImage={image}/>}/>
            </Route>
            <Route path={"*"} element={<Navigate to={"/scoreboard"}/>}/>
        </Routes>
    </AnimatePresence>
}

export default App;