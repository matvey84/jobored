import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFetchPaginationRequest } from '../../types/requestTypes';
interface IPaginationState {
  allPagesNumber: number[];
  firstAndLastPaginationPages: firstAndLastPaginationPagesType;
  currentPage: number;
  currentPageForFavoritePage: number;
  numIndex: number;
  numIndexFavoritePage: number;
  totalResult: string;
  paginationFetchQuery: IFetchPaginationRequest;
}
const initialState: IPaginationState = {
  allPagesNumber: [],
  firstAndLastPaginationPages: { firstPaginationPage: 0, lastPaginationPage: 0 },
  currentPage: 0,
  currentPageForFavoritePage: 1,
  numIndex: 0,
  numIndexFavoritePage: 0,
  totalResult: '',
  paginationFetchQuery: {
    page: 1,
    count: 20,
  },
};
type firstAndLastPaginationPagesType = {
  firstPaginationPage: number;
  lastPaginationPage: number;
};

const paginationStateSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCurrentPageForFavoritePage(state, action: PayloadAction<number>) {
      state.currentPageForFavoritePage = action.payload;
    },
    setNumIndex(state, action: PayloadAction<number>) {
      state.numIndex = action.payload;
    },
    setNumIndexFavoritePage(state, action: PayloadAction<number>) {
      state.numIndexFavoritePage = action.payload;
    },
    setTotalResult(state, action: PayloadAction<string>) {
      state.totalResult = action.payload;
    },
    setPaginationFetchQuery(state, action: PayloadAction<IFetchPaginationRequest>) {
      state.paginationFetchQuery = { ...action.payload };
    },
    setAllPagesNumber(state, action: PayloadAction<number[]>) {
      state.allPagesNumber = action.payload;
    },
    setFirstAndLastPaginationPages(state, action: PayloadAction<firstAndLastPaginationPagesType>) {
      state.firstAndLastPaginationPages = action.payload;
    },
  },
});
export const {
  setCurrentPage,
  setNumIndex,
  setTotalResult,
  setNumIndexFavoritePage,
  setCurrentPageForFavoritePage,
  setPaginationFetchQuery,
  setAllPagesNumber,
  setFirstAndLastPaginationPages,
} = paginationStateSlice.actions;
export default paginationStateSlice.reducer;
