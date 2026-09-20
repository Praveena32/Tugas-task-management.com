import React, { useState } from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import meditationImg from '../../assets/meditation.png';
import avatar1Img from '../../assets/avatar1.png';
import avatar2Img from '../../assets/avatar2.png';

export const IllustrationPanel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 480, md: 540, lg: 600 },
        height: { xs: 'auto', md: 'calc(100vh - 36px)' },
        minHeight: { xs: 360, sm: 400, md: 460 },
        maxHeight: { md: 600 },
        backgroundColor: '#F5F6EE',
        border: '1.5px solid #F5F6EE',
        borderRadius: { xs: '24px', md: '32px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: { xs: 3, sm: 4, md: 4.5 },
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Top spacer */}
      <Box sx={{ width: '100%', height: 4 }} />

      {/* Main Illustration & Floating Widgets Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 370,
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 'auto',
        }}
      >
        {/* Central Meditation Illustration */}
        <Box
          component="img"
          src={meditationImg}
          alt="Tuga's App Meditation and Productivity"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '10px',
            mixBlendMode: 'multiply',
            transition: 'transform 0.4s ease',
            '&:hover': {
              transform: 'scale(1.025)',
            },
          }}
        />

        {/* Floating Avatar 1 (Top Left) */}
        <Box
          sx={{
            position: 'absolute',
            top: '7%',
            left: '5%',
            zIndex: 2,
            animation: 'floatSlow 4s ease-in-out infinite',
            '@keyframes floatSlow': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-6px)' },
            },
          }}
        >
          <Avatar
            src={avatar1Img}
            alt="Team member"
            sx={{
              width: 80,
              height: 80,
              border: '1.5px solid #0c0c0cff',
              boxShadow: '0 8px 16px rgba(132, 204, 22, 0.25)',
              backgroundColor: '#FFFFFF',
            }}
          />
        </Box>

        {/* Floating Avatar 2 (Bottom Right) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '22%',
            right: '3%',
            zIndex: 2,
            animation: 'floatSlow2 4.5s ease-in-out infinite',
            '@keyframes floatSlow2': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(7px)' },
            },
          }}
        >
          <Avatar
            src={avatar2Img}
            alt="Collaborator"
            sx={{
              width: 70,
              height: 70,
              border: '1.5px solid #0a0b0bff',
              boxShadow: '0 8px 16px rgba(243, 239, 239, 0.15)',
              backgroundColor: '#FFFFFF',
            }}
          />
        </Box>

        {/* Floating "Canva Design" Task Badge (Bottom Left) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '0%',
            zIndex: 3,
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            p: 1.5,
            width: 140,
            boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
            border: '1px solid #595f6aff',
            animation: 'floatCard 5s ease-in-out infinite',
            '@keyframes floatCard': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-5px)' },
            },
          }}
        >
          {/* Header Row: Title & Circular Progress */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 200,
                  fontSize: '0.8rem',
                  color: '#111827',
                  lineHeight: 1.2,
                }}
              >
                Canva Design
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.675rem',
                  color: '#9CA3AF',
                  lineHeight: 1.3,
                }}
              >
                10 Task
              </Typography>
            </Box>

            {/* Circular Progress Gauge */}
            <Box sx={{ position: 'relative', width: 34, height: 34 }}>
              <svg width="34" height="34" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#000000ff"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#9FD094"
                  strokeWidth="3.5"
                  strokeDasharray="84, 100"
                  strokeLinecap="round"
                />
              </svg>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '0.5625rem',
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                84%
              </Typography>
            </Box>
          </Box>

          {/* Design Tag */}
          <Chip
            label="Design"
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: '0.625rem',
              fontWeight: 300,
              borderColor: '#666667ff',
              color: '#070707ff',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        </Box>
      </Box>

      {/* Bottom Section: Carousel Dots & Subtitle */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1.5 }}>
        {/* Pagination Dots */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.75 }}>
          {[0, 1, 2].map((index) => {
            const isActive = activeSlide === index;
            return (
              <Box
                key={index}
                onClick={() => setActiveSlide(index)}
                sx={{
                  cursor: 'pointer',
                  width: isActive ? 22 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: isActive ? '#1F2937' : '#D1D5DB',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isActive ? '#111827' : '#9CA3AF',
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Bottom Caption */}
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: '2.5rem', sm: '1.075rem' },
            color: '#111827',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Make your work easier and organized with
          <br />
          <Box component="span" sx={{ fontWeight: 600 }}>
            Tuga's App
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};
