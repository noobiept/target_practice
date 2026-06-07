import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadOptions, saveOption } from '../source/options';

beforeEach(() => {
    const store = new Map<string, string>();

    vi.stubGlobal('localStorage', {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value),
    });
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('Options', () => {
    it('returns no options when nothing was saved', () => {
        expect(loadOptions()).toEqual({});
    });

    it('round-trips the saved options', () => {
        saveOption('targetHealth', 3);
        saveOption('targetDuration', 8000);
        saveOption('hasRecoil', false);

        expect(loadOptions()).toEqual({
            targetHealth: 3,
            targetDuration: 8000,
            hasRecoil: false,
        });
    });

    it('ignores saved values with the wrong type', () => {
        localStorage.setItem(
            'target_practice.options',
            JSON.stringify({
                targetHealth: 'lots',
                canReload: false,
                unknownOption: true,
            }),
        );

        expect(loadOptions()).toEqual({ canReload: false });
    });
});
