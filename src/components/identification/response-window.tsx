import { Link } from 'react-router-dom';

interface ResponseWindowProps {
  title: string,
  message: string,
  buttonText: string,
  path: string,
}

export function ResponseWindow({title, message, buttonText, path}: ResponseWindowProps) {

  return (
      <div className="response__container">
        <p className='response__title'>{title}</p>
        <span className='response__message'>{message}</span>
        <Link to={path}><button className="button button__colored response__button" type="button">{buttonText}</button></Link>
      </div>
  )
}