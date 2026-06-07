# [Try it out here](https://pedruu.ch/games/target_practice/)

## Description

A shooter game to practice reaction time/aim.
Need to shoot targets that appear randomly in the canvas.

## Options

The game options (target health/spawn interval/duration, reloading, recoil) can be changed in the game menu, and are saved in the browser's local storage — they carry over to the next session.

## Targets

Targets spawn at random positions at a fixed interval, and disappear after a set duration if not destroyed (counting as a miss).

Targets can be configured to require multiple hits — they fade a bit with each hit (down to a minimum opacity, so they stay visible), giving feedback that the damage is registering.

## Weapon mechanics

The weapon fires while the pointer is held, at a fixed interval per bullet.
Every shot has a small random variance around the pointer position.

### Recoil

Sustained fire builds up recoil: from the 3rd consecutive bullet onwards, shots drift upwards (and slightly sideways) following a fixed pattern, growing stronger the longer the spray (see the recoil table in `source/weapon.ts`).

When you stop firing, recoil doesn't reset immediately — it recovers gradually (one bullet's worth per `recoilRecoveryInterval`). The recovery rate is deliberately slower than the fire rate: if recoil reset right away (or recovered as fast as you can shoot), tap-firing (click/click/click) would give the full fire rate with no recoil, making click-spam strictly better than holding to spray. Keep that invariant in mind when tuning weapon values.

Reloading resets the recoil pattern — a fresh magazine starts with no recoil.

Recoil can be turned off entirely in the game menu (useful when practicing with high-health targets).

### Reloading

The weapon reloads automatically when the magazine runs out, and can't fire during the reload.

## License

Copyright (c) 2014-2026 Pedro Ferreira.

Licensed under the GNU Affero General Public License version 3 only.
See [license.txt](license.txt) for the full license text.
