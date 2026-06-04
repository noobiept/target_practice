interface ElementArgs {
    x?: number;
    y?: number;
}

class Element {
    x: number;
    y: number;
    width = 0;
    height = 0;
    visible = true;

    constructor({ x = 0, y = 0 }: ElementArgs = {}) {
        this.x = x;
        this.y = y;
    }

    get left(): number {
        return this.x - this.width / 2;
    }

    get top(): number {
        return this.y - this.height / 2;
    }
}

export class Container extends Element {
    private readonly children: Element[] = [];

    addChild(element: Element): void {
        this.children.push(element);
    }

    removeChild(element: Element): void {
        const position = this.children.indexOf(element);

        if (position !== -1) {
            this.children.splice(position, 1);
        }
    }

    getAllChildren(): Element[] {
        return [...this.children];
    }
}

interface RectangleArgs extends ElementArgs {
    width: number;
    height: number;
}

export class Rectangle extends Element {
    constructor({ width, height, ...args }: RectangleArgs) {
        super(args);
        this.width = width;
        this.height = height;
    }
}

interface CircleArgs extends ElementArgs {
    radius: number;
}

export class Circle extends Element {
    constructor({ radius, ...args }: CircleArgs) {
        super(args);
        this.width = radius * 2;
        this.height = radius * 2;
    }
}
