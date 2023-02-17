import React from 'react';
import { useParams } from 'react-router-dom';

import { ButtonBook } from '../../components/button-book';
import { ErrorMessage } from '../../components/error-message';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { Rating } from '../../components/rating';
import { Slider } from '../../components/slider';
import { useFeedback } from '../../hooks/feedback-hook';
import { useNavigation } from '../../hooks/navigation-hook';
import { useAppSelector } from '../../hooks/redux';
import { useGetBookQuery } from '../../store/library/library.api';
import { createFirstTableData, createSecondTableData } from '../../utils/create-table-data';

import { Feedback } from './components/feedback';
import { InformationTable } from './components/information-table';
import { BookLabel } from './components/label';

export function BookPage() {

  const { bookId } = useParams()
	const { isOpenNavigation, toggleNavigation } = useNavigation()
  const {isFeedbackOpen, toggleFeedback} = useFeedback()

	const {isLoading, error, isError, data: book} = useGetBookQuery(bookId || 4)
	const {currentCategory} = useAppSelector(state => state.library)

	function openFeedback(number) {
		if(number) {
			toggleFeedback()
		}
	}

const feedbackJsx = book?.comments?.map(item => <Feedback key={item.id} {...item}/>)

	const buttonBook = <ButtonBook order={book?.booking?.order} dateHandedTo={book?.delivery?.dateHandedTo} view="book-book"/>

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
