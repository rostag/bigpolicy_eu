export interface Rhythm {
    name: string;
    value: number[][];
}

export const rhythms = {
    pyro: {
        name: 'pyro1',
        value: [
            [1, 1, 1, 2, 1, 2],
            [2, 3, 3],
            [1, 3, 1, 4],
            [1, 2, 1, 3, 2]
        ]
    },
    senkan: {
        name: 'senkan',
        value: [
            [1, 1],
            [1, 3],
            [2, 4],
            [2, 4, 2],
            [2]
        ]
    },
    haiku: {
        name: 'haiku',
        value: [
            [1, 2, 1],
            [3, 1, 2, 1],
            [2, 3],
        ]
    },
    r1r2r3: {
        name: 'r1r2r3',
        value: [
            [1, 2, 3],
            [2, 3, 1],
            [3, 1, 2],
            [1, 3, 2],
        ]
    }, r1r2r31: {
        name: 'r1r2r31',
        value: [
            [1, 2, 3],
        ]
    }, salo: {
        name: 'salo',
        value: [
            [1, 2, 3],
            [2, 2, 2],
            [1, 2, 3],
            [3, 3],
        ]
    }, prorizz: {
        name: 'prorizz',
        value: [
            [1, 2, 3, 1, 2, 3,],
            [2, 2, 2, 2, 2, 2,],
            [1, 2, 3, 1, 2, 3,],
            [3, 3, 3, 3,],
        ]
    }
};
