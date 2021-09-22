import React,{useState} from 'react'
import { Link, } from 'react-router-dom'
import { auth } from '../config/config'
import './login.css'
import Navbar from "../Navbar/Navbar";




export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message));
    }


    return (<>
        <Navbar />
        <div className="form__container">
            <div className="form1">
            <br/>                      
            <h2>Login</h2>
            
            <form autoComplete="off" className='form__group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form__control' required 
                onChange={(e) => setEmail(e.target.value)} value={email} />
                
                <label htmlFor="password">Password</label>
                <input type="password" className='form__control' required 
                onChange={(e) => setPassword(e.target.value)} value={password}/>
               
                <button type="submit" className='button1'>LOGIN</button>
            </form>
             {error &&<span className='error__msg'>{error}</span>}
           
            <span className="span">Don't have an account? Register
                <Link to="signup"> Here</Link>
            </span>
            </div>

        </div>

   </> )
}