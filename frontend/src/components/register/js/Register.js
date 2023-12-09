import { useNavigate } from "react-router-dom"
import { useState} from "react"
import Toast from "react-bootstrap/Toast"
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Button } from "react-bootstrap";

export default function Register() {

    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    function submit(event) {
        event.preventDefault()
        const { nom, prenom, email, password, confirmpassword } = event.target.elements
        if (password.value === confirmpassword.value) {
            const user = {
                firstName: prenom.value,
                lastName: nom.value,
                email: email.value,
                password: password.value
            }
            setShow(true);
            localStorage.setItem('user', JSON.stringify(user))
            setTimeout(() => { navigate("/Login") }, 1500)
        } else {
            const ele = document.getElementById("passwordHelp")
            ele.innerText = "No consistency between passwords"
            ele.className = "alert alert-danger resize"
        }
    }

    return (
        <section className="register">
            <form onSubmit={submit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputName2" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="exampleInputName2" name="nom" minLength="3" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">Prenom</label>
                    <input type="text" className="form-control" id="exampleInputName1" name="prenom" minLength="3" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" name="password" minLength="8" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirmer Mot de passe</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" name="confirmpassword" required /><br />
                    <div id="passwordHelp" className="form-text"></div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" name="check" required />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <Button type="submit">Register</Button>
                <p>Vous avez un compte <i onClick={() => { navigate("/Login") }}>Connectez vous</i></p>
            </form>
            <ToastContainer position="top-end">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation={true}>
                    <Toast.Header closeButton={false}>
                        <span style={{ color: "blue", fontWeight: "bold" }}>Entretien IA</span>
                    </Toast.Header>
                    <Toast.Body>Inscription reussi avec succès</Toast.Body>
                </Toast>
            </ToastContainer>
        </section>
    )
}