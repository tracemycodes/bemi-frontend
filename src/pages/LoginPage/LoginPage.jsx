/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import InputLabel from '../../components/shared/inputLabel/inputLabel';
import Button from '../../components/shared/Button/button';
import GoogleLogo from '../../components/layouts/assets/googleLogo.png';
import { Checkbox, LoginBtn } from './LoginStyle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_CLIENT } from '../../mutations/clientMutations';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import BemiIvoryContext from '../../context/BemiIvory/bemiIvoryContext';
import { PROFILE_CHECK } from '../../context/types';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { state, dispatch } = bemiIvoryContext;
  const [contact, setContact] = useState({
    email: '',
    password: '',
  });
  const [view, setView] = useState(false);

  const { email, password } = contact;

  const [loginUser, { loading, data, error }] = useMutation(LOGIN_CLIENT, {
    variables: {
      email: email,
      password: password,
    },
  });

  useEffect(() => {
    const handleNavigation = () => {
      const previousPageUrl = window.history.state?.previousPage || '/';
      console.log(previousPageUrl, 'okay');
    };

    // Attach event listener to capture the navigation
    window.addEventListener('popstate', handleNavigation);

    // Clean up the event listener on component unmount
    // return () => {
    //   window.removeEventListener("popstate", handleNavigation);
    // };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error('Invalid login credentials', {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (data) {
      toast.success('Login successful', {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.setItem('token', data.loginUser.token);
      dispatch({ type: PROFILE_CHECK, payload: true });
      console.log(data, data.loginUser.isAdmin, 'trtrt');
      if (data.loginUser.isAdmin) {
        navigate('/admin');
        return;
      }
      if (state.purchase) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
    //eslint-disable-next-line
  }, [loading, data, error]);

  const handleOnChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handlePassView = () => {
    setView(!view);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, '_self');
  };

  return (
    <div className="w-full mb-12 mt-24 lg:mt-12 bg-white">
      <div className="border w-11/12 mx-auto border-darkgray bg-white sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-12 p-4 sm:p-6 rounded-md shadow-md">
        <h1 className="text-xl font-semibold">Login</h1>
        <small className="text-ash">
          Welcome back! Please enter your details
        </small>
        <form>
          <InputLabel
            labelValue={'Email'}
            inputType={'text'}
            inputName={'email'}
            placeHolder={'Email address'}
            handleInputChange={handleOnChange}
            inputValue={email}
          />

          <div className="relative mb-4">
            <InputLabel
              labelValue={'Password'}
              inputType={view ? 'text' : 'password'}
              inputName={'password'}
              placeHolder={'Enter password'}
              handleInputChange={handleOnChange}
              inputValue={password}
            />

            {view ? (
              <FiEye
                className="absolute bottom-3 right-3 cursor-pointer"
                onClick={handlePassView}
              />
            ) : (
              <FiEyeOff
                className="absolute bottom-3 right-3 cursor-pointer"
                onClick={handlePassView}
              />
            )}
          </div>

          <div className="mb-2 flex justify-between items-center">
            <Checkbox>
              <input type="checkbox" id="loginCheck" name="loginCheck" />
              <label
                className="termsChecked"
                id="loginCheck"
                htmlFor="loginCheck"
              >
                Remember me
              </label>
            </Checkbox>
            <Link className="forgetPassword text-skyblue" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <LoginBtn>
            <Button
              buttonText={'Sign In'}
              classnames="loginBtn"
              handleClick={handleSignIn}
              loading={loading}
            />
            <h2 className="hr-lines text-darkgray">or</h2>

            <button
              className="flex items-center flex-wrap justify-center w-full border border-darkgray px-2 py-2 rounded-sm bg-googleButton bg-lightash hover:bg-white"
              onClick={handleGoogle}
            >
              <div className="w-5 h-5 mr-2">
                <img className="w-fulls" src={GoogleLogo} alt="" />
              </div>
              Continue with Google
            </button>
          </LoginBtn>

          <div class="text-center mt-2">
            <span className="text-xs text-gray-400 font-semibold text-ash">
              Don't have account?
            </span>

            <Link to={'/signup'}>
              <p className="text-xs font-semibold text-skyblue ml-1">Sign up</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
