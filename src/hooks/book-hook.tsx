import { useState } from "react"
import { useGetBooksQuery } from "../store/library/library.api"

export function useBook() {

  // const {isLoading, isError, data} = useGetBooksQuery() 
  // console.log(data)

  const [book, setBook] = useState({})

  // const getAllBooks = () => {
  //   const {isLoading, isError, data} = useGetBooksQuery() 
  //   console.log(data)
  // }

  const rate = () => {

  }

  const take = () => {

  }

  const cancel = () => {

  }

  return { book, rate, take, cancel}
}