import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  entries: [],
  editingId: null,
}

/**
 * @typedef {Object} CollectionEntry
 * @property {string} id
 * @property {string} clinic
 * @property {string} date ISO date (YYYY-MM-DD)
 * @property {number} collection_credit
 * @property {number} collection_cash
 * @property {number} collection_eft
 * @property {string} createdAt ISO timestamp
 * @property {string} updatedAt ISO timestamp
 */

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addEntry(state, action) {
      const { clinic, date, collection_credit, collection_cash, collection_eft } =
        action.payload
      const now = new Date().toISOString()

      /** @type {CollectionEntry} */
      const entry = {
        id: nanoid(),
        clinic,
        date,
        collection_credit,
        collection_cash,
        collection_eft,
        createdAt: now,
        updatedAt: now,
      }

      state.entries.push(entry)
      state.editingId = null
    },
    updateEntry(state, action) {
      const { id, clinic, date, collection_credit, collection_cash, collection_eft } =
        action.payload
      const existingEntry = state.entries.find((entry) => entry.id === id)
      if (!existingEntry) return

      existingEntry.clinic = clinic
      existingEntry.date = date
      existingEntry.collection_credit = collection_credit
      existingEntry.collection_cash = collection_cash
      existingEntry.collection_eft = collection_eft
      existingEntry.updatedAt = new Date().toISOString()
      state.editingId = null
    },
    startEdit(state, action) {
      state.editingId = action.payload
    },
    cancelEdit(state) {
      state.editingId = null
    },
  },
})

export const { addEntry, updateEntry, startEdit, cancelEdit } =
  collectionSlice.actions

export default collectionSlice.reducer
