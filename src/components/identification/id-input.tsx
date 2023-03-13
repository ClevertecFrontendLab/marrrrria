import { useState, useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask'
import { HighlightValidate } from './utils';
import { PasswordIcons } from './password-icons';

type InputEnum =  "username" | "password" | "firstName" | "lastName" | "phone" | "email" | "passwordConfirmation"

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
  withoutCheckmark?: boolean,
  hint?: string,
  focusFunction?: (value:boolean) => void
}

export function IDInput({placeholder, type, inputName, validate, isError, errorMessage, withoutCheckmark = false, hint='', focusFunction = undefined}: IDInputProps) {

  const { watch, trigger, control, formState:{errors} } = useFormContext();

  const [isPlaceholderFocused, setPlaceholderFocused] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false)

  const [isVisible, setIsVisible] = useState(false)

  const handleInputFocus = useCallback(() =>{
    setPlaceholderFocused(true);
    setInputFocused(true)
    if (focusFunction && typeof focusFunction === 'function'){
        focusFunction(true)
    }
  },[focusFunction]
  )

  const handleInputBlur = useCallback(async () => {
    const inputValue = watch(inputName)
    if (!inputValue.trim()) {
      setPlaceholderFocused(false);
    }
    await trigger(inputName)
    setInputFocused(false)
    if (focusFunction && typeof focusFunction === 'function'){
        focusFunction(false)
    }
  },[inputName, trigger, watch, focusFunction]
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
      name:inputName,
      id:inputName,
    //   autoComplete:'new-password',
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
        rules={{ required:true, validate: { validate } }}
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

        {(inputName === "password" && watch("password")) && <PasswordIcons isError={isError || !watch(inputName)} isVisible={isVisible} showPassword={showPassword} withoutCheckmark={withoutCheckmark}/>}
        {(inputName === "passwordConfirmation" && watch("passwordConfirmation"))&& <PasswordIcons isError={true} isVisible={isVisible} showPassword={showPassword}/>}

    </div>

    {
    isInputFocused && inputName === "passwordConfirmation" ? <span data-test-id="hint" className='reg-auth__error-hint'> </span>:
    !isInputFocused && !watch(inputName) && isError ? <span data-test-id="hint" style={{color:'#F42C4F'}} className='reg-auth__error-hint'> Поле не может быть пустым </span> :
    !isInputFocused && isError ?
    <span data-test-id="hint" style={{color:'#F42C4F'}} className='reg-auth__error-hint'> {HighlightValidate(errorMessage, isInputFocused)} </span>
    :
    <span data-test-id="hint" className='reg-auth__error-hint'> {HighlightValidate(errorMessage, isInputFocused)} </span>
    }
    </>
  )
}
