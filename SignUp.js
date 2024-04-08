import React, { useState } from 'react';
import './Login.css'
import {Link,useNavigate} from "react-router-dom"
import logo1 from "./Imagini/Logo_kju.png"
import {auth}from "./firebase"
import { NavLink } from 'react-router-dom';
import './SignUp.css'
const signIn = e =>{
    e.preventDefault();
    
    }
 
  
    function SignUp() {
      const [udata, setUdata] = useState({
        email: "",
        password: "",
        cpassword: ""
      });
    
      const navigate = useNavigate();
    
      const adddata = (e) => {
        const { name, value } = e.target;
        setUdata((prevUdata) => ({
          ...prevUdata,
          [name]: value
        }));
      };
    
      const register = async (e) => {
        e.preventDefault();
    
        if (udata.password !== udata.cpassword) {
          alert('Parolele nu se potrivesc!');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nume: udata.email,
              parola: udata.password,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Înregistrare cu succes:', data);
            navigate('/login');
          } else {
            // Presupunând că serverul întotdeauna trimite un răspuns JSON, chiar și pentru erori
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
        } catch (error) {
          alert('Eroare la înregistrare: ' + error.message);
        }
      };
    
    
    return(
        <div className='login'>
            <Link to='/'>
                
            <img className='login__logo' src={logo1}/>
            </Link>
            <div className='login__container'>
            <h1>Sign UP </h1>
            <form onSubmit={register}>
                <label htmlFor='email'>E-mail</label>
                <input type='text'name='email' onChange={adddata} value={udata.email} id='email'/>
                
                <label htmlFor='password'>Password</label>
                <input type='password'  placeholder='Macar 6 caractere'name='password' onChange={adddata} value={udata.password} id='password' />
                <label htmlFor='password'>Password AGAIN</label>
                <input type='password' name='cpassword'  onChange={adddata} value={udata.cpassword} id='cpassword' />
                <button type='submit' className='login__signInButton'>Continue</button>
                </form>
                
                            <p>Already have an account?</p><div className="signin_info">
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
            </div>
        </div>
    )
}
export default SignUp