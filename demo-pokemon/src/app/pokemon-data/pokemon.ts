export interface Pokemon {
    name: string;
    sprite: string;
    favorite?: boolean;
    model?: {
        ios: {
            name: string;
            scale: number;
        },
        android: {
            name: string;
            scale: number;
        }
    }
}
