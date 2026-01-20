export const selectEntries = (state) => state.collection.entries

export const selectEditingId = (state) => state.collection.editingId

export const selectEditingEntry = (state) => {
  const editingId = selectEditingId(state)
  if (!editingId) return null
  return selectEntries(state).find((entry) => entry.id === editingId) || null
}
