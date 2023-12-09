import ia from "../../../assets/360_F_210969565_cIHkcrIzRpWNZzq8eaQnYotG4pkHh0P9.jpg"
import user from "../../../assets/images.png"

function Message(props) {
    return(
        <div className="message">
            <img src={props.from === 'user' ? user : ia} alt="user" />
            <p className="mx-2">{props.text}</p>
        </div>
    )
}

export default Message