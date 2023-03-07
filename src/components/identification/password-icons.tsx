interface PasswordI {
  isError: boolean,
  isVisible: boolean,
  showPassword: () => void,
}

export function PasswordIcons({isError, isVisible, showPassword}: PasswordI) {
  return (
    <span className="id-input-icons">
      {!isError && <span className="ico ico_tick"> </span>}
      <span role="presentation" className={`ico ${isVisible ? 'ico_eye-opened' : 'ico_eye-closed'} `} onClick={() => showPassword()}> </span>
    </span>
  )
}