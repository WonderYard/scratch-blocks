var Utility = {
	MOORE: [
		{x: -1, y: -1},
		{x: -1, y: 0},
		{x: -1, y: 1},

		{x: 0, y: -1},
		// {x: 0, y: 0} me
		{x: 0, y: 1},

		{x: 1, y: -1},
		{x: 1, y: 0},
		{x: 1, y: 1}
	],
	VON_NEUMANN: [
		{x: -1, y: 0},
		{x: 0, y: -1},
		{x: 0, y: 1},
		{x: 1, y: 0}
	]
};

function World(cols, rows, states, neighborhood) {
	this.cols = cols;
	this.rows = rows;
	this.grid = [];
	this.states = states || [new State()];
	this.neighborhood = neighborhood || Utility.MOORE;
	this.cellSize = 8;
	this.offsetX = 0;
	this.offsetY = 0;

	for (var y = 0; y < this.rows; y++) {
		this.grid.push([]);
		for (var x = 0; x < this.cols; x++) {
			this.grid[y].push(0);
		}
	}
}

World.prototype.getCell = function(x, y) {
	return this.grid[y][x];
};

World.prototype.setCell = function(x, y, cell) {
	if(x >= 0 && x < this.cols && y >= 0 && y < this.rows) this.grid[y][x] = cell;
};

World.prototype.setStates = function(states) {
	this.states = [];
	for(var i = 0; i < states.length; i++) {
		this.states.push(new State(states[i]));
	}
};

World.prototype.draw = function(g) {
	for (var y = 0; y < this.rows; y++) {
		for (var x = 0; x < this.cols; x++) {
			g.fillStyle = this.states[this.getCell(x, y)].color;
			g.fillRect(x * this.cellSize + this.offsetX, y * this.cellSize + this.offsetY, this.cellSize, this.cellSize);
		}
	}
};

World.prototype.getNeighbors = function(x, y) {
	var neighbors = {};
	var count = 0;

	for(var i = 0; i < this.neighborhood.length; i++) {
		var nx = this.neighborhood[i].x + x;
		var ny = this.neighborhood[i].y + y;
		if(this.validateNeighbor(nx, ny)) {
			var cell = this.getCell(nx, ny);
			neighbors[cell] = (neighbors[cell] || 0) + 1;
		}
	}

	// for(var j = y - 1; j <= y + 1; j++) {
	// 	for(var i = x - 1; i <= x + 1; i++) {
	// 		count++;
	// 		if((j != y || i != x) && this.validateNeighbor(i, j, count)) {
	// 			var cell = this.getCell(i, j);
	// 			neighbors[cell] = (neighbors[cell] || 0) + 1;
	// 		}
	// 	}
	// }
	return neighbors;
};

World.prototype.validateNeighbor = function(x, y, count) {
	if(x < 0 || y < 0 || x >= this.rows || y >= this.cols) return false;
		//if(count % 2 == 1) return false; // comment this line for diagonal (Moore) neighborhood
		return true;
};

World.prototype.evolve = function() {
	var newGrid = [];
	for (var y = 0; y < this.rows; y++) {
		newGrid.push([]);
		for (var x = 0; x < this.cols; x++) {
			var cell = this.getCell(x, y);
			var neighbors = this.getNeighbors(x, y);
			newGrid[y].push(this.ruleTable(cell, neighbors));
		}
	}
	this.grid = newGrid;
	
	draw();
};

function State(color) {
	this.color = color || "#ff00ff";
}
