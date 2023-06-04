import React, { useEffect, useState } from "react";
import Button from "../../components/shared/Button/button";
import InputLabel from "../../components/shared/inputLabel/inputLabel";
import { useMutation } from "@apollo/client";
// import mailIcon from "../../assets/images/error.png";
import { BsCheckCircle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CHANGE_PASSWORD } from "../../mutations/clientMutations";
import { Link, useParams } from "react-router-dom";

const ChangePassword = () => {
  const { passId } = useParams();
  const [password, setPassword] = useState({ one: "", two: "" });
  const [reset, setReset] = useState(false);
  const [view, setView] = useState({ one: false, two: false });

  const [changePassword, { loading, data, error }] = useMutation(
    CHANGE_PASSWORD,
    {
      variables: {
        password: password.one.trim(),
        resetId: passId,
      },
    }
  );

  useEffect(() => {
    // console.log(passId);
    if (data?.changePassword) {
      setReset(true);
    }
  }, [data]);

  const handlePassView = (idx) => {
    if (idx === 1) {
      setView({ ...view, one: !view.one });
    } else {
      setView({ ...view, two: !view.two });
    }
  };

  const handleOnChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password.one !== password.two) {
      alert("enter similar password");
    }
    changePassword()
  };

  return (
    <>
      {!reset ? (
        <div className="w-full my-36 bg-white">
          <div className="border w-11/12 mx-auto border-darkgray bg-white sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-12 p-6 pb-12 rounded-md shadow-md">
            <h1 className="text-xl font-semibold">Change Password</h1>
            <small className="text-ash mb-3 block">
              Input your new password
            </small>
            <form onSubmit={handleOnSubmit}>
              <div className="relative mb-4">
                <InputLabel
                  labelValue={"Password"}
                  inputType={view.one ? "text" : "password"}
                  inputName={"one"}
                  placeHolder={"Enter password"}
                  handleInputChange={handleOnChange}
                  inputValue={password.one}
                />

                {view.one ? (
                  <FiEye
                    className=" absolute bottom-5 right-3 cursor-pointer"
                    onClick={() => handlePassView(1)}
                  />
                ) : (
                  <FiEyeOff
                    className=" absolute bottom-5 right-3 cursor-pointer"
                    onClick={() => handlePassView(1)}
                  />
                )}
              </div>

              <div className="relative mb-4">
                <InputLabel
                  labelValue={"Confirm password"}
                  inputType={view.two ? "text" : "password"}
                  inputName={"two"}
                  placeHolder={"Confirm password"}
                  handleInputChange={handleOnChange}
                  inputValue={password.two}
                />

                {view.two ? (
                  <FiEye
                    className=" absolute bottom-5 right-3 cursor-pointer"
                    onClick={() => handlePassView(2)}
                  />
                ) : (
                  <FiEyeOff
                    className=" absolute bottom-5 right-3 cursor-pointer"
                    onClick={() => handlePassView(2)}
                  />
                )}
              </div>

              <div className="mt-7">
                <Button buttonText={"Confirm"} loading={loading} />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full my-36 bg-white">
          <div className="border flex flex-col w-11/12 mx-auto border-darkgray bg-white sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-12 p-6 pb-12 rounded-md shadow-md">
            <h1 className="text-xl font-semibold text-center mb-6">
              Password changed successful
            </h1>

            <div className="w-32 object-cover m-auto flex items-center justify-center">
              <BsCheckCircle className="text-6xl text-[green]" />
            </div>

            <small className="text-ash text-center m-auto block mt-6">
              click the button below to log into your account
            </small>

            <Link
              to={"/login"}
              className="text-white bg-black py-2 px-7 mt-8 inline-block m-auto"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
