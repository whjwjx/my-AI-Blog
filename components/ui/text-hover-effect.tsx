'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string
  duration?: number
  className?: string
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn('select-none', className)}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor={'var(--color-primary-500)'} />
              <stop offset="25%" stopColor={'var(--color-primary-400)'} />
              <stop offset="50%" stopColor={'var(--color-primary-300)'} />
              <stop offset="75%" stopColor={'var(--color-primary-400)'} />
              <stop offset="100%" stopColor={'var(--color-primary-500)'} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2"
        className="fill-transparent stroke-neutral-200 font-sans text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0.2 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2"
        className="fill-transparent stroke-neutral-200 font-sans text-7xl font-bold dark:stroke-neutral-800"
        initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="2"
        mask="url(#textMask)"
        className="fill-transparent font-sans text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}
