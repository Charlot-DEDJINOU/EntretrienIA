import "../css/conversation.css"
import { BsArrowBarUp } from "react-icons/bs";
import { useContext} from "react"
import { UserContext } from "../../context/ConversationContext";
import Message from "./Message";

function Conversation() {

    const { messages } = useContext(UserContext)

    return(
        <div className="conversation">
            <div className="title">
                <h5>IA CONVERSATION</h5>
                <BsArrowBarUp className="icone"/>
            </div>
            <div className="body_conversation">
                {
                    messages.map((item , index) => <Message {...item} key={index} />)
                }
            </div>
        </div>
    )
}

export default Conversation