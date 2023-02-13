import { WholeBook } from "../models/models";

export function createFirstTableData(data: WholeBook) {
  const response = [
    {
      title: 'Издательство',
      value: data?.publish,
    },
    {
      title: 'Год издания',
      value: data?.issueYear,
    },
    {
      title: 'Страниц',
      value: data?.pages,
    },
    {
      title: 'Переплет',
      value: data?.cover,
    },
    {
      title: 'Формат',
      value: data?.format,
    },
  ]
  
  return (response)
}

export function createSecondTableData(data: WholeBook) {
  const response = [
    {
      title: 'Жанр',
      value: data?.categories.join(', '),
    },
    {
      title: 'Вес',
      value: `${data?.weight} г.`,
    },
    {
      title: 'ISBN',
      value: data?.ISBN,
    },
    {
      title: 'Изготовитель',
      value: data?.producer,
    },
  ]
  
  return (response)
}