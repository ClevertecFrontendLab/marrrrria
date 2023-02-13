import React from 'react'

export interface DataI {
  title: string,
  subtitles: DataI[],
}

export interface PropsI {
  data: DataI[],
  label: string,
}

export function LayoutDocument({data, label}:PropsI) {

	function getArticleJSX(article:DataI, number:string, isFirst:boolean, level:number) : React.ReactNode {
		const subResult = article.subtitles.length ? article.subtitles.map((item,index)=> getArticleJSX(item, `${number}.${index+1}`, false, level+1)
		) : []
		const title = isFirst ? <h3>{number} {article.title}</h3> : <React.Fragment>{number} {article.title}</React.Fragment>
		const ol =  subResult.length ? <ol className="layout-document__block">{subResult}</ol> : ''
		const result = <li key={article.title + article.subtitles.length} className={`layout-document__item_${level}`}>{title}{ol}</li>

		return result 
}

	const list = data.map((item,i) =>
		<ol key={`rule-${item.title}`}  className="layout-document__list">
			{getArticleJSX(item, `${i+1}`,true, 1)}
		</ol>

	)

	return (
		<div className="layout-document">
			<h2 className="layout-document__title">{label}</h2>
			{list}
		</div>
	)

}
