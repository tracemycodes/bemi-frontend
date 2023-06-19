import React, { useEffect, useState } from 'react';
import Button from '../../components/shared/Button/button';
import InputLabel from '../../components/shared/inputLabel/inputLabel';
import GoogleLogo from '../../components/layouts/assets/googleLogo.png';
import { LoginBtn, Checkbox } from '../LoginPage/LoginStyle';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../mutations/clientMutations';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [view, setView] = useState({
    passOne: false,
    passTwo: false,
  });

  const { firstName, lastName, confirmpassword, email, password } = contact;

  const [createUser, { loading, data, error }] = useMutation(ADD_USER, {
    variables: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (data) {
      toast.success('Account created successful', {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/login');
    }
    //eslint-disable-next-line
  }, [loading, data, error]);

  const handlePassView = (idx) => {
    if (idx === 1) {
      setView({ ...view, passOne: !view.passOne });
    } else if (idx === 2) {
      setView({ ...view, passTwo: !view.passTwo });
    }
  };

  const handleOnChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(contact);
    createUser(email, password, lastName, firstName);
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, '_self');
  };

  return (
    <div className="w-full mb-12 mt-24 lg:mt-12 bg-white">
      <div className="border w-11/12 mx-auto border-darkgray bg-white sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-12 p-4 sm:p-6 rounded-md shadow-md">
        <h1 className="text-xl font-semibold">Register</h1>
        <small className="text-ash">Sign up your account to get started!</small>
        <form>
          <div className="relative">
            <InputLabel
              labelValue={'First Name'}
              inputType={'text'}
              inputName={'firstName'}
              placeHolder={'First name'}
              handleInputChange={handleOnChange}
              inputValue={firstName}
            />
          </div>
          <div className="relative">
            <InputLabel
              labelValue={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              placeHolder={'Last name'}
              handleInputChange={handleOnChange}
              inputValue={lastName}
            />
          </div>
          <div className="relative">
            <InputLabel
              labelValue={'Email'}
              inputType={'email'}
              inputName={'email'}
              placeHolder={'Email address'}
              handleInputChange={handleOnChange}
              inputValue={email}
            />
          </div>
          <div className="relative m-0">
            <InputLabel
              labelValue={'Password'}
              inputType={view.passOne ? 'text' : 'password'}
              inputName={'password'}
              placeHolder={'Enter password'}
              ssss
              handleInputChange={handleOnChange}
              inputValue={password}
            />
            {view.passOne ? (
              <FiEye
                className=" absolute bottom-3 right-3 cursor-pointer"
                onClick={() => handlePassView(1)}
              />
            ) : (
              <FiEyeOff
                className=" absolute bottom-3 right-3 cursor-pointer"
                onClick={() => handlePassView(1)}
              />
            )}
          </div>
          <div className="relative mb-4">
            <InputLabel
              labelValue={'Confirm Password'}
              inputType={view.passTwo ? 'text' : 'password'}
              inputName={'confirmpassword'}
              placeHolder={'Confirm Password'}
              handleInputChange={handleOnChange}
              inputValue={confirmpassword}
            />
            {view.passTwo ? (
              <FiEye
                className=" absolute bottom-3 right-3 cursor-pointer"
                onClick={() => handlePassView(2)}
              />
            ) : (
              <FiEyeOff
                className=" absolute bottom-3 right-3 cursor-pointer"
                onClick={() => handlePassView(2)}
              />
            )}
          </div>

          <Checkbox>
            <input type="checkbox" id="loginCheck" name="loginCheck" />
            <label
              className="termsChecked text-xs text-ash"
              id="loginCheck"
              htmlFor="loginCheck"
            >
              By creating an account, you are agreeing to our Terms of Service
              and Privacy Policy.
            </label>
          </Checkbox>
          <LoginBtn>
            <Button
              buttonText={'Register'}
              classnames="loginBtn"
              handleClick={handleFormSubmit}
              loading={loading}
            />
            <h2 className="hr-lines text-darkgray">or</h2>
            <button
              className="flex items-center flex-wrap justify-center w-full border border-darkgray px-2 py-2 rounded-sm bg-googleButton bg-lightash hover:bg-white"
              onClick={handleGoogle}
            >
              <div className="w-5 h-5 mr-2">
                <img className="w-fulls" src={GoogleLogo} alt="google" />
              </div>
              Continue with Google
            </button>
          </LoginBtn>

          <div class="text-center mt-2">
            <span className="text-xs text-gray-400 font-semibold text-ash">
              Already have an account?
            </span>
            <Link to={'/login'}>
              <p className="text-xs font-semibold text-skyblue ml-1">Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
