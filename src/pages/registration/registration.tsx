import React, { useState } from 'react';

import { useForm, FormProvider } from 'react-hook-form';
import { IDInput } from '../../components/identification/id-input';
import { IDQuestion } from '../../components/identification/id-question';
import { validateEmail, validateLogin, validateName, validatePassword, validatePhone } from '../../components/identification/utils';
import { useRegisterUserMutation } from '../../store/library/library.api';
import { ResponseWindow } from '../../components/identification/response-window';
import { Loader } from '../../components/loader';

interface FormValues {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export function Registration() {

  const [registrationData, setRegistrationData] = useState({})
  const [step, setStep] = useState<number>(1);

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues : {
      username:'',
      password:'',
      firstName:'',
      lastName:'',
      phone:'',
      email:''
    }
  });
  const { handleSubmit, formState: { errors, isValid }, trigger, reset:resetForm } = methods
  type InputEnum =  "username" | "password" | "firstName" | "lastName" | "phone" | "email"

  const onNextStep = async (name1:InputEnum, name2:InputEnum) => {
    const isCorrect = await trigger([name1,name2])
    if(isCorrect) {
      setStep(step + 1);
    }
  };

  const [registerUser, { isSuccess, isLoading, error, data, reset:resetRequest }] = useRegisterUserMutation();

  const backToRegistration = () => {
    setStep(1)
    resetForm()
    resetRequest()
  }

  const onSubmit = (data: FormValues) => {
    setRegistrationData(data)
    registerUser(data)
  };

  const registrationForm = <FormProvider {...methods}>
  <form data-test-id="register-form" onSubmit={handleSubmit(onSubmit)} className="registration__form">
    <div className='registration__title-block'>
      <p className='registration__title'>Регистрация</p>
      <span className='registration__steps'>{step} шаг из 3</span>
    </div>



    {step === 1 && (
      <>
        <IDInput placeholder="Придумайте логин для входа" type="text" isError={!!errors.username} inputName="username" validate={validateLogin} errorMessage={errors.username?.message || "Используйте для логина латинский алфавит и цифры"}/>
        <IDInput placeholder='Пароль' type="password" isError={!!errors.password} inputName="password" validate={validatePassword} errorMessage={errors.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/>
        <button disabled={!isValid} className="button button__colored reg-auth__button" type="button" onClick={() => onNextStep("username", "password")}>Следующий шаг</button>
      </>
    )}
    {step === 2 && (
      <>
        <IDInput placeholder='Имя' type="text" isError={!!errors.firstName} inputName="firstName" validate={validateName} errorMessage={errors.firstName?.message || ""} />
        <IDInput placeholder='Фамилия' type="text" isError={!!errors.lastName} inputName="lastName" validate={validateName} errorMessage={errors.lastName?.message || ""}/>
        <button disabled={!isValid} className="button button__colored reg-auth__button" type="button" onClick={() => onNextStep("firstName", "lastName")}> Последний шаг </button>
      </>
    )}
    {step === 3 && (
      <>
        <IDInput placeholder='Номер телефона' type="tel" isError={!!errors.phone} inputName="phone" validate={validatePhone} errorMessage={errors.phone?.message || "В формате +375 (xx) xxx-xx-xx"}/>
        <IDInput placeholder='E-mail' type="text" isError={!!errors.email} inputName="email" validate={validateEmail} errorMessage={errors.email?.message || ""}/>
        <button disabled={!isValid} className="button button__colored reg-auth__button" type="submit"> Зарегистрироваться </button>
      </>
    )}

    <IDQuestion path="/auth" question="Есть учётная запись?" text="Войти"/>
  </form>
  </FormProvider>


  return (
    <>
    {isLoading && <Loader/>}
    <div data-test-id="auth" className="reg-auth__background">
    <h2 className='reg-auth__title'>Cleverland</h2>

    {!error && !isSuccess && registrationForm}

    {(error as any)?.status === 400 && <ResponseWindow title='Данные не сохранились' message='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.' buttonText='назад к регистрации ' handler={backToRegistration}/>}

    {!!error && (error as any)?.status !== 400 && <ResponseWindow title='Данные не сохранились' message='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз' buttonText='повторить' handler={() => registerUser(registrationData)}/>}

    {isSuccess && <ResponseWindow title='Регистрация успешна' message='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль' buttonText='вход' path="/auth"/>}

    </div>
    </>
  );


}
