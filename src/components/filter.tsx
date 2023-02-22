import { useEffect, useState } from "react"
import { useActions } from "../hooks/actions"

export function Filter() {

  const [isTopFirst, setTopFirst] = useState(true)

  const { filterByRating } = useActions()

  useEffect(() => {
    filterByRating(isTopFirst)
  }, [filterByRating, isTopFirst])

  return (
    <div className='filter' onClick={() => setTopFirst(prev => !prev)} role="presentation">
        <span className={`ico ${isTopFirst ? 'ico_filter-top' : 'ico_filter-bottom'}`}> </span>
        <p className='filter__text'>По рейтингу</p>
    </div> 
  )
} 
