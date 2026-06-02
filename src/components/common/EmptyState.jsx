import React from 'react'

function EmptyState({ title, message }) {
  return (
    <div className="bg-white border border-[#E7DED1] rounded-[32px] p-14 text-center">

      <h2 className="text-4xl font-serif text-[#1A1A1A] mb-4">
        {title}
      </h2>

      <p className="text-[#6B4F3B] leading-8 max-w-xl mx-auto">
        {message}
      </p>

    </div>
  )
}

export default EmptyState