

function HighlightValidate (text:string, isFocused:boolean) {
    const resultText = text.split('/')
  if (!isFocused) {
    return <span>{resultText.join('')}</span>
  }
  return resultText.map((item, index) =>
    index%2 ? <span key={item} style={{color:'#F42C4F'}}> {item} </span> : <span key={item}>{item}</span>
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
  const isNumbers = !/\d+/.test(value)
  const isLatinLetters = !/[A-Za-z]+/.test(value)
//   if (!/^[A-Za-z0-9]+$/.test(value)) {
//     isNumbers = true
//     isLatinLetters = true
//   }

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
  if (emailRegex.test(value)) {
    return true
  }
  return "Введите корректный e-mail"
}

const validateChangedPassword = (value: string) => {
  const a = "ggv"
return true

}

const validateEqualPassword = (value: string, equalValue:string) => {
  const a = 123
  return value !== equalValue ? "Пароли не совпадают" : true;
}


const validatePhone = (value: string) => {
  const phoneRegex = /^\+375 \((29|33|25|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;
  if (phoneRegex.test(value)) {
    return true
  }
  return "В формате +375 (xx) xxx-xx-xx"
}

export {HighlightValidate, validatePassword, validateLogin, validateName, validateChangedPassword, validateEqualPassword, validateEmail, validatePhone}
