import "../css/recruteur.css"
import TextToSpeech from "./TextToSpeech"

function Recruteur({question}) {

    return(
        <div className="recruteur">
            <div className="image-recruteur"></div>
            <TextToSpeech text={question}/>
        </div>
    )
}

export default Recruteur