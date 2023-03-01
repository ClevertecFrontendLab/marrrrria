import React, { useState } from 'react';

import { useForm, SubmitHandler } from "react-hook-form";

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


  const [step, setStep] = useState<number>(1);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    // mode: 'onTouched',
    mode: 'onBlur',

    // reValidateMode: 'onTouched',
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
          <input placeholder="Придумайте логин для входа" className='reg-auth__input' type="text" {...register("login", { required: true })} />
          {/* {errors.login && <span>This field is required</span>} */}
          {/* {errors.login} */}
          <span className='reg-auth__error-hint'> Используйте для логина латинский алфавит и цифры </span>
          {/* <ValidateHint value={} validate={}/> */}
          <input placeholder="Пароль" className='reg-auth__input' type="password" {...register("password", { required: true, pattern: /^[A-Za-z]+$/i })} />
          {/* {errors.password && <span>This field is required</span>} */}
          <span className='reg-auth__error-hint'> Пароль не менее 8 символов, с заглавной буквой и цифрой </span>
          <button className="button button__colored reg-auth__button" type="button" onClick={onNextStep}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <input placeholder="Имя" className='reg-auth__input' type="text" {...register("name", { required: true })} />
          {/* {errors.name && <span>This field is required</span>} */}
          <span className='reg-auth__error-hint'> </span>
          <input placeholder="Фамилия" className='reg-auth__input' type="text" {...register("surname", { required: true })} />
          {/* {errors.surname && <span>This field is required</span>} */}
          <span className='reg-auth__error-hint'> </span>
          <button className="button button__colored reg-auth__button" type="button" onClick={onNextStep}>Next</button>
        </>
      )}
      {step === 3 && (
        <>
          <input placeholder="Номер телефона" className='reg-auth__input' type="tel" {...register("phone", { required: true })} />
          {/* {errors.phone && <span>This field is required</span>} */}
          <span className='reg-auth__error-hint'> </span>
          <input placeholder="E-mail" className='reg-auth__input' type="email" {...register("email", { required: true })} />
          {/* {errors.email && <span>This field is required</span>} */}
          <span className='reg-auth__error-hint'> </span>

          <button className="button button__colored reg-auth__button" type="submit">Submit</button>
        </>
      )}
    </form>
    </div>
  );

  
}