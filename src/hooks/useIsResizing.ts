import { useEffect, useRef, useState } from "react"

export default function useIsResizing(): {
  isResizing: boolean
  prevWidth: number
} {
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const prevWidthRef = useRef<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const difference = Math.abs(newWidth - prevWidthRef.current)

      if (difference >= 1) {
        setIsResizing(true)
        prevWidthRef.current = newWidth
        setTimeout(() => {
          setIsResizing(false)
        }, 100)
      } else {
        if (isResizing) {
          setIsResizing(false)
        }
      }
    }

    window.addEventListener("resize", handleResize, true)

    return () => {
      window.removeEventListener("resize", handleResize, true)
    }
  }, [isResizing])

  return { isResizing, prevWidth: prevWidthRef.current }
}
