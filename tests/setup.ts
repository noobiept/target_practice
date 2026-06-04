import { vi } from 'vitest';

vi.mock('@drk4/game-engine', async () => {
    return import('./support/fake_game_engine');
});
