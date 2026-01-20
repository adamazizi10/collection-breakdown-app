import CollectionForm from './components/CollectionForm'
import CollectionList from './components/CollectionList'
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import './CollectionPageStyles.css'

function CollectionPage() {
  const { toast, showToast, hideToast } = useToast()

  return (
    <section className="collection-page">
      <header className="collection-header">
        <h1 className="collection-title">Collection Breakdown</h1>
      </header>
      {toast ? ( <Toast message={toast.message} variant={toast.variant} onClose={hideToast} /> ) : null}
      <CollectionForm onToast={showToast} />
      <CollectionList />
    </section>
  )
}

export default CollectionPage
