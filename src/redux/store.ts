import { configureStore } from '@reduxjs/toolkit'
// import { composeWithDevTools } from "redux-devtools-extension"
import sidebarReducer from './duxes/siderbar'
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer.reducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store