import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { IDInput } from "../../components/identification/id-input";
import { IDQuestion } from '../../components/identification/id-question';
import { validateChangedPassword, validateEmail, validateEqualPassword, validatePassword } from '../../components/identification/utils';




export function ForgotPassword() {

  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");
  const validateEqualPasswordMemo = useMemo(() => validateEqualPassword, []);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    }
  });
  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = methods

  return(
    <div className="reg-auth__background">
      <h2 className='reg-auth__title'>Cleverland</h2>

      { !code && 
      <FormProvider {...methods}>
      <form className="registration__form">

        <div className='registration__title-block'>
          <p className='registration__title'>Восстановление пароля</p>
        </div>

        <IDInput placeholder="Email " type="email"  isError={!!errors?.email} inputName="email" validate={validateEmail} errorMessage={ errors?.email?.message || ''}/>
        <span className='reg-auth__error-hint'>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</span>

        <button className="button button__colored reg-auth__button" type="submit">Восстановить</button>

        <IDQuestion path="/registration" question="Нет учётной записи?" text="Регистрация"/> 

      </form>
      </FormProvider> }


      {/* Форма по ссылке */}

    {code && 
    <FormProvider {...methods}>
    <form className="registration__form">

      <div className='registration__title-block'>
        <p className='registration__title'>Восстановление пароля </p>
      </div>

        <IDInput placeholder="Новый пароль" type="password" isError={!!errors.password} inputName="password" validate={(value) => {trigger("repeatPassword"); return validatePassword(value) }} errorMessage={errors.password?.message as string || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/>
        {/* <IDInput placeholder="Новый пароль" type="password" isError={!!errors.password} inputName="password" validate={(value) => validatePassword(value) } errorMessage={errors.password?.message as string || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}/> */}
        <IDInput placeholder="Повторите пароль" type="password" isError={!!errors.repeatPassword} inputName="repeatPassword" validate={(value) => validateEqualPasswordMemo(value, watch("password"))} errorMessage={errors.repeatPassword?.message as string || ''}/>

        <button className="button button__colored reg-auth__button" type="submit">Сохранить изменения</button>

        <IDQuestion path="" question="После сохранения войдите в библиотеку, используя новый пароль" text=""/> 


      </form> 
      </FormProvider>}

    </div>
  )
}