import * as THREE from 'three';
import { ArmyType } from '../types/chess';

// Shared reusable materials for weapon attachments
const goldBrassMat = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  roughness: 0.25,
  metalness: 0.88
});

const polishedSteelMat = new THREE.MeshStandardMaterial({
  color: 0xdde4ec,
  roughness: 0.18,
  metalness: 0.92
});

const darkIronMat = new THREE.MeshStandardMaterial({
  color: 0x242830,
  roughness: 0.35,
  metalness: 0.85
});

const woodShaftMat = new THREE.MeshStandardMaterial({
  color: 0x5c3a21,
  roughness: 0.75,
  metalness: 0.05
});

const romanRedMat = new THREE.MeshStandardMaterial({
  color: 0x9e1b25,
  roughness: 0.35,
  metalness: 0.2
});

const crusaderWhiteMat = new THREE.MeshStandardMaterial({
  color: 0xf5f7fa,
  roughness: 0.28,
  metalness: 0.15
});

const crusaderRedMat = new THREE.MeshStandardMaterial({
  color: 0xb51a1a,
  roughness: 0.3,
  metalness: 0.2
});

const samuraiCrimsonMat = new THREE.MeshStandardMaterial({
  color: 0x85161c,
  roughness: 0.15,
  metalness: 0.4
});

const vikingTealMat = new THREE.MeshStandardMaterial({
  color: 0x22555c,
  roughness: 0.55,
  metalness: 0.25
});

const egyptianTurquoiseMat = new THREE.MeshStandardMaterial({
  color: 0x177e89,
  roughness: 0.22,
  metalness: 0.3
});

const egyptianGoldMat = new THREE.MeshStandardMaterial({
  color: 0xf3b738,
  roughness: 0.2,
  metalness: 0.92
});

const arcaneGlowMat = new THREE.MeshStandardMaterial({
  color: 0x8a3ffc,
  emissive: 0x6929c4,
  emissiveIntensity: 1.8,
  roughness: 0.15,
  metalness: 0.5
});

const arcaneCyanGlowMat = new THREE.MeshStandardMaterial({
  color: 0x1192e8,
  emissive: 0x00539a,
  emissiveIntensity: 1.6,
  roughness: 0.15,
  metalness: 0.5
});

export function getArmyPieceMaterial(color: 'w' | 'b', armyType: ArmyType): THREE.MeshStandardMaterial {
  const isWhite = color === 'w';

  switch (armyType) {
    case 'roman':
      return new THREE.MeshStandardMaterial({
        color: isWhite ? 0xedebe4 : 0x1a1c22,
        roughness: isWhite ? 0.22 : 0.18,
        metalness: isWhite ? 0.12 : 0.35
      });

    case 'crusader':
      return new THREE.MeshStandardMaterial({
        color: isWhite ? 0xdde5ee : 0x1f2228,
        roughness: isWhite ? 0.24 : 0.28,
        metalness: isWhite ? 0.85 : 0.88
      });

    case 'samurai':
      return new THREE.MeshStandardMaterial({
        color: isWhite ? 0xf7f5f0 : 0x111317,
        roughness: isWhite ? 0.14 : 0.10,
        metalness: isWhite ? 0.18 : 0.40
      });

    case 'viking':
      return new THREE.MeshStandardMaterial({
        color: isWhite ? 0xc8d0d6 : 0x1b1d20,
        roughness: isWhite ? 0.60 : 0.56,
        metalness: isWhite ? 0.22 : 0.42
      });

    case 'egyptian':
      return new THREE.MeshStandardMaterial({
        color: isWhite ? 0xf5eedf : 0x151928,
        roughness: isWhite ? 0.28 : 0.20,
        metalness: isWhite ? 0.20 : 0.50
      });

    case 'gothic':
    default:
      return new THREE.MeshStandardMaterial({
        color: isWhite ? 0xe6dfd0 : 0x14161f,
        roughness: isWhite ? 0.34 : 0.26,
        metalness: isWhite ? 0.06 : 0.28
      });
  }
}

