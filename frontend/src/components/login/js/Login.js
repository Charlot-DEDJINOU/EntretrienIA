import { useContext} from "react"
import { UserContext } from "../../context/ConversationContext"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import "../css/login.css"

export default function Login(){

    const { toggleLogin }=useContext(UserContext)

    const navigate=useNavigate()

    function submit(event){
        event.preventDefault()

        const {email,password}=event.target.elements
        const user=JSON.parse(localStorage.getItem('user'))
        
        if(user===null){
            const ele=document.getElementById("passwordHelp")
            ele.className="alert alert-info resize"
            ele.innerText="Cet utilisateur n'existe pas"
        }
        else if(password.value === user.password && email.value === user.email){
            toggleLogin()
            navigate("/")  
       }else {
        const ele=document.getElementById("passwordHelp")
        ele.className="alert alert-danger resize"
        ele.innerText="Email or password is incorrect"
       }
    }
    return(
        <section className="login">
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" required /><br />
                    <div id="passwordHelp" className="form-text"></div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" name="check" required/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <Button type="submit">Login</Button>
                <p>Vous n'avez pas un compte <i onClick={()=>{navigate("/Register")}}>Enregistrer vous</i></p>
            </form>
        </section>
    )
}