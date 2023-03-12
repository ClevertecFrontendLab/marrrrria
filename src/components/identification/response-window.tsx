import { Link } from 'react-router-dom';

interface ResponseWindowProps {
  title: string,
  message: string,
  buttonText?: string,
  path?: string,
  handler?: () => void,
}

export function ResponseWindow({title, message, buttonText="", path="", handler}: ResponseWindowProps) {

  const button = <>
    {path && <Link to={path}><button className="button button__colored response__button" type="button">{buttonText}</button></Link>}
    {handler && <button onClick={handler} className="button button__colored response__button" type="button">{buttonText}</button>}
  </>

  return (
      <div data-test-id="status-block" className="response__container">
        <p className='response__title'>{title}</p>
        <span className='response__message'>{message}</span>
        {button}
      </div>
  )
}
