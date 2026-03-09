import { cn } from '@/lib/utils'
import React, { useEffect, useState, useMemo } from 'react'

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
  delay = 10,
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

  // Generate stable random factors only on the client
  const randomFactors = useMemo(() => {
    if (!mounted || !randomSpeed) return null
    // Random factor between 0.7 and 1.2 for a more subtle variation
    return React.Children.map(children, () => 0.7 + Math.random() * 0.5)
  }, [mounted, randomSpeed, children])

  const calculatedDuration = duration / speed

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

          // Use random factor if mounted and randomSpeed is enabled, otherwise fallback to 1
          const randomFactor = randomFactors ? randomFactors[index] : 1
          const individualDuration = calculatedDuration / randomFactor

          return (
            <div
              style={
                {
                  '--duration': individualDuration,
                  '--radius': radius,
                  '--angle': angle,
                  '--icon-size': `${iconSize}px`,
                  '--delay': -delay,
                  animation: `orbit calc(var(--duration)*1s) linear infinite`,
                  animationDelay: `calc(var(--delay)*1000ms)`,
                  animationDirection: reverse ? 'reverse' : 'normal',
                } as React.CSSProperties
              }
              className={cn(`absolute flex size-full items-center justify-center rounded-full`)}
            >
              <div className="flex size-[var(--icon-size)] items-center justify-center">
                {child}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
