import { useCallback, useState } from 'react'

export const useToast = () => {
  const [toast, setToast] = useState(null)

  const showToast = useCallback(({ message, variant }) => {
    setToast({ message, variant })
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  return { toast, showToast, hideToast }
}
