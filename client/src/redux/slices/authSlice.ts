//slices are two kinds:
// local slice that holds local data
// api slice which implements the redux thunk middleware to make async requests
import { createSlice } from '@reduxjs/toolkit'

//TODO add proper state type
interface AuthState {
	userInfo: any | null
}

const initialState: AuthState = {
	userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
}

const authSlice = createSlice({
	initialState: initialState,
	name: 'auth',
	reducers: {
		setUserCredentials: (state, action) => {
			state.userInfo = action.payload
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
		},
		clearUserCredentials: (state, action) => {
			state.userInfo = null
			localStorage.removeItem('userInfo')
		},
	},
})

export const { setUserCredentials, clearUserCredentials } = authSlice.actions
export default authSlice.reducer
