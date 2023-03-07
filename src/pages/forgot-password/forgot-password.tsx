import { useLocation, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { IDInput } from "../../components/identification/id-input";
import { IDQuestion } from '../../components/identification/id-question';
import { validateChangedPassword, validateEqualPassword } from '../../components/identification/utils';




export function ForgotPassword() {

  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const methods = useForm({
    mode: 'onChange',
  });
  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = methods

  return(
    <div className="reg-auth__background">
      <h2 className='reg-auth__title'>Cleverland</h2>

      { !code && 
      <FormProvider {...methods}>
      <form className="registration__form">
      <p className='registration__title'>Восстановление пароля</p>

        <IDInput placeholder="Email " type="email"  isError={false} inputName="email" validate={() => true} errorMessage='На это email  будет отправлено письмо с инструкциями по восстановлению пароля'/>

        <button className="button button__colored reg-auth__button" type="submit">Восстановить</button>

        <IDQuestion path="/registration" question="Нет учётной записи?" text="Регистрация"/> 

      </form>
      </FormProvider> }


      {/* Форма по ссылке */}

    {code && <form>
      <p className='registration__title'>Восстановление пароля </p>

        <IDInput placeholder="Новый пароль" type="password" isError={!!errors.password} inputName="password" validate={validateChangedPassword} errorMessage={errors.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/>
        <IDInput placeholder="Повторите пароль" type="password" isError={!!errors.repeatPassword} inputName="repeatPassword" validate={validateEqualPassword} errorMessage={errors.repeatPassword?.message || ''}/>

        <button className="button button__colored reg-auth__button" type="submit">Сохранить изменения</button>

        <IDQuestion path="" question="После сохранения войдите в библиотеку, используя новый пароль" text=""/> 


      </form> }

    </div>
  )
}