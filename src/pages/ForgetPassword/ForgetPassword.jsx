import React, { useEffect, useState } from "react";
import Button from "../../components/shared/Button/button";
import InputLabel from "../../components/shared/inputLabel/inputLabel";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../mutations/clientMutations";
import mailIcon from "../../assets/images/error.png";

const ForgetPassword = () => {
  const [contact, setContact] = useState({ email: "" });
  const [reset, setReset] = useState(false);

  const { email } = contact;

  const [resetPassword, { loading, data, error }] = useMutation(
    FORGOT_PASSWORD,
    {
      variables: {
        email: email,
        callbackUrl: process.env.REACT_APP_URL,
      },
    }
  );

  useEffect(() => {
    // console.log(process.env.REACT_APP_URL);
    // console.log(data, error);
    if (data?.resetPassword) {
      setReset(true);
    }
  }, [data]);

  const handleOnChange = (e) => {
    setContact({ contact, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // resetPassword(email, process.env.REACT_APP_URL)
    resetPassword();
  };

  return (
    <>
      {!reset ? (
        <div className="w-full my-36 bg-white">
          <div className="border w-11/12 mx-auto border-darkgray bg-white sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-12 p-6 pb-12 rounded-md shadow-md">
            <h1 className="text-xl font-semibold">Reset Password</h1>
            <small className="text-ash">
              We will send you an email to reset your password.
            </small>
            <form onSubmit={handleOnSubmit}>
              <InputLabel
                labelValue={"Email"}
                inputType={"text"}
                inputName={"email"}
                placeHolder={"Email address"}
                inputValue={email}
                handleInputChange={handleOnChange}
              />
              <div className="mt-5">
                <Button buttonText={"Confirm"} loading={loading} />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full my-36 bg-white">
          <div className="border w-11/12 mx-auto border-darkgray bg-white sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-12 p-6 pb-12 rounded-md shadow-md">
            <h1 className="text-xl font-semibold text-center mb-6">
              Password reset successful
            </h1>
            <div className="w-32 object-cover m-auto">
              <img src={mailIcon} alt="" className="h-full w-full" />
            </div>
            <small className="text-ash text-center m-auto block mt-6">
              please click the link from your email to reset password
            </small>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
