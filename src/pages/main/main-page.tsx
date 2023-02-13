import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '../../components/card';
import {Filter} from '../../components/filter';
import { Layout } from '../../components/layout';
import {Search} from '../../components/search';
import {View} from '../../components/view';
import { booksData } from '../../data/books';

export function MainPage() {

    const {category} = useParams()

    const [view, setView] = useState('block');

    function changeView(value:string) {
        setView(value);
    }

    const changeHandler = useCallback(
        (value:string) => {
            changeView(value);
        },[]
    );

    const cardsJSX = booksData.map(item => <Card category={category || 'all'} data={item} key={`keyforcard-${item.id}`} view={view}/>)

    const mainPageContent = <div className="main-page">
    <div className="main-page__settings">
        <div className="main-page-search-filter-line">
            <Search/>
            <Filter/>
        </div>
        <View changeHandler={changeHandler} view={view}/>

    </div>
    <div className={`main-page__cards-wrapper main-page__cards-wrapper_${view}`}>
        {cardsJSX}
    </div>
    </div>


return (
    <Layout content={mainPageContent}/>
)
}
