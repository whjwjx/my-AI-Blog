import { cn } from '@/lib/utils'
import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export interface OrbitingCirclesProps {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
  randomSpeed?: boolean
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 0,
  radius = 50,
  path = true,
  iconSize = 30,
  speed = 1,
  randomSpeed = false,
}: OrbitingCirclesProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const randomFactors = useMemo(() => {
    if (!mounted || !randomSpeed) return null
    return React.Children.map(children, () => 0.8 + Math.random() * 0.4)
  }, [mounted, randomSpeed, children])

  const calculatedDuration = duration / speed

  if (!mounted) return null

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        className={cn(
          'absolute flex size-full items-center justify-center rounded-full border-none bg-transparent',
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          const angle = (360 / React.Children.count(children)) * index
          const randomFactor = randomFactors ? randomFactors[index] : 1
          const individualDuration = calculatedDuration / randomFactor

          return (
            <motion.div
              style={
                {
                  '--icon-size': `${iconSize}px`,
                  position: 'absolute',
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                } as React.CSSProperties
              }
              animate={{
                rotate: reverse ? [angle, angle - 360] : [angle, angle + 360],
              }}
              transition={{
                duration: individualDuration,
                repeat: Infinity,
                ease: 'linear',
                delay: -delay,
              }}
            >
              <motion.div
                style={{
                  width: 'var(--icon-size)',
                  height: 'var(--icon-size)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                initial={{ y: radius }}
                animate={{
                  rotate: reverse ? [-angle, -angle + 360] : [-angle, -angle - 360],
                }}
                transition={{
                  duration: individualDuration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: -delay,
                }}
              >
                {child}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
