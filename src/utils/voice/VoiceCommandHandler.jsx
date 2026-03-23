import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { VoiceEngine } from './VoiceEngine';

export const VoiceCommandHandler = ({ active }) => {
  const { user } = useAuth();

  useEffect(() => {
    try {
      if (active) {
        console.log("Voice Active for:", user?.email);
        // Optional chaining (?.) stops the "is not a function" error
        VoiceEngine?.start?.();
      } else {
        VoiceEngine?.stop?.();
      }
    } catch (error) {
      console.error("Voice Engine Error:", error);
    }
  }, [active, user]);

  return null; 
};
