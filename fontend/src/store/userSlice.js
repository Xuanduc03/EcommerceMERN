import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload; // Cập nhật state với dữ liệu từ action.payload
    },
    clearUserDetails: (state) => {
      state.user = null; // Xóa thông tin người dùng khi cần
    }
  },
});

// Action creators được tự động tạo ra cho mỗi reducer function
export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
