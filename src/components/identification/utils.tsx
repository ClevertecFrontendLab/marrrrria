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

  const JSXError = `Пароль ${numLetters ? '/не менее 8 символов,/' : 'не менее 8 символов,'}   ${isBigLetter ? "/с заглавной буквой/" : "с заглавной буквой"} и ${isNumbers ? "/цифрой/" : "цифрой"}`
  if (isNumbers || isBigLetter || numLetters){
    return JSXError
  }
  return true
};

const validateLogin = (value: string) => {
  let isNumbers = !/\d+/.test(value)
  let isLatinLetters = !/[A-Za-z]+/.test(value)
  if (!/^[A-Za-z0-9]+$/.test(value)) {
    isNumbers = true
    isLatinLetters = true
  }

  const JSXError = `Используйте для логина ${isLatinLetters ? "/латинский алфавит/" : "латинский алфавит"} и ${isNumbers ? "/цифры/" : "цифры"}`

  if (isNumbers || isLatinLetters){
    return JSXError
  }
  return true
};

const validateName = (value: string) => {
  const a = 'dvdffd';
  return true
}

const validateEmail = (value:string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
}

const validateChangedPassword = (value: string) => {
  const a = "ggv"
return true

}

const validateEqualPassword = (value: string) => {
  const a = "ggv"
  return true
}

export {HighlightValidate, validatePassword, validateLogin, validateName, validateChangedPassword, validateEqualPassword}