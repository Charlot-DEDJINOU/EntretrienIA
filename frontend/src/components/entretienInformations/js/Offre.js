import { Container , Form} from "react-bootstrap"

function Offre({formData , handleChange}) {
    return(
        <Container>
            <Form.Group controlId="offre" className="mb-3 d-flex flex-column">
                <Form.Label className="fs-2 fw-light ">L'offre d'emploi</Form.Label>
                <textarea
                    type="text"
                    name="offre"
                    value={formData.offre}
                    onChange={handleChange}
                    required
                    style={{border : "1px solid rgba(0,0,0,0.3)" ,outline : "1px solid rgba(0,0,0,0.2)" , with : "100%" , height : "60vh"}}
                ></textarea>
            </Form.Group>
        </Container>
    )
}

export default Offre