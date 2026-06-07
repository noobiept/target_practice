export interface GameController {
    restart(): void;
    getTargetHealth(): number;
    setTargetHealth(health: number): void;
    getTargetSpawnInterval(): number;
    setTargetSpawnInterval(interval: number): void;
    getTargetDuration(): number;
    setTargetDuration(duration: number): void;
    setCanReload(value: boolean): void;
    setHasRecoil(value: boolean): void;
}

export interface GameHud {
    updateHits(count: number): void;
    updateMisses(count: number): void;
    updateBulletsLeft(count: number): void;
}

export interface MessageView {
    show(text: string, timeout?: number, callback?: () => void): void;
    hide(): void;
}

export type RandomInt = (min: number, max: number) => number;
