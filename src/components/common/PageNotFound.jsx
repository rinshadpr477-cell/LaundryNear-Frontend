import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-6">

      <div className="bg-white border border-[#E7DED1] rounded-[32px] p-12 max-w-2xl w-full text-center shadow-sm">

        <p className="uppercase tracking-[6px] text-sm text-[#6B4F3B] mb-4">
          Error
        </p>

        <h1 className="text-6xl md:text-8xl font-serif text-[#1A1A1A] mb-6">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
          Page not found.
        </h2>

        <p className="text-[#6B4F3B] leading-8 mb-10">
          The page you are trying to access does not exist or may have been removed.
        </p>

        <Link
          to="/"
          className="inline-block bg-[#3F2F24] text-white px-8 py-4 rounded-full hover:bg-[#2B211A] duration-300"
        >
          Back to Home
        </Link>

      </div>

    </div>
  )
}

export default PageNotFound