import "./css/App.css";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import AddParticipant from "./components/AddParticipant/AddParticipant";
import ParticipantList from "./components/ParticipantList/ParticipantList";
import CalculatorWILKS from "./components/CalculatorWILKS/CalculatorWILKS";
import UpdatedScoreboard from "./components/Scoreboard/UpdatedScoreboard";
import {AnimatePresence} from "framer-motion";

function App() {
    const location = useLocation();

    return <AnimatePresence mode={"wait"}>
        <Routes location={location} key={location.pathname}>
            <Route path={"/scoreboard"}>
                <Route index element={<Scoreboard/>}/>
                <Route path={":id"} element={<UpdatedScoreboard/>}/>
            </Route>
            <Route path={"/calc"} element={<CalculatorWILKS/>}/>
            <Route path={"/participants"}>
                <Route index element={<ParticipantList/>}/>
                <Route path={"add"} element={<AddParticipant/>}/>
            </Route>
            <Route path={"*"} element={<Navigate to={"/scoreboard"}/>}/>
        </Routes>
    </AnimatePresence>
}

export default App;