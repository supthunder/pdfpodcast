'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PlayIcon, PauseIcon, RotateCcwIcon } from 'lucide-react';

interface PlayPodcastProps {
  audioUrl: string | null;
}

export function PlayPodcast({ audioUrl }: PlayPodcastProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.addEventListener('loadedmetadata', () => setDuration(newAudio.duration));
      newAudio.addEventListener('timeupdate', () => setCurrentTime(newAudio.currentTime));
      return () => {
        newAudio.pause();
        newAudio.src = '';
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const resetAudio = () => {
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audio.play();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) return null;

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Listen to Your Podcast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4 mb-4">
          <Button onClick={togglePlayPause} variant="outline" size="icon">
            {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          </Button>
          <Button onClick={resetAudio} variant="outline" size="icon">
            <RotateCcwIcon className="h-4 w-4" />
          </Button>
        </div>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSliderChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </CardContent>
    </Card>
  );
}