import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEntry, cancelEdit, updateEntry } from '../../../features/collection/collectionSlice'
import {
  selectEditingEntry,
  selectEntries,
} from '../../../features/collection/collectionSelectors'
import { validateValues } from '../../../features/collection/collectionValidation'

const initialValues = {
  clinic: '',
  date: '',
  collection_credit: '',
  collection_cash: '',
  collection_eft: '',
}

const fieldNames = Object.keys(initialValues)

function CollectionForm({ onToast }) {
  const dispatch = useDispatch()
  const editingEntry = useSelector(selectEditingEntry)
  const entries = useSelector(selectEntries)
  const [values, setValues] = useState(initialValues)
  const [showRequiredErrors, setShowRequiredErrors] = useState(false)
  const [touched, setTouched] = useState(() =>
    fieldNames.reduce((accumulator, key) => {
      accumulator[key] = false
      return accumulator
    }, {}),
  )
  const [errors, setErrors] = useState({})

  const isRequiredError = (message) => message?.endsWith('is required.')
  const getErrors = (nextValues, includeRequired) => {
    const { errors: nextErrors } = validateValues(nextValues)
    if (includeRequired) return nextErrors

    return Object.fromEntries(
      Object.entries(nextErrors).filter(([, message]) => !isRequiredError(message)),
    )
  }

  const editingIndex = editingEntry
    ? entries.findIndex((entry) => entry.id === editingEntry.id) + 1
    : null

  const resetFormState = () => {
    setValues(initialValues)
    setShowRequiredErrors(false)
    setTouched(
      fieldNames.reduce((accumulator, key) => {
        accumulator[key] = false
        return accumulator
      }, {}),
    )
    setErrors({})
  }

  useEffect(() => {
    if (editingEntry) {
      setValues({
        clinic: editingEntry.clinic,
        date: editingEntry.date,
        collection_credit: String(editingEntry.collection_credit),
        collection_cash: String(editingEntry.collection_cash),
        collection_eft: String(editingEntry.collection_eft),
      })
      setTouched(
        fieldNames.reduce((accumulator, key) => {
          accumulator[key] = false
          return accumulator
        }, {}),
      )
      setErrors({})
    } else {
      resetFormState()
    }
  }, [editingEntry])

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(getErrors(nextValues, showRequiredErrors))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(getErrors(values, showRequiredErrors))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowRequiredErrors(true)
    const nextTouched = fieldNames.reduce((accumulator, key) => {
      accumulator[key] = true
      return accumulator
    }, {})
    setTouched(nextTouched)

    const { errors: nextErrors, isValid } = validateValues(values)
    setErrors(nextErrors)
    if (!isValid) {
      onToast({
        variant: 'error',
        message: 'Please fix the highlighted fields.',
      })
      return
    }

    const payload = {
      clinic: values.clinic.trim(),
      date: values.date,
      collection_credit: Number(values.collection_credit),
      collection_cash: Number(values.collection_cash),
      collection_eft: Number(values.collection_eft),
    }

    if (editingEntry) {
      dispatch(updateEntry({ id: editingEntry.id, ...payload }))
      onToast({
        variant: 'success',
        message: 'Entry updated successfully.',
      })
    } else {
      dispatch(addEntry(payload))
      onToast({
        variant: 'success',
        message: 'Entry added successfully.',
      })
    }

    resetFormState()
  }

  const handleCancelEdit = () => {
    dispatch(cancelEdit())
    resetFormState()
  }

  return (
    <form
      className={`collection-form${editingEntry ? ' collection-form-editing' : ''
        }`}
      onSubmit={handleSubmit}
    >
      {editingEntry ? (
        <h3 className="form-editing-title">Editing Entry {editingIndex}</h3>
      ) : null}
      <div className="form-grid">
        <div className="form-row form-row-two">
          <div className="form-field">
            <label htmlFor="clinic">
              Clinic Code<span className="required-indicator">*</span>
            </label>
            <input
              id="clinic"
              name="clinic"
              type="text"
              value={values.clinic}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Clinic Code"
            />
            {touched.clinic && errors.clinic ? (
              <span className="field-error">{errors.clinic}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="date">
              Date<span className="required-indicator">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Select Date"
            />
            {touched.date && errors.date ? (
              <span className="field-error">{errors.date}</span>
            ) : null}
          </div>
        </div>

        <div className="form-row form-row-three">
          <div className="form-field">
            <label htmlFor="collection_credit">
              Collection Credit<span className="required-indicator">*</span>
            </label>
            <div className="amount-input">
              <span className="amount-prefix" aria-hidden="true">
                $
              </span>
              <input
                id="collection_credit"
                name="collection_credit"
                type="number"
                step="0.01"
                value={values.collection_credit}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Credit Amount"
              />
            </div>
            {touched.collection_credit && errors.collection_credit ? (
              <span className="field-error">{errors.collection_credit}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="collection_cash">
              Collection Cash<span className="required-indicator">*</span>
            </label>
            <div className="amount-input">
              <span className="amount-prefix" aria-hidden="true">
                $
              </span>
              <input
                id="collection_cash"
                name="collection_cash"
                type="number"
                step="0.01"
                value={values.collection_cash}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Cash Amount"
              />
            </div>
            {touched.collection_cash && errors.collection_cash ? (
              <span className="field-error">{errors.collection_cash}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="collection_eft">
              Collection EFT<span className="required-indicator">*</span>
            </label>
            <div className="amount-input">
              <span className="amount-prefix" aria-hidden="true">
                $
              </span>
              <input
                id="collection_eft"
                name="collection_eft"
                type="number"
                step="0.01"
                value={values.collection_eft}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter EFT Amount"
              />
            </div>
            {touched.collection_eft && errors.collection_eft ? (
              <span className="field-error">{errors.collection_eft}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="form-actions form-actions-centered">
        {editingEntry ? (
          <button
            className="secondary-button"
            type="button"
            onClick={handleCancelEdit}
          >
            Cancel Edit
          </button>
        ) : null}
        <button
          className={`primary-button primary-button-lg${editingEntry ? ' primary-button-update' : ''
            }`}
          type="submit"
        >
          {editingEntry ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

export default CollectionForm
