import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IDInput } from '../../components/identification/id-input';
import { IDQuestion } from '../../components/identification/id-question';



interface SignInValues {
  login: string;
  password: string;
}


export function Authorization() {

  const methods = useForm<SignInValues>({
    // mode: 'onTouched',
    mode: 'onChange',
    // reValidateMode: 'onBlur',
  });

  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = methods;

  const onSubmit = (data: SignInValues) => {
    // Send data to server
    console.log(data);
  };

  return (
    <div className="reg-auth__background">
      <h2 className='reg-auth__title'>Cleverland</h2>

      <FormProvider {...methods}>

      <form onSubmit={handleSubmit(onSubmit)} className="registration__form">

        <p className='registration__title'>Вход в личный кабинет</p>

        <IDInput placeholder="Логин " type="text" isError={!!errors.login} inputName="login" validate={() => true} errorMessage={errors.login?.message || ''}/>

        <IDInput placeholder='Пароль' type="password" isError={!!errors.password} inputName="password" validate={() => true} errorMessage={errors.password?.message || ''}/>

        <Link to="/forgot-pass" ><p className='authorization__forgot-question'> Забыли логин или пароль? </p></Link>

        <button className="button button__colored reg-auth__button" type="submit">Вход</button>

        <IDQuestion path="/registration" question="Нет учётной записи?" text="Регистрация"/>

      </form>
      
      </FormProvider>
    </div>
  )
}