import { useEffect, useRef, useState } from 'react';
import { initWizardChess } from './wizardChessEngine.js';
import { MatchSetupModal } from './components/MatchSetupModal';
import { TurnTransitionBanner } from './components/TurnTransitionBanner';
import { PieceInspectorCard, InspectedPieceData } from './components/PieceInspectorCard';
import { MatchConfig, ArmyConfig } from './types/chess';
import { Swords, Volume2, VolumeX, RotateCw, Settings } from 'lucide-react';

interface WizardChessGlobal {
  wizardChess?: {
    toggleUI?: (force?: boolean) => void;
    applyMatchSetup?: (cfg: MatchConfig) => void;
    getMatchConfig?: () => MatchConfig;
    flipPlayerCamera?: () => void;
    toggleAutoFlip?: (val?: boolean) => boolean;
    setAudioMuted?: (val: boolean) => void;
    toggleAudioMute?: () => boolean;
    onTurnSwitch?: ((data: { turn: 'w' | 'b'; activeArmy: ArmyConfig }) => void) | null;
    onHoverPiece?: ((data: InspectedPieceData | null) => void) | null;
  };
}

export default function App() {
  const initializedRef = useRef(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [matchSetupOpen, setMatchSetupOpen] = useState(true);

  const [matchConfig, setMatchConfig] = useState<MatchConfig>({
    mode: 'single',
    playerColor: 'w',
    aiDifficulty: 'normal',
    battleground: 'sanctum',
    autoFlipCamera: true,
    soundEnabled: true,
    whiteArmy: {
      name: 'BRuLand',
      kingName: 'King Josh',
      queenName: 'Queen Valerie',
      armyType: 'roman',
      color: 'w'
    },
    blackArmy: {
      name: 'Viking Horde',
      kingName: 'Jarl Ragnar',
      queenName: 'Shieldmaiden Freya',
      armyType: 'viking',
      color: 'b'
    }
  });

  const [turnBanner, setTurnBanner] = useState<{ visible: boolean; activeArmy: ArmyConfig }>({
    visible: false,
    activeArmy: matchConfig.whiteArmy
  });

  const [inspectedPiece, setInspectedPiece] = useState<InspectedPieceData | null>(null);
  const [soundMuted, setSoundMuted] = useState(false);
  const [autoFlip, setAutoFlip] = useState(true);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    initWizardChess();

    const win = window as unknown as WizardChessGlobal;
    if (win.wizardChess) {
      win.wizardChess.onTurnSwitch = (data) => {
        setTurnBanner({ visible: true, activeArmy: data.activeArmy });
        setTimeout(() => {
          setTurnBanner((prev) => ({ ...prev, visible: false }));
        }, 2600);
      };

      win.wizardChess.onHoverPiece = (data) => {
        setInspectedPiece(data);
      };
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileSheetOpen(false);
        setMatchSetupOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileSheetOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRestoreUI = () => {
    const win = window as unknown as WizardChessGlobal;
    if (win.wizardChess?.toggleUI) {
      win.wizardChess.toggleUI(false);
    } else {
      document.body.classList.remove('cinematic-ui-hidden');
      const btnHide = document.getElementById('btn-hide-ui');
      if (btnHide) btnHide.textContent = 'Hide UI [H]';
    }
  };

  const handleStartMatch = (newConfig: MatchConfig) => {
    setMatchConfig(newConfig);
    setAutoFlip(newConfig.autoFlipCamera);
    setSoundMuted(!newConfig.soundEnabled);

    const win = window as unknown as WizardChessGlobal;
    if (win.wizardChess?.applyMatchSetup) {
      win.wizardChess.applyMatchSetup(newConfig);
    }
  };

  const handleToggleSound = () => {
    const win = window as unknown as WizardChessGlobal;
    if (win.wizardChess?.toggleAudioMute) {
      const nextMuted = win.wizardChess.toggleAudioMute();
      setSoundMuted(nextMuted);
    } else {
      setSoundMuted((prev) => !prev);
    }
  };

  const handleFlipCamera = () => {
    const win = window as unknown as WizardChessGlobal;
    if (win.wizardChess?.flipPlayerCamera) {
      win.wizardChess.flipPlayerCamera();
    }
  };

  const handleToggleAutoFlip = () => {
    const win = window as unknown as WizardChessGlobal;
    if (win.wizardChess?.toggleAutoFlip) {
      const nextVal = win.wizardChess.toggleAutoFlip();
      setAutoFlip(nextVal);
    } else {
      setAutoFlip((prev) => !prev);
    }
  };

  return (
    <>
      <div id="loading-overlay">
        <div className="loader-title">BRu Wizard Chess</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" id="loader-bar"></div>
        </div>
        <div id="loader-text">Summoning Sanctum Architecture &amp; Sculpted Pieces...</div>
      </div>

      <div id="canvas-container"></div>

      {/* Floating Piece Inspector Tooltip */}
      <PieceInspectorCard data={inspectedPiece} />

      {/* 2-Player Pass and Play Turn Transition Banner */}
      <TurnTransitionBanner visible={turnBanner.visible} activeArmy={turnBanner.activeArmy} />

      {/* Comprehensive Match Setup Modal */}
      <MatchSetupModal
        isOpen={matchSetupOpen}
        onClose={() => setMatchSetupOpen(false)}
        onStartMatch={handleStartMatch}
        currentConfig={matchConfig}
      />

      <button
        type="button"
        className="hud-btn mobile-only-restore-ui"
        id="btn-mobile-show-ui"
        onClick={handleRestoreUI}
        title="Show HUD Controls"
      >
        Show UI
      </button>

      <div id="hud-top">
        <div className="hud-group" id="hud-left">
          <div className="brand-pill">
            <span className="brand-title">BRu Wizard Chess</span>
          </div>

          <button
            type="button"
            className="hud-btn primary match-setup-trigger-btn"
            id="btn-open-match-setup"
            onClick={() => setMatchSetupOpen(true)}
            title="Open Match Setup & Customize Armies"
          >
            <Swords className="w-4 h-4 inline mr-1.5 text-amber-300" />
            Match Setup
          </button>

          <div className="status-pill" id="status-pill">
            <span className="turn-dot" id="turn-dot"></span>
            <span id="turn-text">White to Move</span>
            <span className="mode-badge" id="mode-badge">
              {matchConfig.mode === 'pass_and_play'
                ? '2-Player Same Screen'
                : `${matchConfig.whiteArmy.name} vs ${matchConfig.blackArmy.name}`}
            </span>
          </div>
        </div>

        <button
          type="button"
          className={`hud-btn mobile-controls-trigger ${mobileSheetOpen ? 'active' : ''}`}
          id="btn-mobile-controls"
          aria-expanded={mobileSheetOpen}
          aria-controls="hud-right"
          onClick={() => setMobileSheetOpen((prev) => !prev)}
        >
          {mobileSheetOpen ? 'Close' : 'Controls'}
        </button>

        <div
          className={`mobile-sheet-backdrop ${mobileSheetOpen ? 'open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setMobileSheetOpen(false);
          }}
          aria-hidden="true"
        ></div>

        <div
          className={`hud-group ${mobileSheetOpen ? 'mobile-sheet-open' : ''}`}
          id="hud-right"
        >
          <div
            className="mobile-sheet-handle-wrap"
            onClick={(e) => {
              e.stopPropagation();
              setMobileSheetOpen(false);
            }}
            aria-hidden="true"
          >
            <div className="mobile-sheet-handle"></div>
          </div>

          <div className="mobile-sheet-header">
            <span className="mobile-sheet-title">Controls</span>
            <button
              type="button"
              className="mobile-sheet-close"
              id="btn-mobile-sheet-close"
              onClick={(e) => {
                e.stopPropagation();
                setMobileSheetOpen(false);
              }}
              aria-label="Close Controls"
            >
              Close ✕
            </button>
          </div>

          <div className="mobile-sheet-section-label">Game Actions</div>

          <button
            className="hud-btn"
            id="btn-side-toggle"
            title="Switch between Playing as White and Playing as Black"
            onClick={() => setMobileSheetOpen(false)}
          >
            Play as Black
          </button>
          <button
            className="hud-btn"
            id="btn-ai-move"
            title="Let the AI make the next move immediately"
            onClick={() => setMobileSheetOpen(false)}
          >
            AI Move
          </button>
          <button
            className="hud-btn"
            id="btn-reset"
            title="Start a fresh game on the altar"
            onClick={() => setMobileSheetOpen(false)}
          >
            New Game
          </button>

          {/* 2-Player Same Screen Camera Helpers */}
          {matchConfig.mode === 'pass_and_play' && (
            <>
              <button
                type="button"
                className="hud-btn"
                id="btn-flip-view"
                title="Manually Flip Camera to Opposite Player"
                onClick={handleFlipCamera}
              >
                <RotateCw className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                Flip View
              </button>
              <button
                type="button"
                className={`hud-btn ${autoFlip ? 'active' : ''}`}
                id="btn-toggle-autoflip"
                title="Toggle Auto-Rotating Camera on Turn Switch"
                onClick={handleToggleAutoFlip}
              >
                Auto-Flip: {autoFlip ? 'ON' : 'OFF'}
              </button>
            </>
          )}

          {/* Sound Mute Toggle */}
          <button
            type="button"
            className="hud-btn"
            id="btn-toggle-sound"
            title={soundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            onClick={handleToggleSound}
          >
            {soundMuted ? (
              <VolumeX className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
            )}
            Sound: {soundMuted ? 'Muted' : 'ON'}
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">
            <span>Camera Views</span>
            <span className="mobile-sheet-section-sub">Tap active view to flip</span>
          </div>

          <button
            className="hud-btn active"
            id="btn-cam-player"
            title="Player Camera (Click again to flip White / Black view)"
          >
            Player Cam
          </button>
          <button
            className="hud-btn"
            id="btn-cam-top"
            title="Overhead Board View (Click again to flip White / Black orientation)"
          >
            Overhead
          </button>
          <button
            className="hud-btn"
            id="btn-cam-side"
            title="Side Profile View (Click again to switch East / West side)"
          >
            Side
          </button>
          <button
            className="hud-btn"
            id="btn-cam-wide"
            title="Wide Cathedral View (Click again to switch North Rose / South Narthex)"
          >
            Cathedral
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">Display &amp; Gestures</div>

          <button
            className="hud-btn"
            id="btn-hide-ui"
            title="Toggle HUD visibility (Shortcut: H)"
            onClick={() => setMobileSheetOpen(false)}
          >
            Hide UI [H]
          </button>

          <div className="mobile-sheet-hint">
            <strong>Touch:</strong> Tap Piece to Move &nbsp;•&nbsp; 1-Finger Drag: Orbit &nbsp;•&nbsp; 2-Finger Drag: Pan &nbsp;•&nbsp; Pinch: Zoom
          </div>
        </div>
      </div>

      <div id="hud-bottom">
        <div className="hint-pill" id="controls-hint">
          <strong>Controls:</strong> Click Piece to Move &nbsp;•&nbsp; Left-Drag: Orbit &nbsp;•&nbsp; Right-Drag: Pan &nbsp;•&nbsp; Scroll: Zoom &nbsp;•&nbsp; WASD + R/F: Fly Cam &nbsp;•&nbsp; H: Hide UI
        </div>
        <div className="captured-pill" id="captured-tray"></div>
      </div>

      <div id="checkmate-overlay" role="status" aria-live="polite">
        <div className="checkmate-banner">
          <div className="checkmate-ornament">✦ &nbsp; Sanctum Judgment &nbsp; ✦</div>
          <div className="checkmate-crown" id="checkmate-crown">♔</div>
          <div className="checkmate-title" id="checkmate-title">Checkmate</div>
          <div className="checkmate-rule"></div>
          <div className="checkmate-subtitle" id="checkmate-subtitle">
            White Triumphs • The Black King Has Fallen
          </div>
          <div className="checkmate-actions">
            <button className="checkmate-btn" id="btn-checkmate-replay">
              Replay King Fall
            </button>
            <button
              className="checkmate-btn primary"
              id="btn-checkmate-rematch"
              onClick={() => {
                const overlay = document.getElementById('checkmate-overlay');
                if (overlay) overlay.classList.remove('visible');
                setMatchSetupOpen(true);
              }}
            >
              Rematch &amp; Setup
            </button>
            <button className="checkmate-btn" id="btn-checkmate-newgame">
              New Game
            </button>
            <button className="checkmate-btn secondary" id="btn-checkmate-dismiss">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
