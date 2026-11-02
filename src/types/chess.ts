export type ArmyType = 'roman' | 'crusader' | 'samurai' | 'viking' | 'egyptian' | 'gothic';

export type AIDifficulty = 'easy' | 'normal' | 'hard' | 'intense';

export type BattlegroundId = 'sanctum' | 'forum' | 'fjord' | 'pharaoh' | 'shogun' | 'magma';

export interface ArmyConfig {
  name: string;
  kingName: string;
  queenName: string;
  armyType: ArmyType;
  color: 'w' | 'b';
}

export interface MatchConfig {
  mode: 'single' | 'pass_and_play';
  playerColor: 'w' | 'b';
  aiDifficulty: AIDifficulty;
  battleground: BattlegroundId;
  autoFlipCamera: boolean;
  soundEnabled: boolean;
  whiteArmy: ArmyConfig;
  blackArmy: ArmyConfig;
}

export interface ArmyTypeInfo {
  id: ArmyType;
  name: string;
  culture: string;
  accentColor: string;
  badgeBg: string;
  description: string;
  weapons: {
    pawn: string;
    knight: string;
    bishop: string;
    rook: string;
    queen: string;
    king: string;
  };
  attire: string;
  soundProfile: string;
}

export const ARMY_TYPES: Record<ArmyType, ArmyTypeInfo> = {
  roman: {
    id: 'roman',
    name: 'Roman Legion',
    culture: 'Classical Empire',
    accentColor: '#e63946',
    badgeBg: 'rgba(230, 57, 70, 0.2)',
    description: 'Disciplined legions equipped with bronze-tipped pilum spears, razor gladius swords, and imperial scutum shields.',
    weapons: {
      pawn: 'Gladius & Curved Scutum Shield',
      knight: 'Cavalry Pilum & Red Crest',
      bishop: 'Imperial Aquila Eagle Standard',
      rook: 'Fortified Ballista Watchtower',
      queen: 'Empress Augusta Golden Tiara & Ceremonial Blade',
      king: 'Emperor Caesar Golden Laurel & Imperial Gladius'
    },
    attire: 'Imperial Carrara marble, polished brass armor, and vermilion legionnaire crests.',
    soundProfile: 'Marching legion sandals, bronze sword clashes, and resonant brass horn fanfares.'
  },
  crusader: {
    id: 'crusader',
    name: 'Medieval Crusaders',
    culture: 'Knights Templar',
    accentColor: '#3a86ff',
    badgeBg: 'rgba(58, 134, 255, 0.2)',
    description: 'Chivalric knights in heavy forged plate steel, wielding broadswords, heater shields, and holy halberds.',
    weapons: {
      pawn: 'Forged Shortsword & Crusader Cross Shield',
      knight: 'Jousting Steel Lance & Fluted Barding',
      bishop: 'Holy Cross Staff & Sanctified Reliquary',
      rook: 'Gothic Citadel Keep & Crenellations',
      queen: 'High Queen Jeweled Coronet & Royal Rapier',
      king: 'Grandmaster Crowned Great Helm & Holy Greatsword'
    },
    attire: 'Polished mirror plate steel, chainmail, and white surcoats emblazoned with heraldic crosses.',
    soundProfile: 'Heavy iron plate footfalls, metallic greatsword cleaves, and solemn cathedral bell chimes.'
  },
  samurai: {
    id: 'samurai',
    name: 'Shogun Samurai',
    culture: 'Feudal Japan',
    accentColor: '#d4af37',
    badgeBg: 'rgba(212, 175, 55, 0.2)',
    description: 'Honor-bound bushi warriors with curved folded steel katanas, naginatas, and lacquered kabuto armor.',
    weapons: {
      pawn: 'Wakizashi Blade & Wooden Clan Mon Banner',
      knight: 'Curved Naginata Polearm & Horned Mempo',
      bishop: 'Shinto Shakujo Monk Staff & Talismans',
      rook: 'Tenshu Fortress Pagoda with Golden Shachi',
      queen: 'Empress Onna-Musha Katana & Ornate Kanzashi',
      king: 'Shogun Horned Kabuto & Ceremonial Tachi Katana'
    },
    attire: 'Black and crimson urushi lacquer with gold gilding, silk cords, and crescent moon crests.',
    soundProfile: 'Swift blade air slicing, wooden clapper taps, and crisp steel deflections.'
  },
  viking: {
    id: 'viking',
    name: 'Viking Berserkers',
    culture: 'Norse Jarls',
    accentColor: '#2a9d8f',
    badgeBg: 'rgba(42, 157, 143, 0.2)',
    description: 'Fierce Northmen bearing heavy bearded battleaxes, round rawhide shields, and carved runic totems.',
    weapons: {
      pawn: 'Bearded Handaxe & Painted Round Shield',
      knight: 'Heavy Dane Axe & Spiked War Helmet',
      bishop: 'Shamanic Runic Staff & Raven Totem',
      rook: 'Dragon-Prow Longship Fortress Column',
      queen: 'Shieldmaiden Queen Winged Circlet & Twin Seaxes',
      king: 'Jarl of the North Bear Mantle & Runic Greataxe'
    },
    attire: 'Weathered granite stone, dark forged iron, bronze runes, and braided pelt mantles.',
    soundProfile: 'Thunderous war-drum beats, heavy axe splinters, and deep Norse war-horn blasts.'
  },
  egyptian: {
    id: 'egyptian',
    name: 'Egyptian Pharaohs',
    culture: 'Ancient Dynasty',
    accentColor: '#e76f51',
    badgeBg: 'rgba(231, 111, 81, 0.2)',
    description: 'Divine sovereigns and royal guards wielding bronze khopesh sickles, gilded sun-shields, and ankh staves.',
    weapons: {
      pawn: 'Bronze Khopesh Dagger & Golden Sun Shield',
      knight: 'Royal Chariot Spear & Uraeus Crest',
      bishop: 'Golden Was Scepter & Lotus Papyrus Staff',
      rook: 'Gilded Obelisk Pylon with Carved Hieroglyphs',
      queen: 'Queen Nefertiti Tall Crown & Gilded Scepter',
      king: 'Pharaoh Double Pschent Crown & Crook and Flail'
    },
    attire: 'Sun-warmed alabaster sandstone, lapis lazuli, and pure 24-karat pharaonic gold inlays.',
    soundProfile: 'Ringing bronze gong chimes, shifting desert sand whispers, and whipping khopesh strikes.'
  },
  gothic: {
    id: 'gothic',
    name: 'Gothic Sanctum',
    culture: 'Wizard Guild',
    accentColor: '#a06cd5',
    badgeBg: 'rgba(160, 108, 213, 0.2)',
    description: 'The ancient enchanted wizard order wielding pulsing arcane staves, runic blades, and spectral stone magic.',
    weapons: {
      pawn: 'Runic Dagger & Ethereal Void Aegis',
      knight: 'Spectral Scythe & Arcane Horns',
      bishop: 'Dark Wizard Staff with Levitating Orb',
      rook: 'Gothic Cathedral Spire with Gargoyle Wings',
      queen: 'Sorceress Queen Barbed Crown & Levitation Orb',
      king: 'Arch-Mage Radiant Dark Crown & Sceptre of Power'
    },
    attire: 'Deep volcanic obsidian, luminescent cyan and violet rune veins, and floating magical dust.',
    soundProfile: 'Humming arcane resonance, crystal bursts, and crushing stone impact echoes.'
  }
};

