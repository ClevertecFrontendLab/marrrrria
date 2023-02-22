import { Link, useParams } from 'react-router-dom'

export interface PropI {
  category: string,
  name: string,
}


export function BookLabel({category, name}:PropI) {
  const {category: path} = useParams()

  return (
    <div className="book-label">
        <Link to={`/books/${path}`}><span className="book-label__category">{category}</span></Link>
        <span className="icon ico_slash book-label__slash"> </span> 
        <span className="book-label__name">{name}</span>
    </div>
  )
}