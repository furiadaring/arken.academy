'use client'
export const GoUp = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <button
      onClick={handleScroll}
      className="bg-accent fixed right-5 bottom-5 z-15 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full opacity-30 transition-all duration-300 ease-in-out hover:opacity-100 active:opacity-100"
    >
      <svg width="24" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.8048 3.08546L20.1343 3.0965L20.117 12.3642L28.226 11.539L32.9506 16.2636L28.4745 20.7396L20.117 12.3821L20.0873 28.8589L13.7579 28.8479L13.7883 12.0527L5.34994 20.4911L0.873901 16.015L13.8041 3.08477L13.8048 3.08546Z"
          fill="#0D0D0C"
        />
      </svg>
    </button>
  )
}
