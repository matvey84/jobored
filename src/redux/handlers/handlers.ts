import { IFetchPaginationRequest } from '../../types/requestTypes';
import { IUser } from '../../types/types';

export function createrQueryString(
  data: IUser | IFetchPaginationRequest,
  endpoint: string
): string {
  return `${endpoint}/?${Object.entries(data)
    .map((params) => params.join('='))
    .join('&')}`;
}

export const createAllButtonsNumberNote = (pagesAmmount: number, numIndex: number) => {
  const allPagesNumber: number[] = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalNumPagesArr: number[][] = [];
  const pageVisibleAmount = 3;

  for (let i = 0; i <= pagesAmmount; i++) {
    allPagesNumber.push(i + 1);
  }
  const totalAmountPages = Math.ceil(allPagesNumber.length / 20);
  for (let j = 0; j <= totalAmountPages; j++) {
    totalNumPagesArr.push(allPagesNumber.splice(0, pageVisibleAmount));
  }

  const remainder = (numIndex + 1) * pageVisibleAmount - pagesAmmount;
  if (numIndex + 1 === totalAmountPages) {
    totalNumPagesArr[numIndex].splice(0 - remainder, remainder);
  }
  return totalNumPagesArr;
};
