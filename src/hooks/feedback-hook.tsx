import { useState } from 'react';

export function useFeedback() {
  const [feedback, setFeedback] = useState()
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  function toggleFeedback() {
    setIsFeedbackOpen(prev => !prev)
  }

  return { feedback, isFeedbackOpen, toggleFeedback }
}