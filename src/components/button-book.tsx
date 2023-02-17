interface ButtonBookProps {
  order: boolean,
  dateHandedTo: Date,
  view: string,
}

export function ButtonBook({order, dateHandedTo, view}: ButtonBookProps) {

  const buttonText = order && dateHandedTo ? `Занята до ${dateHandedTo.toLocaleString('ru', { month: 'short', day: 'numeric'})}` : order ? 'Забронирована' : 'Забронировать';


  const viewClass = `${view}__button`
  const typeClass = !order && !dateHandedTo ? 'button__colored' : ''

  return (
    <button className={`button ${viewClass} ${typeClass}`} disabled={order} type="button">{buttonText}</button>
  )
}