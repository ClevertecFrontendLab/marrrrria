import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '../../components/card';
import { ErrorMessage } from '../../components/error-message';
import {Filter} from '../../components/filter';
import { Layout } from '../../components/layout';
import { Loader } from '../../components/loader';
import {Search} from '../../components/search';
import {View} from '../../components/view';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { useGetBooksQuery } from '../../store/library/library.api';




export function MainPage() {

	const {isLoading, error, isError, data: booksData} = useGetBooksQuery()
	// const {isLoading, error, isError, data: booksData} = useGetBooksQuery({
	// 	refetchOnFocus:true,
	// })
	const {addBooks, addCurrentBooks} = useActions()

	useEffect(() => {
		addBooks(booksData || [])
	}, [addBooks, booksData])

	const { currentBooks, isSortedByTop, searchValue } = useAppSelector(state => state.library)

	const {category} = useParams()

	useEffect(() => {
		addCurrentBooks(category || 'all')
		// filterByRating(true)
	}, [category, booksData, addCurrentBooks, isSortedByTop])

	const [view, setView] = useState('block');

	function changeView(value:string) {
		setView(value);
	}

	const changeHandler = useCallback(
		(value:string) => {
			changeView(value);
		},[]
	);

	const [shownBooks, setShownBooks] = useState(currentBooks)

	// const searchMatches = useCallback(
	// 	(value: string) => {
	// 		console.log('gfgf')
	// 		filteredData(value)
	// 		setShownBooks(filt)
	// 	}, []
	// )

	const filteredData = useMemo(() => currentBooks.filter(({ title }) => {
		const lowerCaseTitle = title.toLowerCase();
		const lowerCasesearchValue = searchValue.toLowerCase();

		return (
			lowerCaseTitle.includes(lowerCasesearchValue)
		);
	}), [currentBooks, searchValue]);

	const cardsJSX = filteredData?.map(item => <Card category={category || 'all'} data={item} key={`keyforcard-${item.id}`} view={view}/>)
	// const noCardsText = !currentBooks.length ? <p className='main-page__no-cards'>В этой категории книг ещё нет</p> :
	// !cardsJSX.length ? <p className='main-page__no-cards'>По запросу ничего не найдено</p> : null

	const noCardsText = currentBooks.length ? cardsJSX.length ? null : 
	<p className='main-page__no-cards'>По запросу ничего не найдено</p> :
	<p className='main-page__no-cards'>В этой категории книг ещё нет</p> 

	const mainPageContent = <div className="main-page">
    <div className="main-page__settings">
		<div className="main-page-search-filter-line">
				<Search/>
				<Filter/>
		</div>
		<View changeHandler={changeHandler} view={view}/>

		</div>
		{/* {!currentBooks.length && <p className='main-page__no-cards'>В этой категории книг ещё нет</p>}
		{!cardsJSX.length && currentBooks.length  && <p className='main-page__no-cards'>По запросу ничего не найдено</p>} */}
		{noCardsText}
		<div className={`main-page__cards-wrapper main-page__cards-wrapper_${view}`}>
			{!isLoading && cardsJSX}			
		</div>
	</div>


	return (
		<React.Fragment>
			{isError && <ErrorMessage message={(error as any)?.data?.error?.message}/>}
			{isLoading && <Loader/>}
			<Layout content={mainPageContent}/>
		</React.Fragment>
		
	)
}
