import React from "react"

function InputLabel({
  inputType,
  placeHolder,
  inputValue,
  inputName,
  handleInputChange,
  labelValue,
  className
}) {
  return (
    <div className={`${className ? className: 'my-2'}`}>
      <label htmlFor={inputName} className="text-sm font-bold text-dark">
        {labelValue}
      </label>
      <input
        className={`bg-gray-50 border border-darkgray text-gray-900 text-sm w-full outline-none p-2.5 focus:border focus:border-black focus:text-black transition duration-200 rounded-sm`}
        type={inputType}
        placeholder={placeHolder}
        id={inputName}
        value={inputValue}
        name={inputName}
        required
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  )
}

export default InputLabel
