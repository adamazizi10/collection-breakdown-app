import { useCallback, useEffect, useState } from 'react'

function Toast({ message, variant, onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const exitDurationMs = 200

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsVisible(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, exitDurationMs)
  }, [onClose])

  useEffect(() => {
    if (!message) return undefined
    const timer = setTimeout(() => {
      handleClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [message, handleClose])

  return (
    <div
      className={`toast toast-${variant} ${isVisible ? 'toast-visible' : 'toast-hidden'}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button className="toast-close" type="button" onClick={handleClose}>
        ×
      </button>
    </div>
  )
}

export default Toast
