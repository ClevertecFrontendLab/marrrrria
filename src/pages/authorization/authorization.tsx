import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IDInput } from '../../components/identification/id-input';
import { IDQuestion } from '../../components/identification/id-question';
import { useSignInMutation } from '../../store/library/library.api';
import { ResponseWindow } from '../../components/identification/response-window';



interface SignInValues {
  login: string;
  password: string;
}


export function Authorization() {

  const methods = useForm<SignInValues>({
    // mode: 'onTouched',
    mode: 'onChange',
    // reValidateMode: 'onBlur',
    defaultValues : {
      login:'',
      password:'',
    }
  });

  const [signIn, { isLoading, error, data: dataFromServer }] = useSignInMutation();

  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = methods;

  const onSubmit = async (data: SignInValues) => {
    // Send data to server
    // console.log(data);
    const body = {
      identifier: data.login,
      password: data.password,
    }
    signIn(body)
    // .then(data => localStorage.setItem('JWT', data.jwt))

    // if(response){localStorage.setItem('JWT', dataFromServer.jwt)}
  };

  // console.log(error)
  
  
  console.log(dataFromServer)
  return (
    <div className="reg-auth__background">
      <h2 className='reg-auth__title'>Cleverland</h2>

      <FormProvider {...methods}>
        {dataFromServer && localStorage.setItem('JWT', dataFromServer.jwt)}

      {(!error || (error as any)?.status === 400) &&
      <form onSubmit={handleSubmit(onSubmit)} className="registration__form">

        <div className='registration__title-block'>
          <p className='registration__title'>Bход в личный кабинет</p>
        </div>

        <IDInput placeholder="Логин " type="text" isError={!!errors.login || (error as any)?.status === 400} inputName="login" validate={() => true} errorMessage={errors.login?.message || ''}/>

        <IDInput placeholder='Пароль' type="password" isError={!!errors.password || (error as any)?.status === 400} inputName="password" validate={() => true} errorMessage={errors.password?.message || ''}/>

        {(error as any)?.status === 400 && <p className='authorization__error'><span>Неверный логин или пароль!</span> <br/> <span>Восстановить?</span></p>}
        {!error && <Link to="/forgot-pass" ><p className='authorization__forgot-question'>Забыли логин или пароль? </p></Link>}

        <button className="button button__colored reg-auth__button" type="submit">Вход</button>

        <IDQuestion path="/registration" question="Нет учётной записи?" text="Регистрация"/>

      </form>}

      {!!error && (error as any)?.status !== 400 && <ResponseWindow title='Вход не выполнен' message='Что-то пошло не так. Попробуйте ещё раз' buttonText='повторить' path="/auth"/>}
      {!!error && (error as any)?.status === 400 && <ResponseWindow title='Вход не выполнен' message='Что-то пошло не так. Попробуйте ещё раз' buttonText='повторить' path="/auth"/>}
      
      </FormProvider>
    </div>
  )
}