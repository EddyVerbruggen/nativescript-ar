export interface Pokemon {
    name: string;
    sprite: string;
    favorite?: boolean;
    model?: {
        name: string;
        scale: number;
    };
}
