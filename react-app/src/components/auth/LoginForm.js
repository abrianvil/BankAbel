import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';
import './index.css'


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

  const demo1 = async (e) => {
    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'))
  }

  const demo2 = async (e) => {
    e.preventDefault()
    await dispatch(login('bobbie@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='login-signup-div'>
      {form && (
        <>
          <div className='form-container'>
            <form className='form' onSubmit={onLogin}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>

              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />

              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button type='submit'>Login</button>
              <button onClick={demo1}>Demo 1</button>
              <button onClick={demo2}>Demo 2</button>
            </form>
          </div>

          <div className='info'>
            <h1>Don't have an account yet</h1>
            <div>Sign up and start Banking with us</div>
            <button onClick={() => setForm(false)}>Sign Up</button>
          </div>
        </>
      )}
      {!form && (
        <>
          <SignUpForm />
          <div className='info'>
            <h1>Already have an account</h1>
            <div>Login and continue Banking with us</div>
            <button onClick={() => setForm(true)}>Login</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
