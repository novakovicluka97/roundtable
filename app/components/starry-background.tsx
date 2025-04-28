"use client"

import { useEffect } from "react"

export default function StarryBackground() {
  useEffect(() => {
    // Create stars directly in the DOM for maximum compatibility
    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.top = "0"
    container.style.left = "0"
    container.style.width = "100%"
    container.style.height = "100%"
    container.style.overflow = "hidden"
    container.style.zIndex = "-100"
    container.style.backgroundColor = "black"
    document.body.appendChild(container)

    // Create stars with different sizes and animations
    const starCount = 100 // Reduced count for a more subtle effect
    const colors = ["#a19d94", "#e0dfd5", "#8a8782", "#d3d1c7"] // Colors from the image palette

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")

      // Random properties
      const size = Math.random() * 3 + 1 // Smaller size for subtlety
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * 10
      const duration = Math.random() * 3 + 2
      const colorIndex = Math.floor(Math.random() * colors.length)

      // Set styles
      star.style.position = "absolute"
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.borderRadius = "50%"
      star.style.backgroundColor = colors[colorIndex]
      star.style.boxShadow = `0 0 ${size}px ${size / 2}px ${colors[colorIndex]}`
      star.style.left = `${x}%`
      star.style.top = `${y}%`
      star.style.opacity = `${Math.random() * 0.5 + 0.1}` // More subtle opacity

      // Animation
      star.style.animation = `twinkle ${duration}s infinite ${delay}s`

      // Add to container
      container.appendChild(star)
    }

    // Add CSS animations to the document
    const style = document.createElement("style")
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.1; }
        50% { opacity: 0.3; }
        100% { opacity: 0.1; }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.body.removeChild(container)
      document.head.removeChild(style)
    }
  }, [])

  return null
}
