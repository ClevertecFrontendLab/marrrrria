import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/error-message';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { Rating } from '../../components/rating';
import { Slider } from '../../components/slider';
import { feedbackData,firstTableContent, secondTableContent } from '../../data/feedback';
import { useFeedback } from '../../hooks/feedback-hook';
import { useNavigation } from '../../hooks/navigation-hook';
import { useAppSelector } from '../../hooks/redux';
import Cover from '../../img/books/cover.png'
import Cover2 from '../../img/books/cover2.png'
import { useGetBookQuery } from '../../store/library/library.api';
import { createFirstTableData, createSecondTableData } from '../../utils/create-table-data';

import { Feedback } from './components/feedback';
import { InformationTable } from './components/information-table';
import { BookLabel } from './components/label';
// import { Error } from '../../models/models'

export function BookPage() {

  const { bookId } = useParams()
	const { isOpenNavigation, toggleNavigation } = useNavigation()
  const {isFeedbackOpen, toggleFeedback} = useFeedback()

	const {isLoading, error, isError, data: book} = useGetBookQuery(bookId || 4)
	const {currentCategory} = useAppSelector(state => state.library)
	// console.log(data)
	

//   const bookData = [
// 	{ 
// 		id: 1,
// 		name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
// 		author: 'Адитья Бхаргава, 2019',
// 		about: 'Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?',
// 		additionalAbout: 'Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.',
// 		pictures: [],
// 		free: true,
//     date: '',
// 	},

// 	{ 
// 		id: 1,
// 		name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
// 		author: 'Адитья Бхаргава, 2019',
// 		about: 'Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?',
// 		additionalAbout: 'Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.',
// 		pictures: [Cover],
// 		free: true,
//     date: '',
// 	},

// 	{ 
// 		id: 1,
// 		name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
// 		author: 'Адитья Бхаргава, 2019',
// 		about: 'Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?',
// 		additionalAbout: 'Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.',
// 		pictures: [Cover, Cover2,Cover2, Cover2,Cover2, Cover2,Cover2, Cover2,Cover2, Cover2],
// 		free: true,
//     date: '',
// 	},
// 	{ 
// 		id: 1,
// 		name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
// 		author: 'Адитья Бхаргава, 2019',
// 		about: 'Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?',
// 		additionalAbout: 'Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.',
// 		pictures: [Cover, Cover2],
// 		free: true,
//     date: '',
// 	},
// ]

	// const book = bookData[bookId-1] || bookData[1]


//   const feedbackJsx = feedbackData.map(item => <Feedback key={item.name+item.date+item.ratingScore} {...item}/>)

// 	const buttonBook = book.free ? <button className="book__book-button button button__colored" type="button"> Забронировать </button>
// 	: book.date ? <button className="book__book-button button" disabled={true} type="button"> {`Занята до ${book.date}`} </button>
// 	: <button className="book__book-button button" disabled={true} type="button"> Забронирована </button>




// const bookPageContent = <React.Fragment>
// <div className="book__label">
// 			<div className="wrapper">
// 				<BookLabel category="Бизнесс книги" name="Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих"/>
// 			</div>
// 		</div>

// 		<div className="wrapper book__wrapper">

// 			<div className="book__main-information">
// 				<div>
// 					<Slider data={book.pictures}/>
// 				</div>
// 				<div>
// 					<h2 className="book__title">{book.name}</h2>
// 					<p className="book__author">{book.author}</p>
// 					{buttonBook}
// 				</div>

// 				<div>
// 					<p className="book__about-title">О книге</p>
// 					<p className="book__about">{book.about} <br/><br/> {book.additionalAbout}</p>
// 				</div>
// 			</div>

// 			<div className="book__additional">
// 				<div className="book__rating">
// 					<p className="additional__title">Рейтинг</p>
// 					<div className="book__rating-stars">
// 						<Rating score={4}/> <span className="rating__score">4</span>
// 					</div>
// 				</div>

// 				<div className="additional__information">
// 					<p className="additional__title">Подробная информация</p>
// 					<div className="additional__detaled-information">
// 						<div className="additional__table">
// 							<InformationTable contentArray={firstTableContent}/>
// 						</div>
// 						<div className="additional__table">
// 							<InformationTable contentArray={secondTableContent}/>
// 						</div>
// 					</div>
// 				</div>

// 				<div className="additional__information">

// 					<p data-test-id='button-hide-reviews' onClick={toggleFeedback} role="presentation" className={`additional__title additional__title-feedback ${!isFeedbackOpen ?  'book__feedback-title' : ''}`}>
// 						Отзывы 
// 						<span className="feedback-count">2</span>
// 						<span className={`ico ico_arrow-feedback ${isFeedbackOpen ? 'feedback__icon_opened' : ''}`}> </span>
// 					</p>

// 					<div className={`book__feedback ${!isFeedbackOpen ? 'feedback_hidden' : ''}`}> 
// 						{feedbackJsx}
// 					</div>
// 				</div>

// 				<button data-test-id='button-rating' className="book__estimate-button button button__colored" type="button">Оценить книгу</button>

// 			</div>
// 		</div> </React.Fragment>


function openFeedback(number) {
	if(number) {
		toggleFeedback()
	}
}
console.log(isLoading, error, isError, book)
// console.log(error.data)


const feedbackJsx = book?.comments?.map(item => <Feedback key={item.id} {...item}/>)

	const buttonBook = book?.booking?.order && book?.delivery?.dateHandedTo ? <button className="book__book-button button" disabled={true} type="button"> {`Занята до ${book.delivery.dateHandedTo}`} </button>
	: book?.booking?.order ? <button className="book__book-button button" disabled={true} type="button"> Забронирована </button>
	: <button className="book__book-button button button__colored" type="button"> Забронировать </button>

	const bookWrapper = 
	<div className="wrapper book__wrapper">

			<div className="book__main-information">
				<div>
					<Slider data={book?.images}/>
				</div>
				<div>
					<h2 className="book__title">{book?.title}</h2>
					<p className="book__author">{book?.authors.join(', ')}</p>
					{buttonBook}
				</div>

				<div>
					<p className="book__about-title">О книге</p>
					<p className="book__about">{book?.description}</p>
				</div>
			</div>

			<div className="book__additional">
				<div className="book__rating">
					<p className="additional__title">Рейтинг</p>
					<div className="book__rating-stars">
						<Rating score={book?.rating}/> <span className="rating__score">{book?.rating || <span className='book_no-estimates'>ещё нет оценок</span>}</span>
					</div>
				</div>

				<div className="additional__information">
					<p className="additional__title">Подробная информация</p>
					<div className="additional__detaled-information">
						<div className="additional__table">
							<InformationTable contentArray={createFirstTableData(book)}/>
						</div>
						<div className="additional__table">
							<InformationTable contentArray={createSecondTableData(book)}/>
						</div>
					</div>
				</div>

				<div className="additional__information">

					<p data-test-id='button-hide-reviews' onClick={() => openFeedback(book?.comments?.length)} role="presentation" className={`additional__title additional__title-feedback ${isFeedbackOpen && book?.comments?.length ?  '' : 'book__feedback-title'}`}>
						Отзывы 
						<span className="feedback-count">{book?.comments?.length || 0}</span>
						{book?.comments?.length && <span className={`ico ico_arrow-feedback ${isFeedbackOpen ? 'feedback__icon_opened' : ''}`}> </span>}
						
					</p>

					<div className={`book__feedback ${isFeedbackOpen && book?.comments?.length ? '' : 'feedback_hidden'}`}> 
						{feedbackJsx}
					</div>
				</div>

				<button data-test-id='button-rating' className="book__estimate-button button button__colored" type="button">Оценить книгу</button>

			</div>
		</div> 

const bookPageContent = 
  <React.Fragment>
		<div className="book__label">
			<div className="wrapper">
				<BookLabel category={currentCategory} name={book?.title}/>
			</div>
		</div>

		{isError && <div style={{flexGrow: 3}}> </div>}

		{!isError && bookWrapper}
	</React.Fragment>


  return (
  <section className='book-page'> 
		{isError && <ErrorMessage message={error?.data?.error?.message}/>}

    <Header toggleNavigation={toggleNavigation} isOpenNavigation={isOpenNavigation}/>
			{isLoading && <Loader/>}
			{!isLoading && bookPageContent}
			
		<Footer />
	</section>
)
}
