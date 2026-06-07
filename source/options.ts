import { getObject, saveObject } from '@drk4/utilities';

export interface GameOptions {
    targetHealth?: number;
    targetSpawnInterval?: number;
    targetDuration?: number;
    canReload?: boolean;
    hasRecoil?: boolean;
}

const STORAGE_KEY = 'target_practice.options';

export function loadOptions(): GameOptions {
    const saved: unknown = getObject(STORAGE_KEY);

    if (typeof saved !== 'object' || saved === null) {
        return {};
    }

    const data = saved as Record<string, unknown>;
    const options: GameOptions = {};

    if (typeof data.targetHealth === 'number') {
        options.targetHealth = data.targetHealth;
    }

    if (typeof data.targetSpawnInterval === 'number') {
        options.targetSpawnInterval = data.targetSpawnInterval;
    }

    if (typeof data.targetDuration === 'number') {
        options.targetDuration = data.targetDuration;
    }

    if (typeof data.canReload === 'boolean') {
        options.canReload = data.canReload;
    }

    if (typeof data.hasRecoil === 'boolean') {
        options.hasRecoil = data.hasRecoil;
    }

    return options;
}

export function saveOption<Key extends keyof GameOptions>(
    key: Key,
    value: Required<GameOptions>[Key],
): void {
    const options = loadOptions();

    options[key] = value;
    saveObject(STORAGE_KEY, options);
}