export function getArmyTrimMaterial(color: 'w' | 'b', armyType: ArmyType): THREE.MeshStandardMaterial {
  switch (armyType) {
    case 'roman':
      return goldBrassMat;
    case 'crusader':
      return color === 'w' ? goldBrassMat : darkIronMat;
    case 'samurai':
      return goldBrassMat;
    case 'viking':
      return darkIronMat;
    case 'egyptian':
      return egyptianGoldMat;
    case 'gothic':
    default:
      return color === 'w' ? arcaneCyanGlowMat : arcaneGlowMat;
  }
}

/**
 * Creates 3D gear, weapons, and attire accessories attached to chess piece models
 */
export function createPieceAccessories(type: string, color: 'w' | 'b', armyType: ArmyType): THREE.Group {
  const group = new THREE.Group();
  group.name = 'PieceAccessories';

  const isWhite = color === 'w';
  const scale = 0.95;

  switch (armyType) {
    case 'roman': {
      // Roman Legion: Scutum Shield, Gladius, Pilum, Centurion Crest
      if (type === 'pawn' || type === 'knight' || type === 'king') {
        // Scutum Shield (curved red rectangular body with golden center boss & trim)
        const shieldGroup = new THREE.Group();
        const bodyGeo = new THREE.BoxGeometry(0.12, 0.24, 0.02);
        const shieldMesh = new THREE.Mesh(bodyGeo, romanRedMat);
        shieldMesh.castShadow = true;
        shieldGroup.add(shieldMesh);

        const rimGeo = new THREE.BoxGeometry(0.128, 0.248, 0.008);
        const rimMesh = new THREE.Mesh(rimGeo, goldBrassMat);
        shieldGroup.add(rimMesh);

        const bossGeo = new THREE.SphereGeometry(0.024, 12, 12);
        const bossMesh = new THREE.Mesh(bossGeo, goldBrassMat);
        bossMesh.position.z = 0.016;
        shieldGroup.add(bossMesh);

        shieldGroup.position.set(-0.13, 0.22, 0.04);
        shieldGroup.rotation.set(0, 0.3, 0);
        group.add(shieldGroup);
      }

      if (type === 'pawn' || type === 'queen' || type === 'king') {
        // Gladius sword
        const swordGroup = new THREE.Group();
        const bladeGeo = new THREE.BoxGeometry(0.022, 0.22, 0.008);
        const bladeMesh = new THREE.Mesh(bladeGeo, polishedSteelMat);
        bladeMesh.position.y = 0.11;
        bladeMesh.castShadow = true;
        swordGroup.add(bladeMesh);

        const guardGeo = new THREE.BoxGeometry(0.065, 0.016, 0.018);
        const guardMesh = new THREE.Mesh(guardGeo, goldBrassMat);
        swordGroup.add(guardMesh);

        const pommelGeo = new THREE.SphereGeometry(0.016, 8, 8);
        const pommelMesh = new THREE.Mesh(pommelGeo, goldBrassMat);
        pommelMesh.position.y = -0.045;
        swordGroup.add(pommelMesh);

        swordGroup.position.set(0.14, 0.18, 0.02);
        swordGroup.rotation.set(0.2, -0.2, -0.4);
        group.add(swordGroup);
      }

      if (type === 'knight' || type === 'bishop') {
        // Pilum Spear
        const spearGroup = new THREE.Group();
        const shaftGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.44, 8);
        const shaftMesh = new THREE.Mesh(shaftGeo, woodShaftMat);
        shaftMesh.castShadow = true;
        spearGroup.add(shaftMesh);

        const tipGeo = new THREE.ConeGeometry(0.02, 0.08, 6);
        const tipMesh = new THREE.Mesh(tipGeo, goldBrassMat);
        tipMesh.position.y = 0.24;
        spearGroup.add(tipMesh);

        spearGroup.position.set(0.15, 0.26, 0.02);
        spearGroup.rotation.set(0.15, 0, -0.2);
        group.add(spearGroup);
      }

      if (type === 'king' || type === 'queen') {
        // Golden Laurel Wreath / Centurion Crown
        const crownGeo = new THREE.TorusGeometry(0.075, 0.014, 8, 24);
        const crownMesh = new THREE.Mesh(crownGeo, goldBrassMat);
        crownMesh.rotation.x = Math.PI / 2;
        crownMesh.position.set(0, 0.54, 0);
        group.add(crownMesh);
      }
      break;
    }

    case 'crusader': {
      // Medieval Crusaders: Heater shield with Red Cross, Knight Broadsword, Helm
      if (type === 'pawn' || type === 'knight' || type === 'king') {
        const shieldGroup = new THREE.Group();
        const shieldGeo = new THREE.BoxGeometry(0.14, 0.24, 0.018);
        const shieldMesh = new THREE.Mesh(shieldGeo, crusaderWhiteMat);
        shieldMesh.castShadow = true;
        shieldGroup.add(shieldMesh);

        // Red cross
        const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.038, 0.022), crusaderRedMat);
        const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.22, 0.022), crusaderRedMat);
        crossH.position.y = 0.02;
        crossV.position.y = 0.02;
        shieldGroup.add(crossH);
        shieldGroup.add(crossV);

        shieldGroup.position.set(-0.14, 0.22, 0.04);
        shieldGroup.rotation.set(0, 0.25, 0);
        group.add(shieldGroup);
      }

      // Broadsword
      const swordGroup = new THREE.Group();
      const bladeGeo = new THREE.BoxGeometry(0.026, 0.28, 0.008);
      const bladeMesh = new THREE.Mesh(bladeGeo, polishedSteelMat);
      bladeMesh.position.y = 0.14;
      bladeMesh.castShadow = true;
      swordGroup.add(bladeMesh);

      const crossguardGeo = new THREE.BoxGeometry(0.088, 0.016, 0.018);
      const crossguardMesh = new THREE.Mesh(crossguardGeo, goldBrassMat);
      swordGroup.add(crossguardMesh);

      const pommelGeo = new THREE.SphereGeometry(0.018, 10, 10);
      const pommelMesh = new THREE.Mesh(pommelGeo, goldBrassMat);
      pommelMesh.position.y = -0.05;
      swordGroup.add(pommelMesh);

      swordGroup.position.set(0.14, 0.20, 0.02);
      swordGroup.rotation.set(0.1, -0.15, -0.35);
      group.add(swordGroup);

      if (type === 'king' || type === 'queen') {
        // Royal Crown
        const crownGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.05, 12, 1, true);
        const crownMesh = new THREE.Mesh(crownGeo, goldBrassMat);
        crownMesh.position.set(0, 0.54, 0);
        group.add(crownMesh);
      }
      break;
    }

    case 'samurai': {
      // Shogun Samurai: Curved Katana, Sashimono Banner, Horned Kabuto
      // Katana
      const katanaGroup = new THREE.Group();
      const bladeGeo = new THREE.BoxGeometry(0.018, 0.32, 0.006);
      const bladeMesh = new THREE.Mesh(bladeGeo, polishedSteelMat);
      bladeMesh.position.y = 0.16;
      bladeMesh.rotation.z = -0.05;
      bladeMesh.castShadow = true;
      katanaGroup.add(bladeMesh);

      const tsubaGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.008, 16);
      const tsubaMesh = new THREE.Mesh(tsubaGeo, goldBrassMat);
      katanaGroup.add(tsubaMesh);

      const hiltGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.08, 8);
      const hiltMesh = new THREE.Mesh(hiltGeo, darkIronMat);
      hiltMesh.position.y = -0.045;
      katanaGroup.add(hiltMesh);

      katanaGroup.position.set(0.13, 0.22, 0.02);
      katanaGroup.rotation.set(0.2, -0.3, -0.4);
      group.add(katanaGroup);

      // Sashimono Back Banner (for Pawns and Knights)
      if (type === 'pawn' || type === 'knight') {
        const bannerGroup = new THREE.Group();
        const poleGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.38, 8);
        const poleMesh = new THREE.Mesh(poleGeo, woodShaftMat);
        poleMesh.position.y = 0.19;
        bannerGroup.add(poleMesh);

        const clothGeo = new THREE.BoxGeometry(0.075, 0.22, 0.006);
        const clothMesh = new THREE.Mesh(clothGeo, samuraiCrimsonMat);
        clothMesh.position.set(0.042, 0.24, 0);
        bannerGroup.add(clothMesh);

        bannerGroup.position.set(0, 0.15, -0.09);
        group.add(bannerGroup);
      }

      // Kabuto Kuwagata Horns (for King, Queen, Bishop)
      if (type === 'king' || type === 'queen' || type === 'bishop') {
        const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.12, 8), goldBrassMat);
        const hornR = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.12, 8), goldBrassMat);
        hornL.position.set(-0.045, 0.56, 0.02);
        hornL.rotation.set(0.2, 0, 0.4);
        hornR.position.set(0.045, 0.56, 0.02);
        hornR.rotation.set(0.2, 0, -0.4);
        group.add(hornL);
        group.add(hornR);
      }
      break;
    }

    case 'viking': {
      // Viking Berserkers: Bearded Battleaxe, Round Wood Shield, Horned Helm
      // Round Shield
      const shieldGroup = new THREE.Group();
      const discGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.02, 20);
      const discMesh = new THREE.Mesh(discGeo, vikingTealMat);
      discMesh.rotation.x = Math.PI / 2;
      discMesh.castShadow = true;
      shieldGroup.add(discMesh);

      const bossGeo = new THREE.SphereGeometry(0.032, 10, 10);
      const bossMesh = new THREE.Mesh(bossGeo, darkIronMat);
      bossMesh.position.z = 0.015;
      shieldGroup.add(bossMesh);

      shieldGroup.position.set(-0.13, 0.22, 0.04);
      shieldGroup.rotation.set(0, 0.3, 0);
      group.add(shieldGroup);

      // Bearded Battleaxe
      const axeGroup = new THREE.Group();
      const haftGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.34, 8);
      const haftMesh = new THREE.Mesh(haftGeo, woodShaftMat);
      haftMesh.position.y = 0.12;
      haftMesh.castShadow = true;
      axeGroup.add(haftMesh);

      const headGeo = new THREE.BoxGeometry(0.11, 0.07, 0.018);
      const headMesh = new THREE.Mesh(headGeo, darkIronMat);
      headMesh.position.set(0.045, 0.24, 0);
      headMesh.castShadow = true;
      axeGroup.add(headMesh);

      axeGroup.position.set(0.14, 0.18, 0.02);
      axeGroup.rotation.set(0.2, -0.2, -0.35);
      group.add(axeGroup);

      if (type === 'king' || type === 'queen') {
        const mantleGeo = new THREE.TorusGeometry(0.12, 0.03, 8, 16);
        const mantleMesh = new THREE.Mesh(mantleGeo, darkIronMat);
        mantleMesh.rotation.x = Math.PI / 2;
        mantleMesh.position.set(0, 0.36, 0);
        group.add(mantleMesh);
      }
      break;
    }

    case 'egyptian': {
      // Egyptian Pharaohs: Khopesh Sickle Sword, Sun Shield, Ankh Scepter
      // Khopesh Blade
      const khopeshGroup = new THREE.Group();
      const stemGeo = new THREE.BoxGeometry(0.02, 0.16, 0.008);
      const stemMesh = new THREE.Mesh(stemGeo, egyptianGoldMat);
      stemMesh.position.y = 0.08;
      khopeshGroup.add(stemMesh);

      // Curved hook
      const hookGeo = new THREE.TorusGeometry(0.05, 0.012, 8, 16, Math.PI * 0.7);
      const hookMesh = new THREE.Mesh(hookGeo, egyptianGoldMat);
      hookMesh.position.set(0.04, 0.18, 0);
      hookMesh.rotation.z = -0.5;
      khopeshGroup.add(hookMesh);

      khopeshGroup.position.set(0.14, 0.20, 0.02);
      khopeshGroup.rotation.set(0.15, -0.2, -0.35);
      group.add(khopeshGroup);

      // Golden Sun Shield
      if (type === 'pawn' || type === 'knight' || type === 'king') {
        const shieldGroup = new THREE.Group();
        const roundGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.016, 24);
        const roundMesh = new THREE.Mesh(roundGeo, egyptianGoldMat);
        roundMesh.rotation.x = Math.PI / 2;
        shieldGroup.add(roundMesh);

        const gemGeo = new THREE.SphereGeometry(0.024, 10, 10);
        const gemMesh = new THREE.Mesh(gemGeo, egyptianTurquoiseMat);
        gemMesh.position.z = 0.014;
        shieldGroup.add(gemMesh);

        shieldGroup.position.set(-0.13, 0.22, 0.04);
        shieldGroup.rotation.set(0, 0.3, 0);
        group.add(shieldGroup);
      }

      // Nemes Headdress / Crown for King & Queen
      if (type === 'king' || type === 'queen') {
        const nemesGeo = new THREE.ConeGeometry(0.10, 0.16, 4);
        const nemesMesh = new THREE.Mesh(nemesGeo, egyptianGoldMat);
        nemesMesh.rotation.y = Math.PI / 4;
        nemesMesh.position.set(0, 0.58, 0);
        group.add(nemesMesh);
      }
      break;
    }

    case 'gothic':
    default: {
      // Gothic Wizard Sanctum: Arcane Staff with Levitating Orb, Void Aegis
      if (type === 'bishop' || type === 'queen' || type === 'king') {
        const staffGroup = new THREE.Group();
        const poleGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.44, 8);
        const poleMesh = new THREE.Mesh(poleGeo, darkIronMat);
        staffGroup.add(poleMesh);

        const orbGeo = new THREE.SphereGeometry(0.035, 16, 16);
        const orbMesh = new THREE.Mesh(orbGeo, isWhite ? arcaneCyanGlowMat : arcaneGlowMat);
        orbMesh.position.y = 0.25;
        staffGroup.add(orbMesh);

        staffGroup.position.set(0.14, 0.25, 0.02);
        group.add(staffGroup);
      } else {
        // Void Dagger
        const daggerGroup = new THREE.Group();
        const bladeGeo = new THREE.BoxGeometry(0.02, 0.20, 0.008);
        const bladeMesh = new THREE.Mesh(bladeGeo, isWhite ? arcaneCyanGlowMat : arcaneGlowMat);
        bladeMesh.position.y = 0.10;
        daggerGroup.add(bladeMesh);

        daggerGroup.position.set(0.14, 0.18, 0.02);
        daggerGroup.rotation.set(0.15, -0.2, -0.35);
        group.add(daggerGroup);
      }

      // Barbed Void Crown
      if (type === 'king' || type === 'queen') {
        const crownGroup = new THREE.Group();
        for (let i = 0; i < 5; i++) {
          const spikeGeo = new THREE.ConeGeometry(0.012, 0.08, 5);
          const spikeMesh = new THREE.Mesh(spikeGeo, isWhite ? arcaneCyanGlowMat : arcaneGlowMat);
          const ang = (i / 5) * Math.PI * 2;
          spikeMesh.position.set(Math.sin(ang) * 0.06, 0.52, Math.cos(ang) * 0.06);
          crownGroup.add(spikeMesh);
        }
        group.add(crownGroup);
      }
      break;
    }
  }

  group.scale.set(scale, scale, scale);
  return group;
}
