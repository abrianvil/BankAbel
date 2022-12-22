import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [profile_pic, setProfile_pic] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  //error handling useState
  const [urlErr, setUrlErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const [renderErr, setRenderErr] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setRenderErr(true)
    if (password === repeatPassword &&
      !usernameErr &&
      !passwordErr &&
      !confirmPasswordErr &&
      !urlErr &&
      !emailErr) {
      const data = await dispatch(signUp({
        username,
        email,
        password,
        last_name: lastName,
        first_name: firstName,
        profile_pic
      }));
      if (data) {
        setErrors(data)
        for (let error of data) {
          if (error.startsWith('email')) setEmailErr('Email already in use')
          if (error.startsWith('password')) setPasswordErr(error)
          if (error.startsWith('username')) setUsernameErr(error.slice(10))

        }
        // console.log(data)
      }
    }
  };



  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const updatelastname = (e) => {
    setLastName(e.target.value);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const urlValidation = str => {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
  }


  /********************Use Effect******************* */

  useEffect(() => {
    //email error handling
    if (email.trim().length && !validateEmail(email)) {
      setEmailErr('Invalid Email')
    } else if (!email.length) {
      setEmailErr('Email is required')
    } else {
      setEmailErr("")
    }

    //username error handling
    if (!username.trim().length) {
      setUsernameErr('Username Required')
    } else if (username.length < 4) {
      setUsernameErr('Username must be at least 4 characters')
    } else if (username.length > 20) {
      setUsernameErr('Username must be less than 20 characters ')
    } else {
      setUsernameErr("")
    }

    //firstName error handling
    if (!firstName.trim().length) {
      setFirstNameErr('First Name Required')
    } else if (firstName.length < 2) {
      setFirstNameErr('First Name must be at least 2 characters')
    } else if (firstName.length > 20) {
      setFirstNameErr('First Name must be less than 20 characters ')
    } else {
      setFirstNameErr("")
    }

    //lastName error handling
    if (!lastName.trim().length) {
      setLastNameErr('Last Name Required')
    } else if (lastName.length < 2) {
      setLastNameErr('Last Name must be at least 2 characters')
    } else if (lastName.length > 20) {
      setLastNameErr('Last Name must be less than 20 characters ')
    } else {
      setLastNameErr("")
    }

    //password error handling
    if (!password.trim().length) {
      setPasswordErr('Password is required')
    } else if (password.length && password.length < 6) {
      setPasswordErr('Password must be greater than 6 characters')
    } else {
      setPasswordErr("")
    }

    //confirm password error handling
    if (!repeatPassword.trim().length) {
      setConfirmPasswordErr('Confirm Password is required')
    } else if (repeatPassword.length && repeatPassword !== password) {
      setConfirmPasswordErr('Confirm passwords must match')
    } else {
      setConfirmPasswordErr("");
    }

    //imgUrl error handling
    if (!profile_pic.trim().length) {
      setProfile_pic("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg")

    } else if (profile_pic.length && !urlValidation(profile_pic)) {
      setUrlErr('Invalid image URL')
    } else {
      setUrlErr('')
    }


  }, [username, email, password, profile_pic, repeatPassword, firstName, lastName])

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={onSignUp}>

        {renderErr && firstNameErr ? (
          <label className=" renderError">
            {firstNameErr}
          </label>
        ) : (
          <label className="text noRenderError" htmlFor="username">
            First Name
          </label>
        )}


        <input
          min={2}
          max={20}
          type='text'
          name='firstname'
          onChange={updateFirstname}
          value={firstName}
        ></input>


        {renderErr && lastNameErr ? (
          <label className="renderError" >
            {lastNameErr}
          </label>
        ) : (
          <label className="text noRenderError" >
            Last Name
          </label>
        )}

        <input
          min={2}
          max={20}
          type='text'
          name='lastname'
          onChange={updatelastname}
          value={lastName}
        ></input>


        {renderErr && usernameErr ? (
          <label className="renderError">
            {usernameErr}
          </label>
        ) : (
          <label className="text noRenderError">
            Username
          </label>
        )}

        <input
          min={2}
          max={20}
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>


        {renderErr && emailErr ? (
          <label className=" renderError">
            {emailErr}
          </label>
        ) : (
          <label className="text noRenderError">
            Email
          </label>
        )}

        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>

        {renderErr && urlErr ? (
          <label className="renderError">
            {urlErr}
          </label>
        ) : (
          <>
            <label className="text noRenderError">
              Profile picture
            <small id='option' style={{color:'salmon'}}> *optional</small>
            </label>
          </>
        )}
        <input
          type='text'
          name='picture'
          onChange={(e) => setProfile_pic(e.target.value)}
        >
        </input>


        {renderErr && passwordErr ? (
          <label className=" renderError">
            {passwordErr}
          </label>
        ) : (
          <label className="text noRenderError">
            Password
          </label>
        )}
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>


        {renderErr && confirmPasswordErr ? (
          <label className="renderError">
            {confirmPasswordErr}
          </label>
        ) : (
          <label className='text noRenderError' >
            Confirm Password
          </label>
        )}

        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>


        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
