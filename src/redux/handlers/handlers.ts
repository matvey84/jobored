import { IFetchPaginationRequest } from '../../types/requestTypes';
import { IUser } from '../../types/types';
import { IVacansy } from '../../types/vacancyTypes';

export function createrQueryString(
  data: IUser | IFetchPaginationRequest,
  endpoint: string
): string {
  return `${endpoint}/?${Object.entries(data)
    .map((params) => params.join('='))
    .join('&')}`;
}

export const createAllButtonsNumberNote = (pagesAmmount: number, numIndex: number) => {
  const visiblePaginationButtonAmmount = 3;
  const allPagesNumber: number[] = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalNumPagesArr: number[][] = [];
  const paginationButtonVisibleAmount =
    pagesAmmount < visiblePaginationButtonAmmount ? pagesAmmount : visiblePaginationButtonAmmount;

  for (let i = 1; i <= pagesAmmount; i++) {
    allPagesNumber.push(i);
  }

  const totalAmountPages = Math.ceil(allPagesNumber.length / visiblePaginationButtonAmmount);
  for (let j = 0; j <= totalAmountPages; j++) {
    totalNumPagesArr.push(
      allPagesNumber.splice(
        0,
        allPagesNumber.length > paginationButtonVisibleAmount
          ? paginationButtonVisibleAmount
          : allPagesNumber.length
      )
    );
  }

  return totalNumPagesArr;
};

export const favoriteVacancyListCreate = (favoriteList: IVacansy[], totlaItemInPage: number) => {
  const copyArr = [...favoriteList];
  const visiblePaginationButtonAmmount = 3;
  const bllockArray: IVacansy[][][] = [];
  const totalAmountPages = Math.ceil(copyArr.length / totlaItemInPage);

  for (
    let i = 0;
    i < Math.ceil(copyArr.length / visiblePaginationButtonAmmount / totlaItemInPage);
    i++
  ) {
    const newList: IVacansy[][] = [];
    for (let j = 0; j < totalAmountPages; j++) {
      const removedElCount = copyArr.length >= totlaItemInPage ? totlaItemInPage : copyArr.length;
      newList.push(copyArr.splice(0, removedElCount));
    }
    bllockArray.push(newList);
  }

  return bllockArray;
};
