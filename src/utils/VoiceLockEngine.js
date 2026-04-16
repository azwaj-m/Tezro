import { GlobalVoiceEngine } from './GlobalVoiceEngine';

export const VoiceLockEngine = {
  failedAttempts: 0,
  maxAttempts: 3,
  isPermanentlyLocked: false,

  verifyCodeWord: (input) => {
    if (VoiceLockEngine.isPermanentlyLocked) return "SYSTEM_DEAD";

    if (input === GlobalVoiceEngine.secretCode) {
      VoiceLockEngine.failedAttempts = 0;
      return "ACCESS_GRANTED";
    } else {
      VoiceLockEngine.failedAttempts++;
      if (VoiceLockEngine.failedAttempts >= VoiceLockEngine.maxAttempts) {
        VoiceLockEngine.isPermanentlyLocked = true;
        return "PERMANENT_LOCK";
      }
      return "WRONG_CODE";
    }
  },

  updateSecretCode: (newCode) => {
    GlobalVoiceEngine.secretCode = newCode;
    return "CODE_UPDATED";
  }
};
