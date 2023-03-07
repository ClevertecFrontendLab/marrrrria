import React, { useState } from 'react';

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Link } from 'react-router-dom';
import { IDInput } from '../../components/identification/id-input';
import { IDQuestion } from '../../components/identification/id-question';
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
  const methods = useForm<FormValues>({
    // mode: 'onTouched',
    mode: 'onChange',
    // reValidateMode: 'onBlur',
  });
  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = methods
  // const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = useForm<FormValues>({
  //   // mode: 'onTouched',
  //   mode: 'onChange',
  //   // reValidateMode: 'onBlur',
  // });
  console.log(watch("phone"))
  type InputEnum =  "login" | "password" | "name" | "surname" | "phone" | "email"

  const onNextStep = async (name1:InputEnum, name2:InputEnum) => {
    const isCorrect = await trigger([name1,name2])
    if(isCorrect) {
      setStep(step + 1);
    }
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

    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} className="registration__form">

    <p className='registration__title'>Регистрация</p>
    <span className='registration__steps'>{step} шаг из 3</span>

      {step === 1 && (
        <>
          <IDInput placeholder="Придумайте логин для входа" type="text" isError={!!errors.login} inputName="login" validate={validateLogin} errorMessage={errors.login?.message || "Используйте для логина латинский алфавит и цифры"}/>

          <IDInput placeholder='Пароль' type="password" isError={!!errors.password} inputName="password" validate={validatePassword} errorMessage={errors.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/>
          {/* <IDInput placeholder="Придумайте логин для входа" type="text" options={register} watch={watch} isError={!!errors.login} inputName="login" validate={validateLogin} errorMessage={errors.login?.message || "Используйте для логина латинский алфавит и цифры"} trigger={trigger}/>

          <IDInput placeholder='Пароль' type="password" options={register} watch={watch} isError={!!errors.password} inputName="password" validate={validatePassword} errorMessage={errors.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'} trigger={trigger}/> */}
            
          {/* <input placeholder="Придумайте логин для входа" className='reg-auth__input' type="text" {...register("login", { required: true, validate: validateLogin })} />
             <input placeholder="" className='reg-auth__input' type="password" {...register("password", { required: true, validate: validatePassword })} /> */}
        
          <button className="button button__colored reg-auth__button" type="button" onClick={() => onNextStep("login", "password")}>Следующий шаг</button>
        </>
      )}
      {step === 2 && (
        <>
          <IDInput placeholder='Имя' type="text" isError={!!errors.name} inputName="name" validate={validateName} errorMessage={errors.name?.message || ""} /> 
          <IDInput placeholder='Фамилия' type="text" isError={!!errors.surname} inputName="surname" validate={validateName} errorMessage={errors.surname?.message || ""}/>
          {/* <IDInput placeholder='Имя' type="text" options={register} watch={watch} isError={!!errors.name} inputName="name" validate={validateName} errorMessage={errors.name?.message || ""}  trigger={trigger}/> 
          <IDInput placeholder='Фамилия' type="text" options={register} watch={watch} isError={!!errors.surname} inputName="surname" validate={validateName} errorMessage={errors.surname?.message || ""} trigger={trigger} /> */}

          {/* Нужны ли здесь валидаторы */}

          {/* <input placeholder="Имя" className='reg-auth__input' type="text" {...register("name", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}
          {/* <input placeholder="Фамилия" className='reg-auth__input' type="text" {...register("surname", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}

          <button className="button button__colored reg-auth__button" type="button" onClick={() => onNextStep("name", "surname")}> Последний шаг </button>
        </>
      )}
      {step === 3 && (
        <>
          <IDInput placeholder='Номер телефона' type="tel" isError={!!errors.phone} inputName="phone" validate={validateName} errorMessage={errors.phone?.message || ""}/>
          <IDInput placeholder='E-mail' type="email" isError={!!errors.email} inputName="email" validate={validateName} errorMessage={errors.email?.message || ""}/> 
          {/* <IDInput placeholder='Номер телефона' type="tel" options={register} watch={watch} isError={!!errors.phone} inputName="phone" validate={validateName} errorMessage={errors.phone?.message || ""} trigger={trigger} />
          <IDInput placeholder='E-mail' type="email" options={register} watch={watch} isError={!!errors.email} inputName="email" validate={validateName} errorMessage={errors.email?.message || ""} trigger={trigger} />  */}
          
          {/* <input placeholder="Номер телефона" className='reg-auth__input' type="tel" {...register("phone", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}
          {/* <input placeholder="E-mail" className='reg-auth__input' type="email" {...register("email", { required: true })} /> */}
          {/* <span className='reg-auth__error-hint'> </span> */}

          <button className="button button__colored reg-auth__button" type="submit"> Зарегистрироваться </button>
        </>
      )}

      <IDQuestion path="/auth" question="Есть учётная запись?" text="Войти"/>
    </form>
    </FormProvider>
    </div>
  );

  
}