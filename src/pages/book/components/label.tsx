export interface PropI {
  category: string,
  name: string,
}


export function BookLabel({category, name}:PropI) {
  return (
    <div className="book-label">
        <span className="book-label__category">{category}</span>
        <span className="icon ico_slash book-label__slash"> </span> 
        <span className="book-label__name">{name}</span>
    </div>
  )
}