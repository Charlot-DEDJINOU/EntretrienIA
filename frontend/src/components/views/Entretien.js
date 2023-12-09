import Recruteur from "../entretien/js/Recruteur"
import User from "../entretien/js/User"
import Conversation from "../entretien/js/Conversation"
import { useContext } from "react";
import { UserContext } from "../context/ConversationContext";

function Entretien() {

    const {question , toggleQuestion , toggleNum , num} = useContext(UserContext)

    return(
        <div className="d-flex justify-content-between" style={{marginTop : "70px"}}>
            <Recruteur question = {question}/>
            <Conversation />
            <User question = {question} toggleQuestion = {toggleQuestion} toggleNum = {toggleNum} num = {num}/>
        </div>
    )
}

export default Entretien