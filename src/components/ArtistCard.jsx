import Image from 'next/image'
import React from 'react'

const ArtistCard = () => {
  return (
    <div class="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
    <div class="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
      <Image
        class="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
        src="https://avatars.githubusercontent.com/u/67946056?v=4"
        alt="artist image"
      />
      <div class="text-center mt-2 text-3xl font-medium">Ajo Alex</div>
      <div class="text-center mt-2 font-light text-sm">@devpenzil</div>
      <div class="text-center font-normal text-lg">Kathmandu</div>
      <div class="px-6 text-center mt-2 font-light text-sm">
        <p>Full time professional digital artist.</p>
      </div>
      <hr class="mt-8" />
      <div class="flex p-4">
        <div class="w-1/2 text-center">
          <span class="font-bold">1.8 k</span> Followers
        </div>
        <div class="w-0 border border-gray-300"></div>
        <div class="w-1/2 text-center">
          <span class="font-bold">2.0 M</span> Likes
        </div>
      </div>
    </div>
  </div>
  )
}

export default ArtistCard