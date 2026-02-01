import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Typewriter({ words, className = '', speed = 100, deleteSpeed = 50, pauseTime = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, pauseTime])

  return (
    <span className={className}>
      {currentText}
      <span className="typewriter-cursor" />
    </span>
  )
}

export function TypewriterOnce({ text, className = '', speed = 40, delay = 0, onComplete }) {
  const [currentText, setCurrentText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    
    if (currentText.length < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(text.slice(0, currentText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentText, text, speed, started, onComplete])

  return (
    <span className={className}>
      {currentText}
      {currentText.length < text.length && started && <span className="typewriter-cursor" />}
    </span>
  )
}

export function StaggerText({ text, className = '', staggerDelay = 0.02, initialDelay = 0 }) {
  const characters = text.split('')

  return (
    <motion.span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: initialDelay + index * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
