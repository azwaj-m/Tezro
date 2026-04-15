// Tezro Smart Receipt Engine
export const generateSecureHash = (data) => {
  const str = JSON.stringify(data);
  // الٹرا لائٹ بائٹ شفٹنگ (سیکیورٹی کے لیے)
  return btoa(str).split('').reverse().join('').substring(0, 16).toUpperCase();
};

export const getLocalTimestamp = () => {
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date());
};
