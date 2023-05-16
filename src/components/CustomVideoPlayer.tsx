// components/CustomVideoPlayer.tsx
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { MdPlayArrow, MdPause } from "react-icons/md";

interface CustomVideoPlayerProps {
  src: string;
  onCanPlayThrough: any;
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  height: 100%;
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlButton = styled.button`
  background: rgba(80, 80, 80, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 12px;
  color: white;
  cursor: pointer;
  font-size: 36px;
  outline: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(80, 80, 80, 0.8);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, onCanPlayThrough }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("play", () => setIsPlaying(true));
      videoElement.addEventListener("pause", () => setIsPlaying(false));
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", () => setIsPlaying(true));
        videoElement.removeEventListener("pause", () => setIsPlaying(false));
      }
    };
  }, []);

  const togglePlayPause = (e: any) => {
    e.preventDefault();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <VideoContainer>
      <Video onCanPlayThrough={onCanPlayThrough} src={src} ref={videoRef} />
      <VideoControls>
        <ControlButton onClick={togglePlayPause}>{isPlaying ? <MdPause /> : <MdPlayArrow />}</ControlButton>
      </VideoControls>
    </VideoContainer>
  );
};

export default CustomVideoPlayer;
