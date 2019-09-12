export interface Pokemon {
    name: string;
    sprite: string;
    types: Array<string>;
    favorite?: boolean;
    model?: {
        name: string;
        scale: number;
    };
}
