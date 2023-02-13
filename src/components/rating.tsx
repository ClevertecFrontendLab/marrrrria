export interface PropI {
  score: number,
}

export function Rating({score}:PropI) {
  const starsJSX = [];
  let rating = Math.round(score);

  for(let i=1; i<=5; i++) {
    const starSpan = rating > 0 ? <span key={i} className="icon ico_full-star"> </span> : <span key={i} className="icon ico_star"> </span>

    starsJSX.push(starSpan)
    rating -= 1;
  }

  return (
    <p className="rating">
      {starsJSX}
    </p>
  )
}