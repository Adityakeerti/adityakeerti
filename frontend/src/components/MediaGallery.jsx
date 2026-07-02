import { useState, useRef } from 'react'

function isVideo(url) {
    if (typeof url !== 'string') return false
    const cleanUrl = url.split('?')[0].split('#')[0]
    return /\.(mp4|webm|ogg|mov)$/i.test(cleanUrl)
}

function getYouTubeId(url) {
    if (typeof url !== 'string') return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function MediaGallery({ items = [], alt = 'Media gallery' }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [failedItems, setFailedItems] = useState({})
    const scrollRef = useRef(null)

    // Normalize items to array of objects { type: 'image'|'video'|'youtube', url: string, ytId?: string }
    const normalizedItems = items.map(item => {
        const itemUrl = typeof item === 'string' ? item : item.url;
        const ytId = getYouTubeId(itemUrl);
        if (ytId) {
            return {
                type: 'youtube',
                url: itemUrl,
                ytId
            }
        }

        if (typeof item === 'string') {
            return {
                type: isVideo(item) ? 'video' : 'image',
                url: item
            }
        }
        return {
            type: item.type || (isVideo(item.url) ? 'video' : 'image'),
            url: item.url
        }
    }).filter(item => !!item.url)

    if (normalizedItems.length === 0) return null

    const handleScroll = () => {
        if (!scrollRef.current) return
        const { scrollLeft, clientWidth } = scrollRef.current
        const newIndex = Math.round(scrollLeft / clientWidth)
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < normalizedItems.length) {
            setActiveIndex(newIndex)
        }
    }

    const scrollTo = (index) => {
        if (!scrollRef.current) return
        const { clientWidth } = scrollRef.current
        scrollRef.current.scrollTo({
            left: index * clientWidth,
            behavior: 'smooth'
        })
        setActiveIndex(index)
    }

    const next = () => {
        if (activeIndex < normalizedItems.length - 1) {
            scrollTo(activeIndex + 1)
        }
    }

    const prev = () => {
        if (activeIndex > 0) {
            scrollTo(activeIndex - 1)
        }
    }

    const handleMediaError = (index) => {
        setFailedItems(prev => ({ ...prev, [index]: true }))
    }

    return (
        <div className="media-gallery">
            {/* Main scroll track */}
            <div 
                className="gallery-track" 
                ref={scrollRef} 
                onScroll={handleScroll}
            >
                {normalizedItems.map((item, index) => {
                    const isFailed = failedItems[index]
                    
                    return (
                        <div key={index} className="gallery-slide">
                            {isFailed ? (
                                <div className="gallery-fallback-card">
                                    <div className="gallery-fallback-glow" />
                                    <div className="gallery-fallback-content">
                                        <span className="gallery-fallback-icon">
                                            {item.type === 'image' ? '📷' : '🎥'}
                                        </span>
                                        <p className="gallery-fallback-title">
                                            {item.type === 'image' ? 'Image Showcase' : 'Video Showcase'}
                                        </p>
                                        <p className="gallery-fallback-sub">
                                            {alt} · Media Coming Soon
                                        </p>
                                    </div>
                                </div>
                            ) : item.type === 'youtube' ? (
                                <div className="gallery-video-wrapper">
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${item.ytId}?autoplay=0&rel=0&modestbranding=1`}
                                        title={`${alt} - YouTube Video`}
                                        className="gallery-video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            ) : item.type === 'video' ? (
                                <div className="gallery-video-wrapper">
                                    <video 
                                        src={item.url} 
                                        className="gallery-video" 
                                        controls 
                                        autoPlay
                                        loop 
                                        muted 
                                        playsInline
                                        preload="metadata"
                                        onError={() => handleMediaError(index)}
                                    />
                                </div>
                            ) : (
                                <img 
                                    src={item.url} 
                                    alt={`${alt} - Slide ${index + 1}`} 
                                    className="gallery-image" 
                                    loading="lazy"
                                    onError={() => handleMediaError(index)}
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Navigation arrows — only show if more than 1 item */}
            {normalizedItems.length > 1 && (
                <>
                    <button 
                        className="gallery-arrow arrow-left" 
                        onClick={prev}
                        disabled={activeIndex === 0}
                        aria-label="Previous slide"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button 
                        className="gallery-arrow arrow-right" 
                        onClick={next}
                        disabled={activeIndex === normalizedItems.length - 1}
                        aria-label="Next slide"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </>
            )}

            {/* Pagination dots */}
            {normalizedItems.length > 1 && (
                <div className="gallery-dots">
                    {normalizedItems.map((_, index) => (
                        <button
                            key={index}
                            className={`gallery-dot ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
