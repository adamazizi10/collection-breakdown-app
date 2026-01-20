const isValidDateString = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

const isWithinYearRange = (value, minYear, maxYear) => {
  const year = Number(value.slice(0, 4))
  return Number.isFinite(year) && year >= minYear && year <= maxYear
}

const validateAmount = (value, label) => {
  if (value.trim() === '') {
    return `${label} is required.`
  }
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) {
    return `${label} must be a number.`
  }
  if (numericValue < 0) {
    return `${label} must be 0 or greater.`
  }
  return null
}

export const validateValues = (values) => {
  const errors = {}

  if (values.clinic.trim() === '') {
    errors.clinic = 'Clinic code is required.'
  }

  if (!isValidDateString(values.date)) {
    errors.date = 'Please enter a real date in YYYY-MM-DD format'
  } else if (values.date.trim() === '') {
    errors.date = 'Date is required.'
  } else if (!isWithinYearRange(values.date, 2020, 2030)) {
    errors.date = 'Date must be between 2020 and 2030.'
  }

  const creditError = validateAmount(values.collection_credit, 'Credit amount')
  if (creditError) errors.collection_credit = creditError

  const cashError = validateAmount(values.collection_cash, 'Cash amount')
  if (cashError) errors.collection_cash = cashError

  const eftError = validateAmount(values.collection_eft, 'EFT amount')
  if (eftError) errors.collection_eft = eftError

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
