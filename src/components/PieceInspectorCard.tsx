import React from 'react';
import { ArmyConfig, ARMY_TYPES } from '../types/chess';
import { Crown, Shield, Swords } from 'lucide-react';

export interface InspectedPieceData {
  type: string;
  color: 'w' | 'b';
  square: string;
  army: ArmyConfig;
  customName: string;
  weapon: string;
  hasMoved: boolean;
}

interface PieceInspectorCardProps {
  data: InspectedPieceData | null;
}

export const PieceInspectorCard: React.FC<PieceInspectorCardProps> = ({ data }) => {
  if (!data) return null;

  const armyInfo = ARMY_TYPES[data.army.armyType] || ARMY_TYPES.gothic;
  const isRoyalty = data.type === 'king' || data.type === 'queen';

  return (
    <div className="piece-inspector-card">
      <div className="inspector-header">
        <div className="flex items-center gap-2">
          {isRoyalty ? (
            <Crown className="w-4 h-4 text-amber-400" />
          ) : (
            <Shield className="w-4 h-4 text-stone-400" />
          )}
          <span className="inspector-name">{data.customName}</span>
        </div>
        <span className="inspector-square-badge">{data.square.toUpperCase()}</span>
      </div>

      <div className="inspector-body">
        <div className="inspector-army-line">
          <span
            className="inspector-culture-dot"
            style={{ backgroundColor: armyInfo.accentColor }}
          />
          <span className="font-semibold text-stone-200">{data.army.name}</span>
          <span className="text-stone-400 text-xs">({armyInfo.name})</span>
        </div>

        <div className="inspector-weapon-line">
          <Swords className="w-3.5 h-3.5 text-amber-300 inline mr-1" />
          <span className="text-stone-300 text-xs">{data.weapon}</span>
        </div>
      </div>
    </div>
  );
};