export interface BattlegroundInfo {
  id: BattlegroundId;
  name: string;
  theme: string;
  description: string;
  lightSqColor: number;
  darkSqColor: number;
  rimColor: number;
  lightColor: number;
  fogColor: number;
  ambientBoost: number;
}

export const BATTLEGROUNDS: Record<BattlegroundId, BattlegroundInfo> = {
  sanctum: {
    id: 'sanctum',
    name: 'Cathedral Sanctum',
    theme: 'Gothic Obsidian Altar',
    description: 'The sacred altar flanked by twin roaring braziers, high Gothic lancet windows, and ashlar vaults.',
    lightSqColor: 0xdcd3c2,
    darkSqColor: 0x14171f,
    rimColor: 0xd4af37,
    lightColor: 0xffe0b5,
    fogColor: 0x080b14,
    ambientBoost: 1.0
  },
  forum: {
    id: 'forum',
    name: 'Imperial Forum',
    theme: 'Classical Roman Plaza',
    description: 'Sunlit classical Carrara marble and dark granite checkerboard bordered with imperial laurels.',
    lightSqColor: 0xf5f3ee,
    darkSqColor: 0x2b303c,
    rimColor: 0xdfb15b,
    lightColor: 0xfffaed,
    fogColor: 0x0c121d,
    ambientBoost: 1.2
  },
  fjord: {
    id: 'fjord',
    name: 'Nordic Frost Peak',
    theme: 'Glacial Aurora Summit',
    description: 'Frost-veined crystalline ice tiles and dark slate stone kissed by cold northern moonlight.',
    lightSqColor: 0xd6e5f3,
    darkSqColor: 0x182633,
    rimColor: 0x7daed4,
    lightColor: 0x9bc4ff,
    fogColor: 0x07111b,
    ambientBoost: 1.1
  },
  pharaoh: {
    id: 'pharaoh',
    name: "Pharaoh's Tomb",
    theme: 'Ancient Sun Sandstone',
    description: 'Golden desert sandstone and deep royal lapis lazuli tiles illuminated by flicker of warm torchlight.',
    lightSqColor: 0xf0e3cb,
    darkSqColor: 0x192338,
    rimColor: 0xe5a93b,
    lightColor: 0xffb85c,
    fogColor: 0x140e0a,
    ambientBoost: 1.15
  },
  shogun: {
    id: 'shogun',
    name: 'Shogun Pavilion',
    theme: 'Lacquered Zen Courtyard',
    description: 'Hand-buffed white ivory and midnight black lacquer tiles with vermilion and gold accents.',
    lightSqColor: 0xeee7dc,
    darkSqColor: 0x141216,
    rimColor: 0xc93b3b,
    lightColor: 0xffd2a0,
    fogColor: 0x100d14,
    ambientBoost: 1.05
  },
  magma: {
    id: 'magma',
    name: 'Volcanic Forge',
    theme: 'Molten Basalt Cavern',
    description: 'Charred volcanic basalt and incandescent magma inlays that pulse with geothermal fury.',
    lightSqColor: 0x5a4a42,
    darkSqColor: 0x100c0a,
    rimColor: 0xe05324,
    lightColor: 0xff6b35,
    fogColor: 0x130604,
    ambientBoost: 1.25
  }
};
