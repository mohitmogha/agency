import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check, Share2, PlusSquare } from 'lucide-react';
import { 
  registerPWAInstallListener, 
  promptPWAInstall, 
  isPWAStandalone, 
  isIOS 
} from '../../lib/pwa';

interface PwaInstallBannerProps {
  onOpenAuditModal?: () => void;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // If already running standalone, do not show
    if (isPWAStandalone()) return;

    // Check if dismissed in this session
    if (sessionStorage.getItem('vanguard_pwa_dismissed') === 'true') {
      setIsDismissed(true);
      return;
    }

    const cleanup = registerPWAInstallListener(() => {
      setCanInstall(true);
    });

    // Also support iOS manual install prompt
    if (isIOS()) {
      setCanInstall(true);
    }

    return cleanup;
  }, []);

  const handleInstallClick = async () => {
    if (isIOS()) {
      setShowIosInstructions(true);
      return;
    }

    const outcome = await promptPWAInstall();
    if (outcome === 'accepted') {
      setInstalledSuccess(true);
      setTimeout(() => {
        setIsDismissed(true);
      }, 2500);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('vanguard_pwa_dismissed', 'true');
  };

  if (!canInstall || isDismissed || isPWAStandalone()) return null;

  return (
    <>
      {/* Floating Bottom Toast (Above Mobile Sticky Bar on Phones, Bottom Right on Desktop) */}
      <aside 
        aria-label="Install Vanguard DTC Progressive Web App"
        className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:max-w-md z-40 p-3.5 rounded-2xl bg-white/95 dark:bg-[#0E1422]/95 backdrop-blur-xl border border-indigo-200 dark:border-indigo-900/60 shadow-2xl shadow-indigo-500/15 text-slate-900 dark:text-white transition-all animate-in slide-in-from-bottom duration-300"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1.5px] shrink-0 shadow-md">
              <div className="w-full h-full bg-white dark:bg-[#0B0F19] rounded-[9px] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold font-display truncate">Install Vanguard DTC</span>
                <span className="text-[9px] font-extrabold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 rounded-full border border-emerald-500/20 whitespace-nowrap">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {installedSuccess ? 'App installed successfully!' : 'Fast 1-tap ROAS simulator & offline access'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {!installedSuccess ? (
              <button
                onClick={handleInstallClick}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 active:scale-95 transition-transform whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Installed</span>
              </span>
            )}

            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* iOS Safari Installation Instruction Modal */}
      {showIosInstructions && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-slate-900 dark:text-white">
            <button
              onClick={() => setShowIosInstructions(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display">Install on iPhone / iPad</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Install as a standalone Progressive Web App on your home screen in two simple steps:
              </p>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <span className="font-bold">Tap the Share icon</span> at the bottom of Safari:
                  <div className="mt-1 flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-mono">
                    <Share2 className="w-4 h-4" />
                    <span>Share button</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <span className="font-bold">Scroll down and tap</span>:
                  <div className="mt-1 flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-mono">
                    <PlusSquare className="w-4 h-4" />
                    <span>"Add to Home Screen"</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosInstructions(false)}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
