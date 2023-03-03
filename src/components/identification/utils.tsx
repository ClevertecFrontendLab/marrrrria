function HighlightValidate (text:string) {
  return text.split('/').map((item, index) =>
    index%2 ? <span key={item} style={{color:'red'}}> {item} </span> : item
  )
}

const validatePassword = (value: string) => {
  let isNumbers = !/\d+/.test(value)
  let isBigLetter = !/[A-Z]+/.test(value)
  let numLetters = value.split("").length < 8
  if (!/^[A-Za-z0-9]+$/.test(value)) {
    isNumbers = true
    isBigLetter = true
    numLetters = true
  }

  const JSXError = `Пароль ${numLetters ? '/не менее 8 символов/' : 'не менее 8 символов'},   ${isBigLetter ? "/с заглавной буквой/" : "с заглавной буквой"} и ${isNumbers ? "/и цифрой/" : "и цифрой"}`

  return JSXError
};

const validateLogin = (value: string) => {
  let isNumbers = !/\d+/.test(value)
  let isLatinLetters = !/[A-Za-z]+/.test(value)
  if (!/^[A-Za-z0-9]+$/.test(value)) {
    isNumbers = true
    isLatinLetters = true
  }

  const JSXError = `Используйте для логина ${isLatinLetters ? "/латинский алфавит/" : "латинский алфавит"} и ${isNumbers ? "/цифры/" : "цифры"}`

  return JSXError
};

const validateName = (value: string) => {
  const a = 'dvdffd';
  return ''
}

export {HighlightValidate, validatePassword, validateLogin, validateName}