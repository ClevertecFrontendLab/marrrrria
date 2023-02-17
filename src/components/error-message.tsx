import { useState } from "react";

interface ErrorProps {
  message: string,
}

export function ErrorMessage({message}: ErrorProps) {

  const [isClose, setIsClose] = useState(false);

  function close() {
    setIsClose(true)
  }

  return (
    <div style={isClose ? {display: 'none'} : {position: 'absolute', width: '100%', top: '64px', zIndex: '9999'}}>
      <div className="error-wrapper">
        <div className="error" data-test-id='error'>
          <p className="error__text"> <span className="ico ico_error"> </span> {message || 'Что-то пошло не так. Обновите страницу через некоторое время.'} </p>
          <span role="presentation" onClick={close} className="ico ico_error-cross"> </span>
        </div>
      </div>
    </div>
  )
}