'use client'

import { useVideoContext } from '@/context/video-context'
import { MouseEvent, useEffect, useId, useRef, useState } from 'react'

type TVideoPlayerProps = {
  src: string
  className?: string
  autoPlay?: boolean
  videoId?: string
}

export const VideoPlayer = ({ src, className = '', autoPlay = true, videoId }: TVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId()
  const id = videoId || uniqueId
  const { currentlyPlayingId, setCurrentlyPlayingId, playVideo } = useVideoContext()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVisible || !videoRef.current) return

    const video = videoRef.current

    if (video.getAttribute('data-src')) {
      video.src = video.getAttribute('data-src') || ''
      video.load()
      setIsLoaded(true)

      if (autoPlay) {
        setIsPlaying(true)
      }
    }
  }, [isVisible, autoPlay])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      video.currentTime = 0
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [isLoaded])

  useEffect(() => {
    if (currentlyPlayingId === id) {
      setIsPlaying(true)
    } else if (currentlyPlayingId && currentlyPlayingId !== id && isPlaying) {
      setIsPlaying(false)
    }
  }, [currentlyPlayingId, id, isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.error('Video playback failed:', error)
        setIsPlaying(false)
        if (currentlyPlayingId === id) {
          setCurrentlyPlayingId(null)
        }
      }
    }

    if (isPlaying) {
      playVideo()
    } else {
      video.pause()
    }
  }, [isPlaying, isLoaded, id, currentlyPlayingId, setCurrentlyPlayingId])

  const handlePlayPause = () => {
    const newPlayState = !isPlaying

    if (newPlayState) {
      playVideo(id)
    } else if (currentlyPlayingId === id) {
      setCurrentlyPlayingId(null)
    }

    setIsPlaying(newPlayState)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleProgressChange = (event: MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const rect = container.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percentage = (x / rect.width) * 100

    if (videoRef.current) {
      const newTime = (percentage / 100) * videoRef.current.duration
      videoRef.current.currentTime = newTime
      setProgress(percentage)
    }
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {isVisible ? (
        <video
          ref={videoRef}
          className="z-10 h-full w-full object-cover"
          playsInline
          muted={isMuted}
          autoPlay={false}
          loop={false}
          onClick={handlePlayPause}
          poster={`/video/poster-${src.split('/').pop()?.split('.')[0] || '1'}.png`}
          data-src={src}
          preload="metadata"
        >
          {isLoaded && <source src={src} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-800">
          <div className="h-full w-full animate-pulse bg-gray-700"></div>
        </div>
      )}

      <div className="absolute top-5 right-5 z-20 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handlePlayPause()
          }}
          className="cursor-pointer rounded-full bg-[#00000080] p-3 text-lime-400 transition-all hover:bg-black/60"
          aria-label="Play"
          aria-labelledby="play-button"
          aria-controls="video"
          aria-expanded={isPlaying}
          aria-pressed={isPlaying}
          aria-disabled={isPlaying}
          aria-busy={isPlaying}
          aria-live="polite"
          aria-relevant="additions removals"
          aria-atomic="true"
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L18 12L6 20V4Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <div className="absolute top-20 right-5 z-20 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleMuteToggle()
          }}
          className="cursor-pointer rounded-full bg-[#00000080] p-3 text-lime-400 transition-all hover:bg-black/60"
          aria-label="Mute"
          aria-labelledby="mute-button"
          aria-controls="video"
          aria-expanded={isMuted}
          aria-pressed={isMuted}
          aria-disabled={isMuted}
          aria-busy={isMuted}
          aria-live="polite"
          aria-relevant="additions removals"
          aria-atomic="true"
        >
          {isMuted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
              <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1082_1756)">
                <path
                  d="M3 8.99998V15H7L12 20V3.99998L7 8.99998H3ZM10 8.82998V15.17L7.83 13H5V11H7.83L10 8.82998ZM16.5 12C16.5 10.23 15.48 8.70998 14 7.96998V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.22998V5.28998C16.89 6.14998 19 8.82998 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.71998 18.01 4.13998 14 3.22998Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1082_1756">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-0 z-20 w-full bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="mb-2 ml-5 text-xs text-white">{formatTime(currentTime)}</div>
          <div className="flex w-full items-center">
            <div className="relative h-2 w-full cursor-pointer rounded-full bg-white/20" onClick={handleProgressChange}>
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-lime-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
