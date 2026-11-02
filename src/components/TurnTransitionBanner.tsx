import React from 'react';
import { ArmyConfig } from '../types/chess';
import { Crown, Swords } from 'lucide-react';

interface TurnTransitionBannerProps {
  visible: boolean;
  activeArmy: ArmyConfig;
  turnNumber?: number;
}

export const TurnTransitionBanner: React.FC<TurnTransitionBannerProps> = ({
  visible,
  activeArmy
}) => {
  if (!visible) return null;

  return (
    <div className="turn-transition-banner-wrap" aria-live="assertive">
      <div className={`turn-transition-banner ${activeArmy.color === 'w' ? 'white-turn' : 'black-turn'}`}>
        <div className="turn-banner-sparkle">✦ ✦ ✦</div>
        <div className="turn-banner-content">
          <div className="turn-banner-icon">
            <Crown className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="turn-banner-subtitle">
              {activeArmy.color === 'w' ? 'White Forces' : 'Black Forces'} Commanding
            </div>
            <h3 className="turn-banner-title">
              {activeArmy.name}'s Turn
            </h3>
            <div className="turn-banner-king">
              Sovereign: {activeArmy.kingName} &amp; {activeArmy.queenName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
