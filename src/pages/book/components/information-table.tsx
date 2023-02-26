export interface PropI {
  contentArray:Content[]
}

export interface Content {
  title:string,
  value:string,
}

export function InformationTable({contentArray}:PropI) {

  const content = contentArray.map(item => <tr key={item.title+item.value}><td className="table-information__title">{item.title}</td><td className="table-information__value">{item.value}</td></tr>)

  return (
    <table className="table-information">
      <tbody>
        {content}
      </tbody>
    </table>
  )
}
