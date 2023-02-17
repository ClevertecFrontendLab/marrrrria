import { Rating } from '../../../components/rating';
import FeedbackAvatar from '../../../img/feedback/feedback-photo.png'
import { Comment } from '../../../models/models';

export function Feedback(props:Comment) {
const {user, createdAt, rating, text} = props

const avatar = user.avatarUrl ? `https://strapi.cleverland.by${user.avatarUrl}')` : FeedbackAvatar

const pictureStyle = {
  backgroundImage: `url('${avatar}')`,
}

const date = new Date(createdAt)

return (
  <div className="feedback">
    <div className="feedback__info">
        <div className="feedback__photo" style={pictureStyle}> </div>
        <div className="feedback__info feedback__info_wrap">
            <p>{user.firstName} {user.lastName}</p>
            <p>{date.toLocaleString('ru', { month: 'long', day: 'numeric'}) } {date.getFullYear()}</p>
        </div>
    </div>
    <div className="feedback__score">
        <Rating score={rating}/>
    </div>
    {text ? <p className="feedback__message"> {text} </p> : null}
    
  </div>
)
}