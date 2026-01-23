// frontent/src/game/utils/SortHand.js

export function sortHand(hand) {
    return hand.slice().sort((a, b) => {
        if (a.type === "EXCUSE") return 1;
        if (b.type === "EXCUSE") return -1;
        if (a.type === "ATOUT" && b.type === "ATOUT") return a.value - b.value;
        return 0;
    });
}

export const mockHand = [
    { type: "ATOUT", value: 10 },
    { type: "ATOUT", value: 1 },
    { type: "EXCUSE" },
    { type: "ATOUT", value: 5 },
];