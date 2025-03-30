import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QueryResult {
  category: string;
  question: string;
  answer: number | string;
}

interface QueryState {
  query: string;
  results: QueryResult[];
  history: { query: string; results: QueryResult[] }[];
  loading: boolean;
}

const initialState: QueryState = {
  query: "",
  results: [],
  history: [],
  loading: false,
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    fetchResults: (state) => {
      state.loading = true;
    },
    setResults: (state, action: PayloadAction<QueryResult[]>) => {
      state.results = [...state.results, ...action.payload];
      state.loading = false;

      state.history.unshift({ query: state.query, results: action.payload });
      if (state.history.length > 10) {
        state.history.pop();
      }
    },
    resetResults: (state) => {
      state.results = [];
    },
  },
});

export const { setQuery, fetchResults, setResults, resetResults } =
  querySlice.actions;
export default querySlice.reducer;
