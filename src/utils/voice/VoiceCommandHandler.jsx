import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { VoiceEngine } from './VoiceEngine'; // Corrected Path: same folder

export const VoiceCommandHandler = ({ active }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (active) {
      console.log("Voice System Initialized for:", user?.email);
      VoiceEngine.start();
    } else {
      VoiceEngine.stop();
    }
  }, [active, user]);

  return null; 
};
