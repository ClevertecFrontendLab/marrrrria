import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { IDInput } from '../../components/identification/id-input';
import { IDQuestion } from '../../components/identification/id-question';
import { validateEmail, validateEqualPassword, validatePassword } from '../../components/identification/utils';
import { useResetPasswordMutation, useSendEmailMutation } from '../../store/library/library.api';
import { ResponseWindow } from '../../components/identification/response-window';
import { Loader } from '../../components/loader';

interface FormValues {
  email: string;
  password: string,
  passwordConfirmation: string,
}

export function ForgotPassword() {

  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  });

  const [passwordsData, setPasswordsData] = useState({})
  const { handleSubmit, formState: { errors }, watch } = methods
  const [ sendEmail, { isLoading:isLoadingEmail, error: errorEmail, data: dataEmail } ] = useSendEmailMutation()
  const [ resetPassword, { isLoading:isLoadingPasswords, error: errorPasswords, data: dataPasswords } ] = useResetPasswordMutation()


  function onEmailSubmit(data: FormValues) {
    const body = {
      email: data.email,
    }
    sendEmail(body)
  }

  function onPasswordSubmit(data: FormValues) {
    const body = {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      code,
    }
    setPasswordsData(body)
    resetPassword(body)
  }

  return(
    <>

    {(isLoadingEmail || isLoadingPasswords) && <Loader/>}

    <div className="reg-auth__background">
      <h2 className='reg-auth__title'>Cleverland</h2>

      { (!code && !dataEmail?.ok) &&
      <FormProvider {...methods}>
      <form data-test-id="send-email-form" onSubmit={handleSubmit(onEmailSubmit)} className="registration__form forgot-password-form">

        <Link to="/auth" className='form__sign-in-link'>
          <span className="ico ico_sign-in-arrow-left"> </span>
          <span> вход в личный кабинет </span>
        </Link>

        <div className='registration__title-block'>
          <p className='registration__title'>Восстановление пароля</p>
        </div>

        <IDInput placeholder="Email " type="email"  isError={!!errors?.email} inputName="email" validate={validateEmail} errorMessage={ errors?.email?.message || ''}/>
        <span className='reg-auth__error-hint'>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</span>

        <button className="button button__colored reg-auth__button" type="submit">Восстановить</button>

        <IDQuestion path="/registration" question="Нет учётной записи?" text="Регистрация"/>

      </form>
      </FormProvider> }

      {dataEmail?.ok && <ResponseWindow title='Письмо выслано' message="Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля" />}


    {code && !errorPasswords && !dataPasswords &&
    <FormProvider {...methods}>
    <form data-test-id="reset-password-form" onSubmit={handleSubmit(onPasswordSubmit)} className="registration__form">

      <div className='registration__title-block'>
        <p className='registration__title'>Восстановление пароля </p>
      </div>

        <IDInput placeholder="Новый пароль" type="password" isError={!!errors.password} inputName="password" validate={(value) => validatePassword(value)} errorMessage={errors.password?.message as string || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/>
        <IDInput placeholder="Повторите пароль" type="password" isError={!!errors.passwordConfirmation} inputName="passwordConfirmation" validate={(value) => validateEqualPassword(value, watch("password"))} errorMessage={errors.passwordConfirmation?.message as string || ''}/>

        <button className="button button__colored reg-auth__button" type="submit">Сохранить изменения</button>

        <IDQuestion path="" question="После сохранения войдите в библиотеку, используя новый пароль" text=""/>


      </form>
      </FormProvider>}

      {dataPasswords && <ResponseWindow title='Новые данные сохранены' message="Зайдите в личный кабинет, используя свои логин и новый пароль" buttonText='вход' path='/auth'/>}
      {errorPasswords && <ResponseWindow title='Данные не сохранились' message="Что-то пошло не так. Попробуйте ещё раз" buttonText='повторить' handler={() => resetPassword(passwordsData)} />}

    </div>
    </>
  )
}
