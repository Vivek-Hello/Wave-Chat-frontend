import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SignUpLoginDesigne = () => {
  const cubeRef = useRef(null)

  useEffect(() => {
    gsap.to(cubeRef.current, {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: "none"
    })
  }, [])

  return (
    <div className="hidden lg:flex h-full items-center justify-center bg-base-200 p-12">
      <div className="max-w-lg text-center">
        {/* Animated Grid Cube */}
        <div 
          ref={cubeRef}
          className="grid grid-cols-3 gap-3 mb-8 mx-auto w-48 h-48"
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              } border border-primary/20`}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Join WaveChat</h2>
        <p className="text-base-content/60">
          Connect with your Friends
        </p>
        <p className="text-base-content/60">
        please Login or SignUp to Start Chating
        </p>
      </div>
    </div>
  )
}

export default SignUpLoginDesigne