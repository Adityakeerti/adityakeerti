import { useState, useRef, useEffect } from 'react'

let ytApiPromise = null
function loadYouTubeApi() {
    if (ytApiPromise) return ytApiPromise
    ytApiPromise = new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT)
            return
        }
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        
        const previousReady = window.onYouTubeIframeAPIReady
        window.onYouTubeIframeAPIReady = () => {
            if (previousReady) previousReady()
            resolve(window.YT)
        }
    })
    return ytApiPromise
}

export default function CustomVideoPlayer({ type, src, ytId, alt = 'Video player' }) {
    const containerRef = useRef(null)
    const videoRef = useRef(null)
    const playerRef = useRef(null)
    const iframeId = useRef(`yt-player-${Math.random().toString(36).substr(2, 9)}`)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showControls, setShowControls] = useState(true)
    const [controlsTimeout, setControlsTimeout] = useState(null)
    const [isReady, setIsReady] = useState(false)

    // Load YouTube Player if type is youtube
    useEffect(() => {
        if (type !== 'youtube' || !ytId) return

        let active = true
        loadYouTubeApi().then((YT) => {
            if (!active) return
            playerRef.current = new YT.Player(iframeId.current, {
                videoId: ytId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    disablekb: 1,
                    fs: 0,
                    origin: window.location.origin
                },
                events: {
                    onReady: (event) => {
                        setIsReady(true)
                        setDuration(event.target.getDuration())
                        if (isMuted) event.target.mute()
                    },
                    onStateChange: (event) => {
                        // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
                        if (event.data === YT.PlayerState.PLAYING) {
                            setIsPlaying(true)
                        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                            setIsPlaying(false)
                        }
                    }
                }
            })
        })

        return () => {
            active = false
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy()
            }
        }
    }, [type, ytId])

    // HTML5 Video event listeners
    useEffect(() => {
        if (type !== 'video' || !videoRef.current) return
        const video = videoRef.current

        const onPlay = () => setIsPlaying(true)
        const onPause = () => setIsPlaying(false)
        const onTimeUpdate = () => setCurrentTime(video.currentTime)
        const onDurationChange = () => setDuration(video.duration)

        video.addEventListener('play', onPlay)
        video.addEventListener('pause', onPause)
        video.addEventListener('timeupdate', onTimeUpdate)
        video.addEventListener('durationchange', onDurationChange)

        return () => {
            video.removeEventListener('play', onPlay)
            video.removeEventListener('pause', onPause)
            video.removeEventListener('timeupdate', onTimeUpdate)
            video.removeEventListener('durationchange', onDurationChange)
        }
    }, [type, src])

    // Update current time for YouTube
    useEffect(() => {
        if (type !== 'youtube') return
        let interval
        if (isPlaying && playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
            interval = setInterval(() => {
                setCurrentTime(playerRef.current.getCurrentTime())
            }, 250)
        }
        return () => clearInterval(interval)
    }, [isPlaying, type])

    // Auto-hide controls when playing
    const triggerControlsTimer = () => {
        if (controlsTimeout) clearTimeout(controlsTimeout)
        setShowControls(true)
        if (isPlaying) {
            const timeout = setTimeout(() => {
                setShowControls(false)
            }, 2500)
            setControlsTimeout(timeout)
        }
    }

    useEffect(() => {
        triggerControlsTimer()
        return () => {
            if (controlsTimeout) clearTimeout(controlsTimeout)
        }
    }, [isPlaying])

    const handleMouseMove = () => {
        triggerControlsTimer()
    }

    const togglePlay = () => {
        if (type === 'video' && videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch(() => {})
            }
        } else if (type === 'youtube' && playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo()
            } else {
                playerRef.current.playVideo()
            }
        }
    }

    const toggleMute = () => {
        const nextMuted = !isMuted
        setIsMuted(nextMuted)
        
        if (type === 'video' && videoRef.current) {
            videoRef.current.muted = nextMuted
        } else if (type === 'youtube' && playerRef.current) {
            if (nextMuted) {
                playerRef.current.mute()
            } else {
                playerRef.current.unMute()
            }
        }
    }

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value)
        setCurrentTime(newTime)
        
        if (type === 'video' && videoRef.current) {
            videoRef.current.currentTime = newTime
        } else if (type === 'youtube' && playerRef.current) {
            playerRef.current.seekTo(newTime, true)
        }
    }

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00'
        const mins = Math.floor(time / 60)
        const secs = Math.floor(time % 60)
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <div 
            className={`custom-player ${showControls ? 'show-controls' : 'hide-controls'}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Media elements */}
            <div className="player-media-container" onClick={togglePlay}>
                {type === 'youtube' ? (
                    <div className="yt-iframe-container">
                        <div id={iframeId.current} className="yt-iframe" />
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        src={src}
                        className="player-video-element"
                        loop
                        muted={isMuted}
                        playsInline
                        preload="metadata"
                    />
                )}
            </div>

            {/* Custom Control Overlay */}
            <div className="player-controls">
                {/* Progress bar */}
                <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="player-seekbar"
                    aria-label="Video timeline scrubber"
                />

                <div className="player-controls-row">
                    {/* Left: Play/Pause and Mute/Unmute */}
                    <div className="player-controls-group">
                        <button onClick={togglePlay} className="player-btn" aria-label={isPlaying ? 'Pause' : 'Play'}>
                            {isPlaying ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            )}
                        </button>

                        <button onClick={toggleMute} className="player-btn" aria-label={isMuted ? 'Unmute' : 'Mute'}>
                            {isMuted ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                            )}
                        </button>

                        <span className="player-time">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Right: Badge matching R.A.G.E. theme */}
                    <div className="player-controls-group">
                        <span className="player-badge">
                            {type === 'youtube' ? 'YouTube Stream' : 'Teaser clip'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
