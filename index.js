const graph = () => {
    // need adjacency list of 64 cells (indices) each containing an array of possible moves

    // rules:
    // x,y => x + 1, y + 2 || x + 1, y - 2 || x - 1, y + 2 || x - 1, y - 2
    //     => x + 2, y + 1 || x + 2, y - 1 || x - 2, y + 1 || x - 2, y - 1

    const cells = [];
    const xMoves = [1, 1, -1, -1, 2, 2, -2, -2];
    const yMoves = [2, -2, 2, -2, 1, -1, 1, -1];

    // initialize graph
    for (let x = 0; x < 8; x += 1) {
        cells[x] = [];
        for (let y = 0; y < 8; y += 1) {
            cells[x][y] = [];

            for (let i = 0; i < 8; i += 1) {
                if (x + xMoves[i] >= 0 && y + yMoves[i] >= 0 && x + xMoves[i] <= 7 && y + yMoves[i] <= 7) {
                    cells[x][y].push([x + xMoves[i], y + yMoves[i]]);
                }
            }
        }
    }

    return cells;
};

const solve = (startCoords, cells) => {
    let queue = [];
    queue.push(startCoords);

    // keep track of visited nodes so that we can skip them
    let visited = [];
    // start node will be the only one without a parent node (null)
    let prev = []

    // initialize both arrays
    for (let x = 0; x < 8; x += 1) {
        visited[x] = [];
        prev[x] = [];
        for (let y = 0; y < 8; y += 1) {
            visited[x][y] = false;
            prev[x][y] = null;
        }
    }

    // save start node as visited
    visited[startCoords[0]][startCoords[1]] = true;

    while (queue.length !== 0) {
        let node = queue.shift();
        let childNodes = cells[node[0]][node[1]];

        childNodes.forEach((el) => {
            const element = el;

            if (visited[element[0]][element[1]] === false) {
                queue.push(element);
                visited[element[0]][element[1]] = true;
                prev[element[0]][element[1]] = node;
            }
        })
    }

    return prev;
};

const reconstructPath = (startCoords, endCoords, prev) => {
    // reconstruct path going backwards from end coords
    let path = [];
    
    // for loop
    // initialize a node to end coords
    // keep looping until you encounter node with no parent (null)
    // each cycle, re-initialize node to the parent node using prev array from solve func
    for (let child = endCoords; child !== null; child = prev[child[0]][child[1]]) {
        path.push(child);
    }

    path.reverse();

    if (path[0] === startCoords) return path;
    return [];    
};

const knightMoves = (startCoords, endCoords) => {
    // initialize list graph
    const cells = graph();
    
    // start from startCoords
    // with array, queue and visit nodes of a parent node,
    // build up prev array where child will point to parent
    // start position will have no parent node therefore it will be null
    const prev = solve(startCoords, cells);

    // construct reverse path from endCoords until you reach node with no parent
    // reverse the array
    // compare first node with prev node, if there's match print the array of path
    const path = reconstructPath(startCoords, endCoords, prev);

    return path;
};
