import React,{ useEffect} from 'react'
import { useSelector } from 'react-redux';

import Signup from '../components/Signup/Signup'
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <div>
       <Signup /> 
    </div>
  )
}

export default SignupPage
