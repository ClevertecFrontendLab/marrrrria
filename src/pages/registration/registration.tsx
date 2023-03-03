import React, { useState } from 'react';

import { useForm, SubmitHandler } from "react-hook-form";
import { IDInput } from '../../components/identification/id-input';
import { validateLogin, validateName, validatePassword } from '../../components/identification/utils';

type Inputs = {
  login: string,
  password: string,
  name: string,
  surname: string,
  phone: string,
  email: string,

};

interface FormValues {
  login: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}


function HighlightValidate (text:string) {
  return text.split('/').map((item, index) =>
    index%2 ? <span key={item} style={{color:'red'}}> {item} </span> : item
  )
}


export function Registration() {

  // const [step, setStep] = useState(1)
  // const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  // console.log(watch("login")) // watch input value by passing the name of it

  // return (
  //   /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     {/* register your input into the hook by invoking the "register" function */}
  //     <input placeholder="Придумайте логин для входа" {...register("login", { required: true })} />
      
  //     {/* include validation with required or other standard HTML validation rules */}
  //     <input placeholder="Пароль" {...register("password", )} />
  //     {/* errors will return when field validation fails  */}
  //     {errors.password && <span>This field is required</span>}
      
  //     <input type="submit" />
  //   </form>
  // );





  // return (
  //   <div className="reg-auth__background">
  //     <h2 className='reg-auth__title'>Cleverland</h2>
  //     <form onSubmit={handleSubmit(onSubmit)}>

  //       <p className='registration__title'>Регистрация</p>
  //       <span>{step} шаг из 3</span>

  //       {step === 1 && 
  //       <React.Fragment>
  //         <input placeholder="Придумайте логин для входа" {...register("login", { required: true })} />
  //         <input placeholder="Пароль" type="password" {...register("password", { required: true, pattern: /^[A-Za-z]+$/i })} />
  //         <button type="button" onClick={() => setStep(2)}>Следующий шаг</button>
  //     {errors.password && <span>This field is required</span>}
          
  //       </React.Fragment>}

  //       {step === 2 && 
  //       <React.Fragment>
  //         <input placeholder="Имя" {...register("name", { required: true })} />
  //         <input placeholder="Фамилия" {...register("surname", { required: true })} />
  //         <button type="button" onClick={() => setStep(3)}>Последний шаг</button>

  //       </React.Fragment>}

  //       {step === 3 && 
  //       <React.Fragment>
  //         <input placeholder="Номер телефона" {...register("phone", { required: true })}/>
  //         <input placeholder="E-mail" {...register("email", { required: true })}/>
  //         <button type="submit">Зарегистрироваться</button>
  //       </React.Fragment>}

  //     </form>
  //   </div>
  // )

  // const validatePassword = (value: string) => {
  //   let isNumbers = !/\d+/.test(value)
  //   let isBigLetter = !/[A-Z]+/.test(value)
  //   let numLetters = value.split("").length < 8
  //   if (!/^[A-Za-z0-9]+$/.test(value)) {
  //     isNumbers = true
  //     isBigLetter = true
  //     numLetters = true
  //   }

  //   const JSXError = `Пароль ${numLetters ? '/не менее 8 символов/' : 'не менее 8 символов'},   ${isBigLetter ? "/с заглавной буквой/" : "с заглавной буквой"} и ${isNumbers ? "/и цифрой/" : "и цифрой"}`

  //   return JSXError
  // };

  // const validateLogin = (value: string) => {
  //   let isNumbers = !/\d+/.test(value)
  //   let isLatinLetters = !/[A-Za-z]+/.test(value)
  //   if (!/^[A-Za-z0-9]+$/.test(value)) {
  //     isNumbers = true
  //     isLatinLetters = true
  //   }

  //   const JSXError = `Используйте для логина ${isLatinLetters ? "/латинский алфавит/" : "латинский алфавит"} и ${isNumbers ? "/цифры/" : "цифры"}`

  //   return JSXError
  // };

  const [step, setStep] = useState<number>(1);
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<FormValues>({
    // mode: 'onTouched',
    mode: 'onChange',

    reValidateMode: 'onChange',
  });

  const onNextStep = () => {
    setStep(step + 1);
  };

  const onPrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: FormValues) => {
    // Send data to server
    console.log(data);
  };

  console.log(errors)

  return (
    <div className="reg-auth__background">
    <h2 className='reg-auth__title'>Cleverland</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="registration__form">

    <p className='registration__title'>Регистрация</p>
    <span className='registration__steps'>{step} шаг из 3</span>

      {step === 1 && (
        <>
          <IDInput placeholder="Придумайте логин для входа" type="text" options={register} watch={watch} inputName="login" validate={validateLogin} errorMessage={errors.login?.message || "Используйте для логина латинский алфавит и цифры"}/>

          <IDInput placeholder='Пароль' type="password" options={register} watch={watch} inputName="password" validate={validatePassword} errorMessage={errors.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/>
            
          {/* <input placeholder="Придумайте логин для входа" className='reg-auth__input' type="text" {...register("login", { required: true, validate: validateLogin })} />
             <input placeholder="" className='reg-auth__input' type="password" {...register("password", { required: true, validate: validatePassword })} /> */}
        
          <button className="button button__colored reg-auth__button" type="button" onClick={onNextStep}>Следующий шаг</button>
        </>
      )}
      {step === 2 && (
        <>
          <IDInput placeholder='Имя' type="text" options={register} watch={watch} inputName="name" validate={validateName} errorMessage={errors.name?.message || ""} /> 
          <IDInput placeholder='Фамилия' type="text" options={register} watch={watch} inputName="surname" validate={validateName} errorMessage={errors.surname?.message || ""} />

          {/* Нужны ли здесь валидаторы */}

          {/* <input placeholder="Имя" className='reg-auth__input' type="text" {...register("name", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}
          {/* <input placeholder="Фамилия" className='reg-auth__input' type="text" {...register("surname", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}

          <button className="button button__colored reg-auth__button" type="button" onClick={onNextStep}>Next</button>
        </>
      )}
      {step === 3 && (
        <>
          <IDInput placeholder='Номер телефона' type="tel" options={register} watch={watch} inputName="phone" validate={validateName} errorMessage={errors.phone?.message || ""} />
          <IDInput placeholder='E-mail' type="email" options={register} watch={watch} inputName="email" validate={validateName} errorMessage={errors.email?.message || ""} /> 
          
          {/* <input placeholder="Номер телефона" className='reg-auth__input' type="tel" {...register("phone", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}
          {/* <input placeholder="E-mail" className='reg-auth__input' type="email" {...register("email", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}

          <button className="button button__colored reg-auth__button" type="submit">Submit</button>
        </>
      )}
    </form>
    </div>
  );

  
}