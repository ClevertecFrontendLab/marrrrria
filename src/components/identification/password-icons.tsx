interface PasswordI {
  isError: boolean,
  isVisible: boolean,
  showPassword: () => void,
}

export function PasswordIcons({isError, isVisible, showPassword}: PasswordI) {
  return (
    <span className="id-input-icons">
      {!isError && <span data-test-id="checkmark" className="ico ico_tick"> </span>}
      <span data-test-id={isVisible ? 'eye-opened' : 'eye-closed'}role="presentation" className={`ico ${isVisible ? 'ico_eye-opened' : 'ico_eye-closed'} `} onClick={() => showPassword()}> </span>
    </span>
  )
}
