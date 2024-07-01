const knightMoves = (startCoords) => {
    // rules:
    // x,y => x + 1, y + 2 || x + 1, y - 2 || x - 1, y + 2 || x - 1, y - 2
    //     => x + 2, y + 1 || x + 2, y - 1 || x - 2, y + 1 || x - 2, y - 1
    const xMoves = [1, 1, -1, -1, 2, 2, -2, -2];
    const yMoves = [2, -2, 2, -2, 1, -1, 1, -1];
    const possibleMoves = [];
    const x = startCoords[0];
    const y = startCoords[1];

    for (let i = 0; i < 8; i += 1) {
        if (x + xMoves[i] >= 0 && y + yMoves[i] >= 0) {
            possibleMoves.push([x + xMoves[i], y + yMoves[i]]);
        }
    }

    return possibleMoves;
};

