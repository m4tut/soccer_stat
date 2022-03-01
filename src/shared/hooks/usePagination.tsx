import { useState } from 'react';

function usePagination<T>(
  limit: number,
  defaultCurrent: number = 0
): [
  page: T[],
  dataLenght: number,
  numPage: number,
  setNumPage: React.Dispatch<React.SetStateAction<number>>,
  fetchPage: (data: T[]) => Promise<void>
] {
  const [dataLenght, setDataLenght] = useState<number>(0); // количество данных
  const [page, setPage] = useState<T[]>([]); // данные на текущей странице
  const [numPage, setNumPage] = useState<number>(defaultCurrent); // номер текущей страницы (индексация страниц с 0)

  // получить данные для страницы (пагинация)
  async function fetchPage(data: T[]) {
    setDataLenght(data.length);
    console.log(data);

    setPage(data.slice(numPage * limit, numPage * limit + limit));
    console.log(page);
  }

  return [page, dataLenght, numPage, setNumPage, fetchPage];
}

export default usePagination;
