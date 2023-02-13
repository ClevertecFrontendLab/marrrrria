import { Rating } from '../../../components/rating';

export interface PropI {
  photo: string,
  name: string,
  date: string,
  ratingScore: number,
  message: string,
}

export function Feedback(props:PropI) {
const {photo, name, date, ratingScore, message} = props

const pictureStyle = {
  backgroundImage: `url(${photo})`,
}

return (
  <div className="feedback">
    <div className="feedback__info">
        <div className="feedback__photo" style={pictureStyle}> </div>
        <div className="feedback__info feedback__info_wrap">
            <p>{name}</p>
            <p>{date}</p>
        </div>
    </div>
    <div className="feedback__score">
        <Rating score={ratingScore}/>
    </div>
    {message ? <p className="feedback__message"> {message} </p> : null}
    
  </div>
)
}