import { useState } from "react"

export function useBook() {

  const [book, setBook] = useState({})

  const rate = () => {

  }

  const take = () => {

  }

  const cancel = () => {

  }

  return { book, rate, take, cancel}
}