import React, { useState } from 'react';

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Link } from 'react-router-dom';
import { IDInput } from '../../components/identification/id-input';
import { IDQuestion } from '../../components/identification/id-question';
import { validateEmail, validateLogin, validateName, validatePassword, validatePhone } from '../../components/identification/utils';
import { useRegisterUserMutation } from '../../store/library/library.api';
import { ResponseWindow } from '../../components/identification/response-window';
import { Loader } from '../../components/loader';

interface FormValues {
  login: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export function Registration() {

  const [registrationData, setRegistrationData] = useState({})
  const [step, setStep] = useState<number>(1);

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues : {
      login:'',
      password:'',
      name:'',
      surname:'',
      phone:'',
      email:''
    }
  });
  const { handleSubmit, formState: { errors }, trigger, reset:resetForm } = methods

  type InputEnum =  "login" | "password" | "name" | "surname" | "phone" | "email"

  const onNextStep = async (name1:InputEnum, name2:InputEnum) => {
    const isCorrect = await trigger([name1,name2])
    if(isCorrect) {
      setStep(step + 1);
    }
  };

  const [registerUser, { isLoading, error, data, reset:resetRequest }] = useRegisterUserMutation();

  const backToRegistration = () => {
    setStep(1)
    resetForm()
    resetRequest()
  }

  const onSubmit = (data: FormValues) => {
    const body = {
      email: data.email,
      username: data.login,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      phone: data.phone,
    }
    
    setRegistrationData(body)

    registerUser(body)
  };

  const registrationForm = <FormProvider {...methods}>
  <form onSubmit={handleSubmit(onSubmit)} className="registration__form">
    <div className='registration__title-block'>
      <p className='registration__title'>Регистрация</p>
      <span className='registration__steps'>{step} шаг из 3</span>
    </div>

  

    {step === 1 && (
      <>
        <IDInput placeholder="Придумайте логин для входа" type="text" isError={!!errors.login} inputName="login" validate={validateLogin} errorMessage={errors.login?.message || "Используйте для логина латинский алфавит и цифры"}/>
        <IDInput placeholder='Пароль' type="password" isError={!!errors.password} inputName="password" validate={validatePassword} errorMessage={errors.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/>
        <button className="button button__colored reg-auth__button" type="button" onClick={() => onNextStep("login", "password")}>Следующий шаг</button>
      </>
    )}
    {step === 2 && (
      <>
        <IDInput placeholder='Имя' type="text" isError={!!errors.name} inputName="name" validate={validateName} errorMessage={errors.name?.message || ""} /> 
        <IDInput placeholder='Фамилия' type="text" isError={!!errors.surname} inputName="surname" validate={validateName} errorMessage={errors.surname?.message || ""}/>
        <button className="button button__colored reg-auth__button" type="button" onClick={() => onNextStep("name", "surname")}> Последний шаг </button>
      </>
    )}
    {step === 3 && (
      <>
        <IDInput placeholder='Номер телефона' type="tel" isError={!!errors.phone} inputName="phone" validate={validatePhone} errorMessage={errors.phone?.message || ""}/>
        <IDInput placeholder='E-mail' type="text" isError={!!errors.email} inputName="email" validate={validateEmail} errorMessage={errors.email?.message || ""}/> 
        <button className="button button__colored reg-auth__button" type="submit"> Зарегистрироваться </button>
      </>
    )}

    <IDQuestion path="/auth" question="Есть учётная запись?" text="Войти"/>
  </form>
  </FormProvider>


  return (
    <>
    {isLoading && <Loader/>}
    <div className="reg-auth__background">
    <h2 className='reg-auth__title'>Cleverland</h2>

    {!error && !data?.user && registrationForm}

    {(error as any)?.status === 400 && <ResponseWindow title='Данные не сохранились' message='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.' buttonText='назад к регистрации ' handler={backToRegistration}/>}

    {!!error && (error as any)?.status !== 400 && <ResponseWindow title='Данные не сохранились' message='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз' buttonText='повторить' handler={() => registerUser(registrationData)}/>} 

    {data?.user && <ResponseWindow title='Регистрация успешна' message='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль' buttonText='вход' path="/auth"/>}

    </div>
    </>
  ); 

  
}