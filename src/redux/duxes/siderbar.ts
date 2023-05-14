import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'


const initialState:any = {}

const sidebarSlice = createSlice({
    name: 'sideber',
    initialState,
    reducers: {
        open(state, action:PayloadAction<string>) {
            state[action.payload] = false
        },
        close(state, action:PayloadAction<string>) {
            state[action.payload] = true
        }
    }
})

export const {open, close} = sidebarSlice.actions
export default sidebarSlice