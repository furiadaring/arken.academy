'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'

type TVideoContextType = {
  currentlyPlayingId: string | null
  setCurrentlyPlayingId: (id: string | null) => void
  playVideo: (id: string) => void
}

const VideoContext = createContext<TVideoContextType | undefined>(undefined)

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null)

  const playVideo = useCallback((id: string) => {
    setCurrentlyPlayingId(id)
  }, [])

  return (
    <VideoContext.Provider value={{ currentlyPlayingId, setCurrentlyPlayingId, playVideo }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideoContext = (): TVideoContextType => {
  const context = useContext(VideoContext)
  
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider')
  }
  
  return context
}
