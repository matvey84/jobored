import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFetchPaginationRequest } from '../../types/requestTypes';
interface IPaginationState {
  allPagesNumber: number[];
  firstAndLastPaginationPages: firstAndLastPaginationPagesType;
  currentPage: number;
  numIndex: number;
  totalResult: string;
  paginationFetchQuery: IFetchPaginationRequest;
}
const initialState: IPaginationState = {
  allPagesNumber: [],
  firstAndLastPaginationPages: { firstPaginationPage: 0, lastPaginationPage: 0 },
  currentPage: 0,
  numIndex: 0,
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
    setNumIndex(state, action: PayloadAction<number>) {
      state.numIndex = action.payload;
    },
    setTotalResult(state, action: PayloadAction<string>) {
      state.totalResult = action.payload;
    },
    setPaginationFetchQuery(state, action: PayloadAction<IFetchPaginationRequest>) {
      state.paginationFetchQuery = { ...action.payload };
    },
    // setDisableRightArrow(state, action: PayloadAction<boolean>) {
    //   state.disableRightArrow = action.payload;
    // },
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
  // setDisableLeftArrow,
  setPaginationFetchQuery,
  setAllPagesNumber,
  setFirstAndLastPaginationPages,
} = paginationStateSlice.actions;
export default paginationStateSlice.reducer;
