import React from "react"

import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

function getOrbitArmTransform(angle: number, radius: number): string {
  return `translate(-50%, -50%) rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg)`
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  style,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childCount = React.Children.count(children)

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            cx="50%"
            cy="50%"
            fill="none"
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = childCount > 0 ? (360 / childCount) * index : 0

        return (
          <div
            key={index}
            style={
              {
                "--duration": String(calculatedDuration),
                "--radius": String(radius),
                "--angle": String(angle),
                "--icon-size": `${iconSize}px`,
                transform: getOrbitArmTransform(angle, radius),
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "animate-orbit absolute left-1/2 top-1/2 flex size-(--icon-size) items-center justify-center overflow-hidden",
              reverse && "[animation-direction:reverse]",
              className,
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
