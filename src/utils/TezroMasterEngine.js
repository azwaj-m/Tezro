export const TezroMasterEngine = {
  calculateFare: (distance, type) => {
    const rates = { mini: 40, bolan: 35, prime: 65 };
    const base = rates[type.toLowerCase()] || 40;
    return Math.floor(distance * base);
  },
  initiateTransaction: async (amount, service) => {
    return {
      txnId: `TZ-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
      status: 'Escrow_Hold',
      hash: `0x${Math.random().toString(16).substring(2, 20)}`
    };
  }
};
