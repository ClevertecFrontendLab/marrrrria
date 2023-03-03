import { IDInput } from "./id-input";



// {register, validateHandler, hintMessage, errorMessage}
export function IDForm() {
  return (
    <>
      {/* <IDInput placeholder="Придумайте логин для входа" type="text" options={register} inputName="login" validate={validateHandler}/> */}
      {/* <span className='reg-auth__error-hint'> {HighlightValidate(errorMessage || {hintMessage})} </span> */}

      {/* <IDInput placeholder="Пароль" type="password" options={register} inputName="password" validate={validateHandler}/> */}
      {/* {errors.password && <span>This field is required</span>} */}
      {/* <span className='reg-auth__error-hint'> {HighlightValidate(errors.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой')} </span> */}
      {/* <button className="button button__colored reg-auth__button" type="button" onClick={onNextStep}>Next</button> */}
    </>
  )
}