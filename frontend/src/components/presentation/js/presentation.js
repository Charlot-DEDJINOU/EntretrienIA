import { Button } from "react-bootstrap"
import "../css/presentation.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/ConversationContext";

function Presentation() {

    const navigate = useNavigate()
    const { isLogin } = useContext(UserContext)

    return(
        <div className="presentation d-flex flex-column align-items-center justify-content-center ">
            <Button onClick={ () => isLogin ? navigate('/preview') : navigate('/Login')}>
                Stimuler un entretien
            </Button>
        </div>
    )
}

export default Presentation