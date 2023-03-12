import { useState, useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask'
import { HighlightValidate } from './utils';
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
  inputName: string,
  validate: (value:string) => string | boolean,
  isError: boolean,
  errorMessage: string,
}

export function IDInput({placeholder, type, inputName, validate, isError, errorMessage}: IDInputProps) {

  const { register:options, watch, trigger, control } = useFormContext();

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

  const inputParams = ( onChange:any, onBlur:any, value:any ) => ({
      id:inputName,
      className:'reg-auth__input',
      type:!isVisible ? type : "text",
      onBlur: () => {
        onBlur();
        handleInputBlur();
      },
      onFocus: handleInputFocus,
      onChange: (e:any) => {
        onChange(e);
        trigger(inputName);
      },
      value,
      style:styles.input,
    })

  return (
    <>
    <div className='id-input__container'>
      <label htmlFor={inputName} className={`id-input__placeholder ${isPlaceholderFocused ? 'shifted' : ''}`}>
        {placeholder}
      </label>

      <Controller
        name={inputName}
        control={control}
        rules={{ required: "Поле не может быть пустым", validate: { validate } }}
        render={({ field: { onChange, onBlur, value } }) => (
          inputName === "phone" ?
            <MaskedInput
              mask={BelarusPhoneNumberMask}
              guide={isInputFocused}
              pipe={(value) => value.replace(/_/g, 'x')}
              {...inputParams( onChange, onBlur, value)}
            /> :
            <input
              {...inputParams( onChange, onBlur, value)}
            />
            )}
      />

        {inputName === "password" && <PasswordIcons isError={isError || !watch(inputName)} isVisible={isVisible} showPassword={showPassword}/>}
        {inputName === "repeatPassword" && <PasswordIcons isError={true} isVisible={isVisible} showPassword={showPassword}/>}

    </div>

    {!isInputFocused && isError ?
    <span data-test-id="hint" style={{color:'#F42C4F'}} className='reg-auth__error-hint'> {HighlightValidate(errorMessage)} </span>
    :
    <span data-test-id="hint" className='reg-auth__error-hint'> {HighlightValidate(errorMessage)} </span>
    }
    </>
  )
}
