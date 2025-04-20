// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const calculateTotalFollowers = (followers) => 
  Object.values(followers).reduce((acc, count) => acc + (count || 0), 0);

export const loadFromLocalStorage = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const downloadImage = async (elementId, format = 'png') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');
    
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(element);
    
    const link = document.createElement('a');
    link.download = `audience-stats.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};