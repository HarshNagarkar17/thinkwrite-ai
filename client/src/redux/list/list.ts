import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import listApis from "../../apis/list/list";
import { RootState } from "../store";

interface List {
  title: string;
  _id: string;
  body?: string;
}

interface StoreState {
  lists: List[];
  selectedList?: List;
  loading: boolean;
  error?: string;
}

const initialState: StoreState = {
  lists: [],
  loading: false,
};

export const getLists = createAsyncThunk(
  "listSlice/getLists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await listApis.get();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addList = createAsyncThunk(
  "listSlice/addList",
  async ({ title }: { title: string }, { rejectWithValue }) => {
    try {
      return await listApis.post(title);
    } catch (error: any) {
      console.log({ error });
      return rejectWithValue(error.response.data.error);
    }
  }
);

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    updateSelectedList: (state, action) => {
      state.selectedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLists.fulfilled, (state, action) => {
      state.lists = action.payload.blogs;
      state.loading = false;
    });
    builder.addCase(getLists.rejected, (state, action) => {
      console.log("failed to fetch lists", action.payload);
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      state.lists.push(action.payload.blog);
      state.loading = false;
    });
    builder.addCase(addList.rejected, (state, action) => {
      console.log("failed to add list", action.payload);
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { updateSelectedList } = slice.actions;

export default slice.reducer;

export const getCurrentList = (state: RootState) => state.slice.lists;
