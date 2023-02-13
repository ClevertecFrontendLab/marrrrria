import { Link } from 'react-router-dom';

import bookPlaceholder from '../img/books/bookPlaceholder.svg'

import { Rating } from './rating';

export interface DataI {
  data: {
    id: number,
    img: string,
    score: number,
    name: string,
    author: string,
    free: boolean,
    date: string,
  },
  view: string,
  category: string,
}

export function Card({data, view, category}: DataI) {
  const styleCover =
  data.img ?
  {
    backgroundImage: `url('${data.img}')`,
    backgroundSize: 'cover',
  }
  : {
    backgroundImage: `url('${bookPlaceholder}')`,
    backgroundRepeat: 'no-repeat',
  }

  const buttonText = data.free ? 'Забронировать' : data.date ? `Занята до ${data.date}` : 'Забронирована';

  const cardButton = <button className={`card-${view}__button button ${data.free ? 'button__colored' : ''}`} disabled={!data.free} type="button">{buttonText}</button>

  const cardBody = view === 'block' ?
      <div className={`card-${view}__body`}>
        <div className={`card-${view}__score`}> {data.score > 0 ? <Rating score={data.score}/> : 'eщё нет оценок' } </div>
        <p className={`card-${view}__name`}> {data.name} </p>
        <p className={`card-${view}__author`}> {data.author} </p>
        {cardButton}
      </div>
    : <div className={`card-${view}__body`}>
        <p className={`card-${view}__name`}> {data.name} </p>
        <p className={`card-${view}__author`}> {data.author} </p>
        <div className='card__bottom-line'>
          <div className={`card-${view}__score`}> {data.score > 0 ? <Rating score={data.score}/> : 'eщё нет оценок' } </div>
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
