import * as Game from './game';
import { Target } from './target';

let HITS: HTMLElement;
let MISSES: HTMLElement;
let BULLETS_LEFT: HTMLElement;

function getElement<T extends Element>(
    parent: ParentNode,
    selector: string,
): T {
    const element = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Missing required element: ${selector}`);
    }

    return element;
}

export function init(): void {
    const container = getElement<HTMLElement>(document, '#GameMenu');

    // restart //
    const restart = getElement<HTMLElement>(container, '#Restart');

    restart.onclick = function () {
        Game.restart();
    };

    // target health //
    const targetHealth = getElement<HTMLElement>(container, '#TargetHealth');
    const targetInput = getElement<HTMLInputElement>(targetHealth, 'input');
    const targetValue = getElement<HTMLSpanElement>(targetHealth, 'span');

    const healthValue = Game.getTargetHealth().toString();

    targetInput.value = healthValue;
    targetValue.textContent = healthValue + 'hp';

    targetInput.onchange = function () {
        Game.setTargetHealth(parseInt(targetInput.value, 10));
        targetValue.textContent = targetInput.value + 'hp';
    };
    targetInput.oninput = function () {
        targetValue.textContent = targetInput.value + 'hp';
    };

    // target spawn interval //

    const spawnInterval = getElement<HTMLElement>(
        container,
        '#TargetSpawnInterval',
    );
    const spawnInput = getElement<HTMLInputElement>(spawnInterval, 'input');
    const spawnValue = getElement<HTMLSpanElement>(spawnInterval, 'span');

    const intervalValue = (Game.getTargetSpawnInterval() / 1000).toFixed(1);

    spawnInput.value = intervalValue;
    spawnValue.textContent = intervalValue + 's';

    spawnInput.onchange = function () {
        Game.setTargetSpawnInterval(parseFloat(spawnInput.value) * 1000);
        spawnValue.textContent = parseFloat(spawnInput.value).toFixed(1) + 's';
    };
    spawnInput.oninput = function () {
        spawnValue.textContent = parseFloat(spawnInput.value).toFixed(1) + 's';
    };

    // target duration //

    const targetDuration = getElement<HTMLElement>(
        container,
        '#TargetDuration',
    );
    const durationInput = getElement<HTMLInputElement>(targetDuration, 'input');
    const durationValue = getElement<HTMLSpanElement>(targetDuration, 'span');

    const currentDurationValue = (Target.getDuration() / 1000).toFixed(1);

    durationInput.value = currentDurationValue;
    durationValue.textContent = currentDurationValue + 's';

    durationInput.onchange = function () {
        Target.setDuration(parseFloat(durationInput.value) * 1000);
        durationValue.textContent =
            parseFloat(durationInput.value).toFixed(1) + 's';

        Game.restart();
    };
    durationInput.oninput = function () {
        durationValue.textContent =
            parseFloat(durationInput.value).toFixed(1) + 's';
    };

    // reloading //

    const canReload = getElement<HTMLInputElement>(container, '#CanReload');

    canReload.checked = true;
    canReload.onchange = function () {
        Game.setCanReload(canReload.checked);
    };

    // other //

    HITS = getElement<HTMLElement>(container, '#HitsValue');
    MISSES = getElement<HTMLElement>(container, '#MissesValue');
    BULLETS_LEFT = getElement<HTMLElement>(container, '#BulletsLeft');
}

export function updateHits(count: number): void {
    HITS.textContent = count.toString();
}

export function updateMisses(count: number): void {
    MISSES.textContent = count.toString();
}

export function updateBulletsLeft(count: number): void {
    BULLETS_LEFT.textContent = count.toString();
}

export function clear(): void {
    HITS.textContent = '0';
    MISSES.textContent = '0';
}
