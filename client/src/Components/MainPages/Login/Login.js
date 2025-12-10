import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

const [user,setUser]=useState({
  email:'',
  password:''
});
 const onChangeInput=(e)=>{
  const {name,value}=e.target;
  setUser({...user,[name]:value})
 }

 const loginSubmit=async(e)=>{
  e.preventDefault();
  try{
    const res=await axios.post('/user/login',{...user});
    console.log("Response: ",res.data)
    localStorage.setItem("First Login",true);
    localStorage.setItem('token', res.data.accesstoken);
    window.location.href="/"
  }catch(err){
    alert(err.response.data.msg)
  }
 }
  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit} className='login-form'>
        <input type='email' name='email' required placeholder='Enter Register Email' value={user.email} onChange={onChangeInput} />
        <input type='password' name='password' required placeholder='Enter Password' value={user.password} onChange={onChangeInput} />
        <div className='row'>
          <button type='submit'>Login</button>
          <Link to='/register' >Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
