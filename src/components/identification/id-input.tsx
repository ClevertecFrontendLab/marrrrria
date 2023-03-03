import { useState } from 'react';
import { UseFormRegister } from "react-hook-form";
import { HighlightValidate } from "./utils";

type InputEnum =  "login" | "password" | "name" | "surname" | "phone" | "email"

interface FormValues {
  login: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}

interface IDInputProps {
  placeholder: string,
  type: string,
  options: UseFormRegister<FormValues>
  watch : (value:string) => string,
  inputName: InputEnum,
  validate: (value:string) => string,
  errorMessage: string,
}

export function IDInput({placeholder, type, options, inputName, validate, errorMessage, watch}: IDInputProps) {

  const [isInputFocused, setInputFocused] = useState(false);

  function handleInputFocus() {
    setInputFocused(true);
  }

  function handleInputBlur() {
    const inputValue = watch(inputName)
    if (!inputValue.trim()) {
      setInputFocused(false);
    }
  }

  return (
    <>
    <div className='id-input__container'>
      <label htmlFor={inputName} className={`id-input__placeholder ${isInputFocused ? 'shifted' : ''}`}>
        {placeholder}
      </label>
      <input 
        id={inputName}
        className='reg-auth__input' 
        {...options(inputName, { required: true, validate: {validate} })}
        type={type}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        />
    </div>
    <span className='reg-auth__error-hint'> {HighlightValidate(errorMessage)} </span>
    </>
  )
}