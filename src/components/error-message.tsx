interface ErrorProps {
  message: string,
}

export function ErrorMessage({message}: ErrorProps) {
  return (
    <div className="error">
      <p className="error__text"> <span className="ico ico_error"> </span> {message} </p>
      <span className="ico ico_error-cross"> </span>
    </div>
  )
}