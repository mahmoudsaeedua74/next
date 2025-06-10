import React from 'react'
import { Button } from '../ui/Button/Button'
import Link from 'next/link'

export default function EmptyWishlist() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
    <div className="bg-gray-50 rounded-lg p-8 max-w-lg mx-auto">
      <div className=" mb-4">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <p className="text-lg">Nothing here... yet.</p>
        <p className="mt-2">Start adding products you like to your wishlist!</p>
      </div>
      <Link href="/" className="inline-block">
        <Button variant='default'>Continue Shopping</Button>
      </Link>
    </div>
  </div>
  )
}
