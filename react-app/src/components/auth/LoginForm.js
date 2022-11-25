import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-signup-div'>
      {form && (
        <div>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button type='submit'>Login</button>
            </div>
          </form>

          <div className='info'>
                <h3>Don't have an account yet</h3>
                <div>Sign up and start Banking with us</div>
                <button onClick={()=>setForm(false)}>Sign Up</button>
          </div>
        </div>
      )}
      {!form && (
        <>
        <SignUpForm />
        <div className='info'>
                <h3>Already have an account</h3>
                <div>Sign up and start Banking with us</div>
                <button onClick={()=>setForm(true)}>Login</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
