import React, { useState } from 'react';
import {
  ArmyConfig,
  ArmyType,
  ARMY_TYPES,
  AIDifficulty,
  BattlegroundId,
  BATTLEGROUNDS,
  MatchConfig
} from '../types/chess';
import {
  Swords,
  Shield,
  Crown,
  Bot,
  User,
  Users,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Landmark,
  Check,
  RotateCw
} from 'lucide-react';

interface MatchSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMatch: (config: MatchConfig) => void;
  currentConfig: MatchConfig;
}

export const MatchSetupModal: React.FC<MatchSetupModalProps> = ({
  isOpen,
  onClose,
  onStartMatch,
  currentConfig
}) => {
  const [mode, setMode] = useState<'single' | 'pass_and_play'>(currentConfig.mode);
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>(currentConfig.playerColor);
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>(currentConfig.aiDifficulty);
  const [battleground, setBattleground] = useState<BattlegroundId>(currentConfig.battleground);
  const [autoFlipCamera, setAutoFlipCamera] = useState<boolean>(currentConfig.autoFlipCamera);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(currentConfig.soundEnabled);

  // Armies state
  const [whiteArmy, setWhiteArmy] = useState<ArmyConfig>({
    ...currentConfig.whiteArmy
  });
  const [blackArmy, setBlackArmy] = useState<ArmyConfig>({
    ...currentConfig.blackArmy
  });

  // Step in wizard
  // For single player: 0 = Mode & Difficulty, 1 = Army Customization, 2 = Battleground & Rules, 3 = Review & Launch
  // For 2-player: 0 = Mode, 1 = Player 1 Army, 2 = Player 2 Army, 3 = Battleground & Options, 4 = Review & Launch
  const [step, setStep] = useState<number>(0);

  if (!isOpen) return null;

  const totalSteps = mode === 'single' ? 4 : 5;

  const handleStart = () => {
    onStartMatch({
      mode,
      playerColor,
      aiDifficulty,
      battleground,
      autoFlipCamera,
      soundEnabled,
      whiteArmy,
      blackArmy
    });
    onClose();
  };

  const armyTypeKeys = Object.keys(ARMY_TYPES) as ArmyType[];
  const battlegroundKeys = Object.keys(BATTLEGROUNDS) as BattlegroundId[];

  // Helper for quick name suggestions
  const armyNameSuggestions = ['BRuLand', 'Imperial Vanguard', 'Iron Citadel', 'Solar Dynasty', 'Shadow Dominion', 'Frost Haven'];
  const kingNameSuggestions = ['King Josh', 'King Arthur', 'Emperor Caesar', 'Odin All-Father', 'Pharaoh Ramses', 'Lord Malakor'];
  const queenNameSuggestions = ['Queen Valerie', 'Queen Guinevere', 'Empress Augusta', 'Queen Freya', 'Queen Nefertiti', 'Sorceress Morgana'];

  const activeCustomizingArmy = mode === 'single'
    ? (playerColor === 'w' ? whiteArmy : blackArmy)
    : (step === 1 ? whiteArmy : blackArmy);

  const setActiveCustomizingArmy = (updated: ArmyConfig) => {
    if (mode === 'single') {
      if (playerColor === 'w') {
        setWhiteArmy(updated);
        // Set AI army to complementary historical type if unedited
        if (blackArmy.name === 'AI Empire' || blackArmy.name === 'Dark Guild') {
          setBlackArmy((prev) => ({
            ...prev,
            armyType: updated.armyType === 'roman' ? 'viking' : (updated.armyType === 'crusader' ? 'samurai' : 'gothic')
          }));
        }
      } else {
        setBlackArmy(updated);
      }
    } else {
      if (step === 1) {
        setWhiteArmy(updated);
      } else {
        setBlackArmy(updated);
      }
    }
  };

  return (
    <div className="match-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="setup-title">
      <div className="match-modal-container">
        {/* Modal Header */}
        <div className="match-modal-header">
          <div className="match-modal-header-brand">
            <span className="match-modal-brand-icon">⚔️</span>
            <div>
              <h2 id="setup-title" className="match-modal-title">BRu Wizard Chess — Match Setup</h2>
              <p className="match-modal-desc">Customize your kingdom, army gear, weapons, arena, and combatants</p>
            </div>
          </div>
          <button
            type="button"
            className="match-modal-close"
            onClick={onClose}
            aria-label="Close match setup"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator Tabs */}
        <div className="match-steps-bar">
          {mode === 'single' ? (
            <>
              <button
                type="button"
                className={`match-step-tab ${step === 0 ? 'active' : ''} ${step > 0 ? 'completed' : ''}`}
                onClick={() => setStep(0)}
              >
                <span className="step-num">1</span>
                <span>Mode &amp; AI</span>
              </button>
              <button
                type="button"
                className={`match-step-tab ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
                onClick={() => setStep(1)}
              >
                <span className="step-num">2</span>
                <span>Your Army</span>
              </button>
              <button
                type="button"
                className={`match-step-tab ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
                onClick={() => setStep(2)}
              >
                <span className="step-num">3</span>
                <span>Battleground</span>
              </button>
              <button
                type="button"
                className={`match-step-tab ${step === 3 ? 'active' : ''}`}
                onClick={() => setStep(3)}
              >
                <span className="step-num">4</span>
                <span>Deploy</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={`match-step-tab ${step === 0 ? 'active' : ''} ${step > 0 ? 'completed' : ''}`}
                onClick={() => setStep(0)}
              >
                <span className="step-num">1</span>
                <span>2-Player Mode</span>
              </button>
              <button
                type="button"
                className={`match-step-tab ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
                onClick={() => setStep(1)}
              >
                <span className="step-num">2</span>
                <span>White (P1)</span>
              </button>
              <button
                type="button"
                className={`match-step-tab ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
                onClick={() => setStep(2)}
              >
                <span className="step-num">3</span>
                <span>Black (P2)</span>
              </button>
              <button
                type="button"
                className={`match-step-tab ${step === 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}
                onClick={() => setStep(3)}
              >
                <span className="step-num">4</span>
                <span>Battleground</span>
              </button>
              <button
                type="button"
                className={`match-step-tab ${step === 4 ? 'active' : ''}`}
                onClick={() => setStep(4)}
              >
                <span className="step-num">5</span>
                <span>Deploy</span>
              </button>
            </>
          )}
        </div>

        {/* Modal Body: Content per step */}
        <div className="match-modal-body">
          {/* STEP 0: Mode Selection & Opponent */}
          {step === 0 && (
            <div className="setup-section-fade">
              <h3 className="section-title">Who will you face across the altar?</h3>

              {/* Mode Selection Cards */}
              <div className="choice-grid two-col">
                <button
                  type="button"
                  className={`choice-card ${mode === 'single' ? 'selected' : ''}`}
                  onClick={() => setMode('single')}
                >
                  <div className="choice-card-icon">
                    <Bot className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="choice-card-content">
                    <h4 className="choice-card-title">Single Player vs AI</h4>
                    <p className="choice-card-desc">
                      Battle against an animated tactical chess engine with customizable difficulty and aggression.
                    </p>
                  </div>
                  {mode === 'single' && <span className="selected-check"><Check className="w-4 h-4" /></span>}
                </button>

                <button
                  type="button"
                  className={`choice-card ${mode === 'pass_and_play' ? 'selected' : ''}`}
                  onClick={() => setMode('pass_and_play')}
                >
                  <div className="choice-card-icon">
                    <Users className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="choice-card-content">
                    <h4 className="choice-card-title">2 Players (Same Device)</h4>
                    <p className="choice-card-desc">
                      Pass &amp; play on the same screen! The camera cinematically orbits 180° on every turn for each player.
                    </p>
                  </div>
                  {mode === 'pass_and_play' && <span className="selected-check"><Check className="w-4 h-4" /></span>}
                </button>
              </div>

              {/* In Single Player: Color and AI Difficulty */}
              {mode === 'single' && (
                <>
                  <div className="divider-line my-5" />
                  <h4 className="sub-title mb-3">Which side will you command?</h4>
                  <div className="choice-grid two-col mb-5">
                    <button
                      type="button"
                      className={`choice-card compact ${playerColor === 'w' ? 'selected' : ''}`}
                      onClick={() => setPlayerColor('w')}
                    >
                      <div className="color-swatch-circle white-piece-bg" />
                      <div className="text-left">
                        <span className="font-semibold block">Play as White</span>
                        <span className="text-xs text-stone-400">Moves first from south nave</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`choice-card compact ${playerColor === 'b' ? 'selected' : ''}`}
                      onClick={() => setPlayerColor('b')}
                    >
                      <div className="color-swatch-circle black-piece-bg" />
                      <div className="text-left">
                        <span className="font-semibold block">Play as Black</span>
                        <span className="text-xs text-stone-400">Responds from north sanctum</span>
                      </div>
                    </button>
                  </div>

                  <h4 className="sub-title mb-3">AI Opponent Difficulty</h4>
                  <div className="difficulty-grid">
                    {(['easy', 'normal', 'hard', 'intense'] as AIDifficulty[]).map((diff) => {
                      const labels = {
                        easy: { title: 'Easy', desc: 'Casual & forgiving, makes playful blunders' },
                        normal: { title: 'Normal', desc: 'Balanced tactical awareness & captures' },
                        hard: { title: 'Hard', desc: 'Deep minimax calculation & piece defense' },
                        intense: { title: 'Intense', desc: 'Relentless aggression & king checkmate hunting' }
                      };
                      return (
                        <button
                          key={diff}
                          type="button"
                          className={`difficulty-card ${aiDifficulty === diff ? 'selected' : ''}`}
                          onClick={() => setAiDifficulty(diff)}
                        >
                          <span className="difficulty-title">{labels[diff].title}</span>
                          <span className="difficulty-desc">{labels[diff].desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 1 (or 2 for 2-Player): Army Customization */}
          {((mode === 'single' && step === 1) || (mode === 'pass_and_play' && (step === 1 || step === 2))) && (
            <div className="setup-section-fade">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="section-title">
                    {mode === 'single'
                      ? 'Customize Your Army'
                      : step === 1
                      ? 'Player 1: Customize White Army'
                      : 'Player 2: Customize Black Army'}
                  </h3>
                  <p className="text-sm text-stone-400">
                    Give your kingdom a proud name, crown your King and Queen, and select your historical gear &amp; weapons.
                  </p>
                </div>
                <div className={`army-turn-badge ${activeCustomizingArmy.color === 'w' ? 'white' : 'black'}`}>
                  {activeCustomizingArmy.color === 'w' ? 'White Forces' : 'Black Forces'}
                </div>
              </div>

              {/* Names input row */}
              <div className="names-input-grid mb-6">
                <div className="input-field-group">
                  <label htmlFor="army-name-input" className="input-label">
                    <Shield className="w-4 h-4 text-amber-400 inline mr-1.5" />
                    Army / Realm Name
                  </label>
                  <input
                    id="army-name-input"
                    type="text"
                    className="styled-text-input"
                    value={activeCustomizingArmy.name}
                    onChange={(e) => setActiveCustomizingArmy({ ...activeCustomizingArmy, name: e.target.value })}
                    placeholder="e.g. BRuLand, Roman Empire..."
                    maxLength={32}
                  />
                  <div className="quick-suggestions">
                    <span className="text-xs text-stone-500 mr-1">Suggestions:</span>
                    {armyNameSuggestions.slice(0, 3).map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        className="sug-pill"
                        onClick={() => setActiveCustomizingArmy({ ...activeCustomizingArmy, name: sug })}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-field-group">
                  <label htmlFor="king-name-input" className="input-label">
                    <Crown className="w-4 h-4 text-amber-400 inline mr-1.5" />
                    Name of Your King
                  </label>
                  <input
                    id="king-name-input"
                    type="text"
                    className="styled-text-input"
                    value={activeCustomizingArmy.kingName}
                    onChange={(e) => setActiveCustomizingArmy({ ...activeCustomizingArmy, kingName: e.target.value })}
                    placeholder="e.g. King Josh"
                    maxLength={28}
                  />
                  <div className="quick-suggestions">
                    <span className="text-xs text-stone-500 mr-1">Suggestions:</span>
                    {kingNameSuggestions.slice(0, 3).map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        className="sug-pill"
                        onClick={() => setActiveCustomizingArmy({ ...activeCustomizingArmy, kingName: sug })}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-field-group">
                  <label htmlFor="queen-name-input" className="input-label">
                    <Crown className="w-4 h-4 text-rose-400 inline mr-1.5" />
                    Name of Your Queen
                  </label>
                  <input
                    id="queen-name-input"
                    type="text"
                    className="styled-text-input"
                    value={activeCustomizingArmy.queenName}
                    onChange={(e) => setActiveCustomizingArmy({ ...activeCustomizingArmy, queenName: e.target.value })}
                    placeholder="e.g. Queen Valerie"
                    maxLength={28}
                  />
                  <div className="quick-suggestions">
                    <span className="text-xs text-stone-500 mr-1">Suggestions:</span>
                    {queenNameSuggestions.slice(0, 3).map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        className="sug-pill"
                        onClick={() => setActiveCustomizingArmy({ ...activeCustomizingArmy, queenName: sug })}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Historical Army Type Selection */}
              <h4 className="sub-title mb-2">Historical Army Type &amp; Weaponry</h4>
              <p className="text-xs text-stone-400 mb-4">
                Determines 3D equipment, weapons, battle attire, and synthesized combat sounds:
              </p>

              <div className="historical-army-grid">
                {armyTypeKeys.map((typeKey) => {
                  const info = ARMY_TYPES[typeKey];
                  const isSelected = activeCustomizingArmy.armyType === typeKey;

                  return (
                    <button
                      key={typeKey}
                      type="button"
                      className={`historical-army-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setActiveCustomizingArmy({ ...activeCustomizingArmy, armyType: typeKey })}
                      style={{
                        borderColor: isSelected ? info.accentColor : undefined,
                        boxShadow: isSelected ? `0 0 16px ${info.badgeBg}` : undefined
                      }}
                    >
                      <div className="army-card-header">
                        <div className="flex items-center gap-2">
                          <span className="army-culture-badge" style={{ backgroundColor: info.badgeBg, color: info.accentColor }}>
                            {info.culture}
                          </span>
                          <h5 className="army-name-title">{info.name}</h5>
                        </div>
                        {isSelected && (
                          <span className="selected-check mini" style={{ backgroundColor: info.accentColor }}>
                            <Check className="w-3 h-3 text-white" />
                          </span>
                        )}
                      </div>

                      <p className="army-desc-text">{info.description}</p>

                      <div className="gear-summary-box">
                        <div className="gear-item">
                          <span className="gear-label">Weapons:</span>
                          <span className="gear-val">{info.weapons.pawn} • {info.weapons.king}</span>
                        </div>
                        <div className="gear-item">
                          <span className="gear-label">Armor:</span>
                          <span className="gear-val">{info.attire}</span>
                        </div>
                        <div className="gear-item">
                          <span className="gear-label">Audio:</span>
                          <span className="gear-val">{info.soundProfile}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP: Battleground & Environmental Atmosphere */}
          {((mode === 'single' && step === 2) || (mode === 'pass_and_play' && step === 3)) && (
            <div className="setup-section-fade">
              <h3 className="section-title mb-1">Pick a Battleground</h3>
              <p className="text-sm text-stone-400 mb-5">
                Choose the 3D board architecture, materials, ambient lighting, and atmospheric mood:
              </p>

              <div className="battleground-grid">
                {battlegroundKeys.map((bgKey) => {
                  const bg = BATTLEGROUNDS[bgKey];
                  const isSelected = battleground === bgKey;
                  return (
                    <button
                      key={bgKey}
                      type="button"
                      className={`battleground-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setBattleground(bgKey)}
                    >
                      <div className="battleground-header">
                        <div>
                          <h4 className="battleground-name">{bg.name}</h4>
                          <span className="battleground-theme">{bg.theme}</span>
                        </div>
                        {isSelected && <span className="selected-check"><Check className="w-4 h-4" /></span>}
                      </div>

                      <div className="checker-preview-strip">
                        <div
                          className="preview-square"
                          style={{ backgroundColor: `#${bg.lightSqColor.toString(16).padStart(6, '0')}` }}
                        />
                        <div
                          className="preview-square"
                          style={{ backgroundColor: `#${bg.darkSqColor.toString(16).padStart(6, '0')}` }}
                        />
                        <div
                          className="preview-square"
                          style={{ backgroundColor: `#${bg.rimColor.toString(16).padStart(6, '0')}` }}
                        />
                        <div
                          className="preview-square"
                          style={{ backgroundColor: `#${bg.lightColor.toString(16).padStart(6, '0')}` }}
                        />
                      </div>

                      <p className="battleground-desc">{bg.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Match Options */}
              <div className="divider-line my-6" />
              <h4 className="sub-title mb-3">Gameplay &amp; Presentation Settings</h4>

              <div className="settings-toggles-grid">
                <label className="setting-toggle-card">
                  <div className="flex items-center gap-3">
                    <RotateCw className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="setting-title">Auto-Flip Camera on Turn</span>
                      <span className="setting-desc">
                        {mode === 'pass_and_play'
                          ? 'Cinematically glides 180° around the altar so Player 1 and Player 2 view from their own perspective'
                          : 'Smoothly aligns view with the active commander'}
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="styled-checkbox"
                    checked={autoFlipCamera}
                    onChange={(e) => setAutoFlipCamera(e.target.checked)}
                  />
                </label>

                <label className="setting-toggle-card">
                  <div className="flex items-center gap-3">
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-amber-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-stone-500" />
                    )}
                    <div>
                      <span className="setting-title">Synthesized Combat Sound Effects</span>
                      <span className="setting-desc">
                        Historical weapon clashes, marching footfalls, stone shatter bursts, and victory fanfares
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="styled-checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                  />
                </label>
              </div>
            </div>
          )}

          {/* FINAL STEP: Matchup Preview & Deploy */}
          {((mode === 'single' && step === 3) || (mode === 'pass_and_play' && step === 4)) && (
            <div className="setup-section-fade">
              <h3 className="section-title text-center mb-1">Match Preview &amp; Order of Battle</h3>
              <p className="text-sm text-stone-400 text-center mb-6">
                Review your customized armies before stepping into the arena.
              </p>

              <div className="versus-card-container">
                {/* White Army */}
                <div className="versus-army-box white-side">
                  <div className="versus-side-tag">White Commander</div>
                  <h4 className="versus-army-name">{whiteArmy.name}</h4>
                  <div className="versus-culture-pill">
                    {ARMY_TYPES[whiteArmy.armyType].culture} • {ARMY_TYPES[whiteArmy.armyType].name}
                  </div>
                  <div className="versus-royals">
                    <div className="royal-line">
                      <Crown className="w-4 h-4 text-amber-400 inline mr-1" />
                      <strong>King:</strong> {whiteArmy.kingName}
                    </div>
                    <div className="royal-line">
                      <Crown className="w-4 h-4 text-rose-300 inline mr-1" />
                      <strong>Queen:</strong> {whiteArmy.queenName}
                    </div>
                  </div>
                  <div className="versus-gear-summary">
                    <span>⚔️ {ARMY_TYPES[whiteArmy.armyType].weapons.pawn}</span>
                  </div>
                </div>

                {/* VS Emblem */}
                <div className="versus-emblem">
                  <Swords className="w-8 h-8 text-amber-400 animate-pulse" />
                  <span className="versus-text">VS</span>
                </div>

                {/* Black Army */}
                <div className="versus-army-box black-side">
                  <div className="versus-side-tag">
                    {mode === 'single' ? `Black Opponent (AI: ${aiDifficulty.toUpperCase()})` : 'Black Commander'}
                  </div>
                  <h4 className="versus-army-name">{blackArmy.name}</h4>
                  <div className="versus-culture-pill">
                    {ARMY_TYPES[blackArmy.armyType].culture} • {ARMY_TYPES[blackArmy.armyType].name}
                  </div>
                  <div className="versus-royals">
                    <div className="royal-line">
                      <Crown className="w-4 h-4 text-amber-400 inline mr-1" />
                      <strong>King:</strong> {blackArmy.kingName}
                    </div>
                    <div className="royal-line">
                      <Crown className="w-4 h-4 text-rose-300 inline mr-1" />
                      <strong>Queen:</strong> {blackArmy.queenName}
                    </div>
                  </div>
                  <div className="versus-gear-summary">
                    <span>⚔️ {ARMY_TYPES[blackArmy.armyType].weapons.pawn}</span>
                  </div>
                </div>
              </div>

              {/* Arena Banner */}
              <div className="arena-preview-pill">
                <Landmark className="w-5 h-5 text-amber-400 mr-2" />
                <span>
                  <strong>Battleground:</strong> {BATTLEGROUNDS[battleground].name} ({BATTLEGROUNDS[battleground].theme})
                </span>
                <span className="mx-2">•</span>
                <span>
                  <strong>Mode:</strong> {mode === 'single' ? `Single Player (Playing as ${playerColor === 'w' ? 'White' : 'Black'})` : '2 Players Same Device'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Navigation buttons */}
        <div className="match-modal-footer">
          <button
            type="button"
            className="hud-btn modal-nav-btn secondary"
            disabled={step === 0}
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            {step < totalSteps - 1 ? (
              <button
                type="button"
                className="hud-btn modal-nav-btn primary"
                onClick={() => setStep((prev) => Math.min(totalSteps - 1, prev + 1))}
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                className="hud-btn modal-nav-btn start-battle-btn"
                id="btn-start-match"
                onClick={handleStart}
              >
                <Swords className="w-4 h-4 mr-1.5 inline" />
                Enter Battlefield &amp; Start Match
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
