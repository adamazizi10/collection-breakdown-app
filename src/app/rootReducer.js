import { combineReducers } from '@reduxjs/toolkit'
import collectionReducer from '../features/collection/collectionSlice'

const rootReducer = combineReducers({
  collection: collectionReducer,
})

export default rootReducer
