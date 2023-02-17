import React, { useCallback, useEffect, useState } from 'react';
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
// import { booksData as booksDataa } from '../../data/books';
import { useGetBookQuery, useGetBooksQuery } from '../../store/library/library.api';

export function MainPage() {

	const {isLoading, error, isError, data: booksData} = useGetBooksQuery()
	const {addBooks, addCurrentBooks} = useActions()

	useEffect(() => {
		addBooks(booksData || [])
		// addCurrentBooks('all')
	}, [addBooks, booksData])

	const {allBooks, currentBooks} = useAppSelector(state => state.library)
	console.log(allBooks, "ALLBOOKS")
	console.log(currentBooks, "CURRBOOKS")
	
	// const {isLoading, isError, data} = useGetBookQuery(2) 

    // console.log(isError)
    // console.log(isLoading, error, isError, booksData)


	const {category} = useParams()

	useEffect(() => {
		addCurrentBooks(category || 'all')
	}, [category, booksData, addCurrentBooks])

	const [view, setView] = useState('block');

	function changeView(value:string) {
		setView(value);
	}

	const changeHandler = useCallback(
		(value:string) => {
			changeView(value);
		},[]
	);

	const cardsJSX = currentBooks?.map(item => <Card category={category || 'all'} data={item} key={`keyforcard-${item.id}`} view={view}/>)

	// const cardsJSX = booksDataa.map(item => <Card category={category || 'all'} data={item} key={`keyforcard-${item.id}`} view={view}/>)

	const mainPageContent = <div className="main-page">
    <div className="main-page__settings">
		<div className="main-page-search-filter-line">
				<Search/>
				<Filter/>
		</div>
		<View changeHandler={changeHandler} view={view}/>

		</div>
		<div className={`main-page__cards-wrapper main-page__cards-wrapper_${view}`}>
			
			{!isLoading && cardsJSX}
			{/* {isError && <ErrorMessage message="Something"/>} */}
			
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
