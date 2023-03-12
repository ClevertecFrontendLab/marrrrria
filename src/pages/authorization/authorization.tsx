import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IDInput } from '../../components/identification/id-input';
import { IDQuestion } from '../../components/identification/id-question';
import { useSignInMutation } from '../../store/library/library.api';
import { ResponseWindow } from '../../components/identification/response-window';
import { useActions } from '../../hooks/actions';
import { Loader } from '../../components/loader';

interface SignInValues {
  identifier: string;
  password: string;
}

export function Authorization() {

  const methods = useForm<SignInValues>({
    mode: 'onChange',
    defaultValues : {
      identifier:'',
      password:'',
    }
  });

	const { setIsAuthorized } = useActions()

  const [signIn, { isLoading, error, data: dataFromServer }] = useSignInMutation();

  const { handleSubmit, formState: { errors }, watch, trigger } = methods;

  const [logInData, setLogInData] = useState({})

  const onSubmit = async (data: SignInValues) => {

    setLogInData(data)
    signIn(data)
  };

  useEffect(() => {
    if (dataFromServer?.jwt) {
      localStorage.setItem('JWT', dataFromServer.jwt)
      setIsAuthorized(true)
    }
  }, [dataFromServer?.jwt, setIsAuthorized]);

  return (
    <>
    {isLoading && <Loader/>}
    <div data-test-id="auth" className="reg-auth__background">
      <h2 className='reg-auth__title'>Cleverland</h2>

      <FormProvider {...methods}>

      {(!error || (error as any)?.status === 400) &&
      <form data-test-id="auth-form" onSubmit={handleSubmit(onSubmit)} className="registration__form">

        <div className='registration__title-block'>
          <p className='registration__title'>Bход в личный кабинет</p>
        </div>

        <IDInput placeholder="Логин " type="text" isError={!!errors.identifier || (error as any)?.status === 400} inputName="identifier" validate={() => true} errorMessage={errors.identifier?.message || ''}/>

        <IDInput placeholder='Пароль' type="password" isError={!!errors.password || (error as any)?.status === 400} inputName="password" validate={() => true} errorMessage={errors.password?.message || ''}/>

        {(error as any)?.status === 400 && <p className='authorization__error'><span>Неверный логин или пароль!</span> <br/> <span>Восстановить?</span></p>}
        {!error && <Link to="/forgot-pass" ><p className='authorization__forgot-question'>Забыли логин или пароль? </p></Link>}

        <button className="button button__colored reg-auth__button" type="submit">Вход</button>

        <IDQuestion path="/registration" question="Нет учётной записи?" text="Регистрация"/>

      </form>}

      {!!error && (error as any)?.status !== 400 && <ResponseWindow title='Вход не выполнен' message='Что-то пошло не так. Попробуйте ещё раз' buttonText='повторить' handler={() => signIn(logInData)}/>}

      </FormProvider>
    </div>

    </>
  )
}
