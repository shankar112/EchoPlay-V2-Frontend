// src/components/FeaturedCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const FeaturedCarousel = ({ tracks }) => {
  const navigate = useNavigate();

  if (!tracks || tracks.length === 0) return null;

  // Take first 6 songs for featured
  const featuredTracks = tracks.slice(0, 7);

  return (
    <div className="featured-carousel-container">
      <h2 style={{marginBottom: '0px', border: 'none'}}>Featured Picks</h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        coverflowEffect={{
          rotate: 30, // Rotate side slides
          stretch: 0,
          depth: 100, // 3D depth
          modifier: 1,
          slideShadows: true, // Adds shadow for depth
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {featuredTracks.map((track) => {
           let imageUrl = track.coverArtPath;
           if (track.coverArtPath && track.coverArtPath.startsWith('/')) {
             imageUrl = `${apiClient.defaults.baseURL}${track.coverArtPath}`;
           }
           
           return (
            <SwiperSlide key={track._id} onClick={() => navigate(`/track/${track._id}`)}>
              <img 
                src={imageUrl || "https://placehold.co/400?text=Music"} 
                alt={track.title}
                onError={(e) => e.target.src = "https://placehold.co/400?text=No+Image"} 
              />
              <div style={{
                position: 'absolute', 
                bottom: '10px', 
                left: '10px', 
                background: 'rgba(0,0,0,0.7)', 
                padding: '5px 10px', 
                borderRadius: '5px',
                backdropFilter: 'blur(5px)'
              }}>
                <strong style={{display: 'block', fontSize: '0.9rem'}}>{track.title}</strong>
                <span style={{fontSize: '0.75rem', color: '#ccc'}}>{track.artist}</span>
              </div>
            </SwiperSlide>
           );
        })}
      </Swiper>
    </div>
  );
};

export default FeaturedCarousel;