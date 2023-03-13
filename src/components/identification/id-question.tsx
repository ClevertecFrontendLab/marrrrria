import { Link } from 'react-router-dom';

interface IDQuestionProps {
  question: string,
  path: string,
  text: string,
}

export function IDQuestion({question, path, text}: IDQuestionProps) {

  return (
    <p className='registration__question'>
      <span> {question} </span>
      {text && <Link to={path}>
        <span className='registration__sign-in-button'> {text}
        <span className='ico ico_sign-in-arrow'> </span>
        </span>
      </Link>}
    </p>
  )
}