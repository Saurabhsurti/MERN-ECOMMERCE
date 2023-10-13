import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import Login from "../components/Login/Login.jsx";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  },[])
  return (
    <div >
      <Login />
    </div>
  )
}

export default LoginPage
