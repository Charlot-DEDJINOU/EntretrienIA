import { createContext } from "react";
import { useState } from "react";

const user = JSON.parse(localStorage.getItem('user'))

export const UserContext = createContext()
export const UserProvider = ({ children }) => {

    const [isLogin, setLogin] = useState(user != null)
    const toggleLogin = () => {
        setLogin(!isLogin)
    }

    const [messages, setMessages] = useState([])
    const [question ,  setQuestion] = useState('')
    const [num , setNum] = useState(0)
    
    const toggleMessages = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    } 
    
    const toggleQuestion = (quiz) => {
        setQuestion(quiz)
    }

    const toggleNum = (numero) => {
        setNum(numero)
    }

    return (
        <UserContext.Provider value={{ num , toggleNum , messages , toggleMessages , isLogin , toggleLogin , question , toggleQuestion }}>
            {children}
        </UserContext.Provider>
    )
}