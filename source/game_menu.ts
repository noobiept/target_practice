import type { GameController, GameHud } from './game_contracts';

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

export class GameMenu implements GameHud {
    private readonly restart: HTMLElement;
    private readonly targetInput: HTMLInputElement;
    private readonly targetValue: HTMLSpanElement;
    private readonly spawnInput: HTMLInputElement;
    private readonly spawnValue: HTMLSpanElement;
    private readonly durationInput: HTMLInputElement;
    private readonly durationValue: HTMLSpanElement;
    private readonly canReload: HTMLInputElement;
    private readonly hasRecoil: HTMLInputElement;
    private readonly hits: HTMLElement;
    private readonly misses: HTMLElement;
    private readonly bulletsLeft: HTMLElement;

    constructor(parent: ParentNode) {
        const container = getElement<HTMLElement>(parent, '#GameMenu');
        const targetHealth = getElement<HTMLElement>(
            container,
            '#TargetHealth',
        );
        const spawnInterval = getElement<HTMLElement>(
            container,
            '#TargetSpawnInterval',
        );
        const targetDuration = getElement<HTMLElement>(
            container,
            '#TargetDuration',
        );

        this.restart = getElement<HTMLElement>(container, '#Restart');
        this.targetInput = getElement<HTMLInputElement>(targetHealth, 'input');
        this.targetValue = getElement<HTMLSpanElement>(targetHealth, 'span');
        this.spawnInput = getElement<HTMLInputElement>(spawnInterval, 'input');
        this.spawnValue = getElement<HTMLSpanElement>(spawnInterval, 'span');
        this.durationInput = getElement<HTMLInputElement>(
            targetDuration,
            'input',
        );
        this.durationValue = getElement<HTMLSpanElement>(
            targetDuration,
            'span',
        );
        this.canReload = getElement<HTMLInputElement>(container, '#CanReload');
        this.hasRecoil = getElement<HTMLInputElement>(container, '#HasRecoil');
        this.hits = getElement<HTMLElement>(container, '#HitsValue');
        this.misses = getElement<HTMLElement>(container, '#MissesValue');
        this.bulletsLeft = getElement<HTMLElement>(container, '#BulletsLeft');
    }

    bind(controller: GameController): void {
        this.restart.onclick = () => {
            controller.restart();
        };

        const healthValue = controller.getTargetHealth().toString();
        this.targetInput.value = healthValue;
        this.targetValue.textContent = healthValue + 'hp';
        this.targetInput.onchange = () => {
            controller.setTargetHealth(parseInt(this.targetInput.value, 10));
            this.targetValue.textContent = this.targetInput.value + 'hp';
        };
        this.targetInput.oninput = () => {
            this.targetValue.textContent = this.targetInput.value + 'hp';
        };

        const intervalValue = (
            controller.getTargetSpawnInterval() / 1000
        ).toFixed(1);
        this.spawnInput.value = intervalValue;
        this.spawnValue.textContent = intervalValue + 's';
        this.spawnInput.onchange = () => {
            controller.setTargetSpawnInterval(
                parseFloat(this.spawnInput.value) * 1000,
            );
            this.spawnValue.textContent =
                parseFloat(this.spawnInput.value).toFixed(1) + 's';
        };
        this.spawnInput.oninput = () => {
            this.spawnValue.textContent =
                parseFloat(this.spawnInput.value).toFixed(1) + 's';
        };

        const durationValue = (controller.getTargetDuration() / 1000).toFixed(
            1,
        );
        this.durationInput.value = durationValue;
        this.durationValue.textContent = durationValue + 's';
        this.durationInput.onchange = () => {
            controller.setTargetDuration(
                parseFloat(this.durationInput.value) * 1000,
            );
            this.durationValue.textContent =
                parseFloat(this.durationInput.value).toFixed(1) + 's';
        };
        this.durationInput.oninput = () => {
            this.durationValue.textContent =
                parseFloat(this.durationInput.value).toFixed(1) + 's';
        };

        this.canReload.checked = true;
        this.canReload.onchange = () => {
            controller.setCanReload(this.canReload.checked);
        };

        this.hasRecoil.checked = true;
        this.hasRecoil.onchange = () => {
            controller.setHasRecoil(this.hasRecoil.checked);
        };
    }

    updateHits(count: number): void {
        this.hits.textContent = count.toString();
    }

    updateMisses(count: number): void {
        this.misses.textContent = count.toString();
    }

    updateBulletsLeft(count: number): void {
        this.bulletsLeft.textContent = count.toString();
    }
}
