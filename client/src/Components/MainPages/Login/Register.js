import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

const [user,setUser]=useState({
  name:'',
  email:'',
  password:''
});
 const onChangeInput=(e)=>{
  const {name,value}=e.target;
  setUser({...user,[name]:value})
 }

 const registerSubmit=async(e)=>{
  console.log("Submitting user:", user);

  e.preventDefault();
  try{
    await axios.post('/user/register',{...user});
    
    localStorage.setItem('First Register',true);
    alert("Registration successful ✅");
    window.location.href="/"
  }catch(err){
    alert(err.response.data.msg)
  }
 }
  return (
    <div className='Register-page'>
      <form onSubmit={registerSubmit} className='register-form'>
   <input type='text' name='name' required placeholder='Enter Full Name' value={user.name} onChange={onChangeInput} />
<input type='email' name='email' required placeholder='Enter Register Email' value={user.email} onChange={onChangeInput} />
<input type='password' name='password' required placeholder='Enter Password' value={user.password} onChange={onChangeInput} />

        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/login' >Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
