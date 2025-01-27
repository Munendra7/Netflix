import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    value:{
        user:User | null, isloading:boolean
    }
}

interface User {
    id: number | null;
    name: string | null;
    email: string | null;
}

const initialState: UserState = {
   value:{
    user:null, isloading:true
   }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.value.user = action.payload.value.user;
            state.value.isloading = false;
        },
        clearUser: (state) => {
            state.value.user = null;
            state.value.isloading = false;
        }
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;