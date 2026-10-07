// PWA Installation & Service Worker Manager

let deferredPrompt: any = null;

export function registerPWAInstallListener(onPromptAvailable: () => void): () => void {
  const handler = (e: any) => {
    e.preventDefault();
    deferredPrompt = e;
    onPromptAvailable();
  };

  window.addEventListener('beforeinstallprompt', handler);
  return () => window.removeEventListener('beforeinstallprompt', handler);
}

export function isInstallPromptAvailable(): boolean {
  return !!deferredPrompt;
}

export async function promptPWAInstall(): Promise<'accepted' | 'dismissed' | 'unsupported'> {
  if (!deferredPrompt) {
    return 'unsupported';
  }

  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return choiceResult.outcome;
}

export function isPWAStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}
