// Text-to-Speech utility
export const speakText = (text, language = 'en') => {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-Speech is not supported in your browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.language = language === 'rw' ? 'rw-RW' : 'en-US';
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);

  return utterance;
};

// Stop speech
export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Browser Notification
export const sendBrowserNotification = (title, options = {}) => {
  if (!('Notification' in window)) {
    console.log('Browser Notifications not supported');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.ico',
      ...options,
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, {
          icon: '/favicon.ico',
          ...options,
        });
      }
    });
  }
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Get notification permission status
export const getNotificationPermissionStatus = () => {
  if (!('Notification' in window)) {
    return 'unavailable';
  }
  return Notification.permission;
};
