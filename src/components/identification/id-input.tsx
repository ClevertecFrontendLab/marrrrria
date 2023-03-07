// import { useState, useCallback } from 'react';
// import { UseFormRegister, UseFormTrigger } from "react-hook-form";
// import MaskedInput from 'react-text-mask'
// import { HighlightValidate } from "./utils";
// import { PasswordIcons } from './password-icons';


// type InputEnum =  "login" | "password" | "name" | "surname" | "phone" | "email"

// interface FormValues {
//   login: string;
//   password: string;
//   name: string;
//   surname: string;
//   phone: string;
//   email: string;
// }

// interface IDInputProps {
//   placeholder: string,
//   type: string,
//   options: UseFormRegister<FormValues>
//   watch : (value:string) => string,
//   inputName: InputEnum,
//   validate: (value:string) => string | boolean,
//   isError: boolean,
//   errorMessage: string,
//   trigger: UseFormTrigger<FormValues>,
// }

// export function IDInput({placeholder, type, options, inputName, validate, isError, errorMessage, watch, trigger}: IDInputProps) {

//   const [isPlaceholderFocused, setPlaceholderFocused] = useState(false);
//   const [isInputFocused, setInputFocused] = useState(false)

//   const [isVisible, setIsVisible] = useState(false)

//   const handleInputFocus = useCallback(() =>{
//     setPlaceholderFocused(true);
//     setInputFocused(true)
//   },[]
//   ) 

//   const handleInputBlur = useCallback(async () => {
//     console.log('scacsdcsd')
//     const inputValue = watch(inputName)
//     if (!inputValue.trim()) {
//       setPlaceholderFocused(false);
//     }
//     await trigger(inputName)
//     setInputFocused(false)
//   },[inputName, trigger, watch]
//   ) 

//   const showPassword = useCallback(() => {
//     setIsVisible(prev => !prev)
//   },[]) 


//   console.log(isError,isPlaceholderFocused, inputName)

//   const styles = {
//     input: {
//       borderColor : !isInputFocused && isError ? '#F42C4F' : '#BFC4C9',
//     }
//   }


//   const BelarusPhoneNumberMask = [
//     "+",
//     "3",
//     "7",
//     "5",
//     " ",
//     "(",
//     /(2|3|4)/,
//     /(5|9|3|4)/,
//     ")",
//     " ",
//     /\d/,
//     /\d/,
//     /\d/,
//     "-",
//     /\d/,
//     /\d/,
//     "-",
//     /\d/,
//     /\d/,
//   ];

//   const phoneParams = inputName === "phone" ? {
//     mask:BelarusPhoneNumberMask,
//     guide:true,
//     pipe: (value:string) => value.replace(/_/g, 'x')
//   } :
//   {}

//   console.log(watch("phone"))

//   return (
//     <>
//     <div className='id-input__container'>
//       <label htmlFor={inputName} className={`id-input__placeholder ${isPlaceholderFocused ? 'shifted' : ''}`}>
//         {placeholder}
//       </label>

//       {inputName === "phone" ? 
//         <MaskedInput
//         id={inputName}
//         className='reg-auth__input'
//         mask={BelarusPhoneNumberMask}
//         guide={isInputFocused}
//         pipe={(value) => value.replace(/_/g, 'x')} 
//         {...options(inputName, { required: "Поле не может быть пустым", validate: {validate} })}
//         type={!isVisible ? type : "text"}
//         onBlur={handleInputBlur}
//         onFocus={handleInputFocus}
//       />
//         :
//         <input 
//         id={inputName}
//         className='reg-auth__input' 
//         {...options(inputName, { required: "Поле не может быть пустым", validate: {validate} })}
//         type={!isVisible ? type : "text"}
//         onBlur={handleInputBlur}
//         onFocus={handleInputFocus}
//         style={styles.input}
//         />
        
//       }

//         {inputName === "password" && <PasswordIcons isError={isError || !watch(inputName)} isVisible={isVisible} showPassword={showPassword}/>}
//     </div>

//     {!isInputFocused && isError ?
//     <span style={{color:'#F42C4F'}} className='reg-auth__error-hint'> {HighlightValidate(errorMessage)} </span>
//     :
//     <span className='reg-auth__error-hint'> {HighlightValidate(errorMessage)} </span>
//     }
//     </>
//   )
// }


import { useState, useCallback } from 'react';
import { useFormContext, UseFormRegister, UseFormTrigger } from "react-hook-form";
import MaskedInput from 'react-text-mask'
import { HighlightValidate } from "./utils";
import { PasswordIcons } from './password-icons';

type InputEnum =  "login" | "password" | "name" | "surname" | "phone" | "email" | "repeatPassword"

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
  inputName: InputEnum,
  validate: (value:string) => string | boolean,
  isError: boolean,
  errorMessage: string,
}

export function IDInput({placeholder, type, inputName, validate, isError, errorMessage}: IDInputProps) {

  const { register:options, watch, trigger } = useFormContext();

  const [isPlaceholderFocused, setPlaceholderFocused] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false)

  const [isVisible, setIsVisible] = useState(false)

  const handleInputFocus = useCallback(() =>{
    setPlaceholderFocused(true);
    setInputFocused(true)
  },[]
  ) 

  const handleInputBlur = useCallback(async () => {
    const inputValue = watch(inputName)
    if (!inputValue.trim()) {
      setPlaceholderFocused(false);
    }
    await trigger(inputName)
    setInputFocused(false)
  },[inputName, trigger, watch]
  ) 

  const showPassword = useCallback(() => {
    setIsVisible(prev => !prev)
  },[]) 

  const styles = {
    input: {
      borderColor : !isInputFocused && isError ? '#F42C4F' : '#BFC4C9',
    }
  }


  const BelarusPhoneNumberMask = [
    "+",
    "3",
    "7",
    "5",
    " ",
    "(",
    /(2|3|4)/,
    /(5|9|3|4)/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];

  const phoneParams = inputName === "phone" ? {
    mask:BelarusPhoneNumberMask,
    guide:true,
    pipe: (value:string) => value.replace(/_/g, 'x')
  } :
  {}

  return (
    <>
    <div className='id-input__container'>
      <label htmlFor={inputName} className={`id-input__placeholder ${isPlaceholderFocused ? 'shifted' : ''}`}>
        {placeholder}
      </label>

      {inputName === "phone" ? 
        <MaskedInput
        id={inputName}
        className='reg-auth__input'
        mask={BelarusPhoneNumberMask}
        guide={isInputFocused}
        pipe={(value) => value.replace(/_/g, 'x')} 
        {...options(inputName, { required: "Поле не может быть пустым", validate: {validate} })}
        type={!isVisible ? type : "text"}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
        :
        <input 
        id={inputName}
        className='reg-auth__input' 
        {...options(inputName, { required: "Поле не может быть пустым", validate: {validate} })}
        type={!isVisible ? type : "text"}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        style={styles.input}
        />
        
      }

        {inputName === "password" && <PasswordIcons isError={isError || !watch(inputName)} isVisible={isVisible} showPassword={showPassword}/>}
    </div>

    {!isInputFocused && isError ?
    <span style={{color:'#F42C4F'}} className='reg-auth__error-hint'> {HighlightValidate(errorMessage)} </span>
    :
    <span className='reg-auth__error-hint'> {HighlightValidate(errorMessage)} </span> 
    }
    </>
  )
}