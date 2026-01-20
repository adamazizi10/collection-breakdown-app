import { useDispatch, useSelector } from 'react-redux'
import { startEdit } from '../../../features/collection/collectionSlice'
import { selectEntries } from '../../../features/collection/collectionSelectors'

const formatAmount = (value) => Number(value).toFixed(2)

function CollectionList() {
  const dispatch = useDispatch()
  const entries = useSelector(selectEntries)

  return (
    <section className="collection-list">
      <h2 className="collection-list-title">Recorded Entries</h2>
      <div className="collection-table-wrapper">
        <table className="collection-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Clinic Code</th>
              <th scope="col">Date</th>
              <th scope="col">Credit</th>
              <th scope="col">Cash</th>
              <th scope="col">EFT</th>
              <th scope="col" aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {entries.length ? (
              entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td>{index + 1}</td>
                  <td>{entry.clinic}</td>
                  <td>{entry.date}</td>
                  <td>${formatAmount(entry.collection_credit)}</td>
                  <td>${formatAmount(entry.collection_cash)}</td>
                  <td>${formatAmount(entry.collection_eft)}</td>
                  <td className="collection-table-action">
                    <button
                      className="secondary-button edit-button"
                      type="button"
                      onClick={() => dispatch(startEdit(entry.id))}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="collection-empty-row">
                <td colSpan={7}>No entries yet. Add one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CollectionList
