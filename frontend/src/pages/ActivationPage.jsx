import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../server';

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          if (res.data.success) {
            console.log(res.data.user); // User object
            console.log(res.data.token); // Token value
            // Show success message or handle other actions for successful activation
          } else {
            // Show error message or handle other actions for unsuccessful activation
            setError(true);
          }
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {error ? <p>Your token is expired!</p> : <p>Your account has been created successfully!</p>}
      </div>
    </div>
  );
};

export default ActivationPage;
