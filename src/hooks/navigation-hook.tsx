import { useState } from 'react'

export function useNavigation() {
  const  [isOpenNavigation, setIsOpenNavigation] = useState(false)

  function toggleNavigation() {
    setIsOpenNavigation(prev => !prev)
  }

  function closeNavigation() {
    setIsOpenNavigation(false)
    // console.log(isOpenNavigation)
  }
  
  return { isOpenNavigation, toggleNavigation, closeNavigation }
}