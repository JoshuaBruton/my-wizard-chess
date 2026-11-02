import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('Match Setup & Army Customization modules exist with complete configurations', () => {
  const typesContent = fs.readFileSync(path.join(ROOT, 'src/types/chess.ts'), 'utf-8');

  // Verify all 6 historical army types exist
  for (const armyType of ['roman', 'crusader', 'samurai', 'viking', 'egyptian', 'gothic']) {
    assert.ok(typesContent.includes(`id: '${armyType}'`), `Missing army type definition: ${armyType}`);
  }

  // Verify all 6 battleground arenas exist
  for (const bg of ['sanctum', 'forum', 'fjord', 'pharaoh', 'shogun', 'magma']) {
    assert.ok(typesContent.includes(`id: '${bg}'`), `Missing battleground definition: ${bg}`);
  }

  // Verify all 4 AI difficulties exist
  for (const diff of ['easy', 'normal', 'hard', 'intense']) {
    assert.ok(typesContent.includes(`'${diff}'`), `Missing AI difficulty option: ${diff}`);
  }
});

test('3D Piece Gear accessories generator module exports required builders', () => {
  const gearContent = fs.readFileSync(path.join(ROOT, 'src/accessories/pieceGear.ts'), 'utf-8');
  assert.ok(gearContent.includes('export function createPieceAccessories'), 'Missing createPieceAccessories export');
  assert.ok(gearContent.includes('export function getArmyPieceMaterial'), 'Missing getArmyPieceMaterial export');
  assert.ok(gearContent.includes('export function getArmyTrimMaterial'), 'Missing getArmyTrimMaterial export');

  // All army types are handled in the accessory generator
  for (const army of ['roman', 'crusader', 'samurai', 'viking', 'egyptian', 'gothic']) {
    assert.ok(gearContent.includes(`case '${army}'`), `Gear generator missing handling for ${army}`);
  }
});

test('Web Audio synthesizer module exports required sound methods', () => {
  const audioContent = fs.readFileSync(path.join(ROOT, 'src/audio/chessAudio.ts'), 'utf-8');
  assert.ok(audioContent.includes('export const chessAudio'), 'Missing chessAudio export');
  assert.ok(audioContent.includes('playMove('), 'Missing playMove method');
  assert.ok(audioContent.includes('playAttack('), 'Missing playAttack method');
  assert.ok(audioContent.includes('playShatter('), 'Missing playShatter method');
  assert.ok(audioContent.includes('playCheck('), 'Missing playCheck method');
  assert.ok(audioContent.includes('playCheckmate('), 'Missing playCheckmate method');
});

test('App.tsx contains Match Setup Modal, 2-player turn banner, and piece inspector', () => {
  const appContent = fs.readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf-8');

  // Must include Match Setup button & modal
  assert.ok(appContent.includes('id="btn-open-match-setup"'), 'Missing #btn-open-match-setup button in App.tsx');
  assert.ok(appContent.includes('<MatchSetupModal'), 'Missing MatchSetupModal render in App.tsx');
  assert.ok(appContent.includes('<TurnTransitionBanner'), 'Missing TurnTransitionBanner render in App.tsx');
  assert.ok(appContent.includes('<PieceInspectorCard'), 'Missing PieceInspectorCard render in App.tsx');

  // Verify 2-player pass and play camera controls exist
  assert.ok(appContent.includes('id="btn-flip-view"'), 'Missing #btn-flip-view in App.tsx');
  assert.ok(appContent.includes('id="btn-toggle-autoflip"'), 'Missing #btn-toggle-autoflip in App.tsx');
  assert.ok(appContent.includes('id="btn-toggle-sound"'), 'Missing #btn-toggle-sound in App.tsx');
});
