import { Form , Button} from "react-bootstrap"
import { useState } from "react"
import PdfUploader from "./PdfUploader"
import Offre from "./Offre";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../../context/ConversationContext";

function Informations() {

    const navigate = useNavigate()

    const {toggleQuestion , toggleNum} = useContext(UserContext)

    const [formData, setFormData] = useState({
        offre : '',
        cv : ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const submit = async (event) => {
        event.preventDefault()
        console.log(formData)

        try {
          const response = await axios.post('http://127.0.0.1:3001/first', formData);
          const question = response.data.firstResponse[0]
          toggleQuestion(question)

        } catch (error) {
          console.error('Erreur lors de envoie', error);
        }

        toggleNum(2)
        navigate('/entretien')
      }

    return(
        <Form className="d-flex flex-column align-items-center" style={{marginTop : "100px"}}>
            <Offre formData={formData} handleChange={handleChange}/>
            <PdfUploader formData={formData}/>
            <Button onClick={submit}> Commencer l'entretien</Button>
        </Form>
    )
}

export default Informations