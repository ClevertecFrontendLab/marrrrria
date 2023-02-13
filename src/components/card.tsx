import { Link } from 'react-router-dom';

import bookPlaceholder from '../img/books/bookPlaceholder.svg'
import { Book } from '../models/models';

import { Rating } from './rating';

export interface DataI {
  data: Book,
  view: string,
  category: string,
}

export function Card({data, view, category}: DataI) {

  //! Something with categories to do 

  const styleCover =
  data.image?.url ?
  {
    backgroundImage: `url('https://strapi.cleverland.by${data.image.url}')`,
    backgroundSize: 'cover',
  }
  : {
    backgroundImage: `url('${bookPlaceholder}')`,
    backgroundRepeat: 'no-repeat',
  }

  const buttonText = data?.booking?.order && data?.delivery?.dateHandedTo ? `Занята до ${data?.delivery.dateHandedTo}` : data?.booking?.order ? 'Забронирована' : 'Забронировать';

  const cardButton = <button className={`card-${view}__button button ${!data?.booking?.order ? 'button__colored' : ''}`} disabled={data?.booking?.order} type="button">{buttonText}</button>

  const cardBody = view === 'block' ?
      <div className={`card-${view}__body`}>
        <div className={`card-${view}__score`}> {data.rating > 0 ? <Rating score={data.rating}/> : 'eщё нет оценок' } </div>
        <p className={`card-${view}__name`}> {data.title} </p>
        <p className={`card-${view}__author`}> {data.authors.join(', ')} {data.issueYear}</p>
        {cardButton}
      </div>
    : <div className={`card-${view}__body`}>
        <p className={`card-${view}__name`}> {data.title} </p>
        <p className={`card-${view}__author`}> {data.authors.join(', ')} {data.issueYear}</p>
        <div className='card__bottom-line'>
          <div className={`card-${view}__score`}> {data.rating > 0 ? <Rating score={data.rating}/> : 'eщё нет оценок' } </div>
          {cardButton}
        </div>
      </div>

  return (
    <div data-test-id='card' className={`card-${view}`}>
      <Link to={`/books/${category}/${data.id}`}>
        <div className={`card-${view}__wrapper`}>
          <div className={`card-${view}__cover`} style={styleCover}> </div>
          {cardBody}
        </div>
      </Link>
    </div>
  )
}
