import React from 'react'

const EmptyChatState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-base-100 p-8">
      {/* Animated grid pattern */}
      <div className="grid grid-cols-3 gap-3 mb-8 w-48 h-48">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg bg-primary/10 ${
              i % 2 === 0 ? "animate-pulse" : ""
            } border border-primary/20`}
          />
        ))}
      </div>

      {/* Text content */}
      <h2 className="text-xl font-semibold mb-2 text-base-content">
        Select a user or group
      </h2>
      <p className="text-base-content/60 mb-6">
        Start chatting by selecting a contact from your list
      </p>

      {/* Optional decorative elements */}
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-primary/20 animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default EmptyChatState