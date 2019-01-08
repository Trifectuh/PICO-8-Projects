// title:  Raycast Split
// author: jwash
// desc:   a test of split-screen raycasting for two
// script: js

const screen = {
	width: 240,
	height: 136
};

const mapWidth = 24;
const mapHeight = 24;

const worldMap = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const player1 = {
	posX: 22,
	posY: 11,
	dirX: -1,
	dirY: 0,
	planeX: 0,
	planeY: 0.66,
	zBuffer: new Array(120)
};

const player2 = {
	posX: 12,
	posY: 11,
	dirX: -1,
	dirY: 0,
	planeX: 0,
	planeY: 0.66,
	zBuffer: new Array(120)
};

var timeElapsed = 0;
var oldTimeElapsed = 0;

function TIC() {
	rect(0, 0, 240, 68, 13);
	rect(0, 69, 240, 136, 12);

	for (x = 0; x < 120; x++) {
		var cameraX = (2 * x) / 120 - 1;
		var rayDirX = player1.dirX + player1.planeX * cameraX;
		var rayDirY = player1.dirY + player1.planeY * cameraX;

		var mapX = Math.trunc(player1.posX);
		var mapY = Math.trunc(player1.posY);

		var sideDistX;
		var sideDistY;

		var deltaDistX = Math.abs(1 / rayDirX);
		var deltaDistY = Math.abs(1 / rayDirY);
		var perpWallDist;

		var stepX;
		var stepY;

		var hit = 0;
		var side;

		if (rayDirX < 0) {
			stepX = -1;
			sideDistX = (player1.posX - mapX) * deltaDistX;
		} else {
			stepX = 1;
			sideDistX = (mapX + 1.0 - player1.posX) * deltaDistX;
		}
		if (rayDirY < 0) {
			stepY = -1;
			sideDistY = (player1.posY - mapY) * deltaDistY;
		} else {
			stepY = 1;
			sideDistY = (mapY + 1.0 - player1.posY) * deltaDistY;
		}

		while (hit == 0) {
			if (sideDistX < sideDistY) {
				sideDistX += deltaDistX;
				mapX += stepX;
				side = 0;
			} else {
				sideDistY += deltaDistY;
				mapY += stepY;
				side = 1;
			}

			if (worldMap[mapX][mapY] > 0) hit = 1;
		}

		if (side == 0) perpWallDist = (mapX - player1.posX + (1 - stepX) / 2) / rayDirX;
		else perpWallDist = (mapY - player1.posY + (1 - stepY) / 2) / rayDirY;

		var lineHeight = 136 / perpWallDist;

		var drawStart = -lineHeight / 2 + 136 / 2;
		if (drawStart < 0) drawStart = 0;
		var drawEnd = lineHeight / 2 + 136 / 2;
		if (drawEnd >= 136) drawEnd = 136 - 1;
		var color = worldMap[mapX][mapY];

		if (side == 1) {
			color = color + 5;
		}

		line(x, drawStart, x, drawEnd, color);

		player1.zBuffer[x] = perpWallDist;
	}

	// Draw Player 2 on Player 1's screen
	var p2spriteX = player2.posX - player1.posX;
	var p2spriteY = player2.posY - player1.posY;

	var p2invDet = 1 / (player1.planeX * player1.dirY - player1.dirX * player1.planeY);

	var p2transformX = 2 * (p2invDet * (player1.dirY * p2spriteX - player1.dirX * p2spriteY));
	var p2transformY = p2invDet * (-player1.planeY * p2spriteX + player1.planeX * p2spriteY);

	var p2spriteScreenX = Math.trunc((120 / 2) * (1 + p2transformX / p2transformY));

	var p2spriteHeight = Math.abs(Math.trunc(136 / p2transformY));
	var p2drawStartY = -p2spriteHeight / 5 + 136 / 2;
	if (p2drawStartY < 0) p2drawStartY = 0;
	var p2drawEndY = p2spriteHeight / 2 + 136 / 2;
	if (p2drawEndY >= 136) p2drawEndY = 136 - 1;

	var p2spriteWidth = Math.abs(Math.trunc(0.5 * (136 / p2transformY)));
	var p2drawStartX = Math.trunc(0.5 * (-p2spriteWidth + p2spriteScreenX)) + 30;
	if (p2drawStartX < 0) p2drawStartX = 0;
	var p2drawEndX = Math.trunc(0.5 * (p2spriteWidth + p2spriteScreenX)) + 30;
	if (p2drawEndX >= 120) p2drawEndX = 120;

	for (var stripe = p2drawStartX; stripe < p2drawEndX; stripe++) {
		if (p2transformY > 0 && stripe >= 0 && stripe <= 120 && p2transformY < player1.zBuffer[stripe]) {
			line(stripe, p2drawStartY, stripe, p2drawEndY, 0);
		}
	}

	line(120, 0, 120, 136, 0);

	for (x = 121; x < 240; x++) {
		var cameraX = (2 * x - 120) / 120 - 2;
		var rayDirX = player2.dirX + player2.planeX * cameraX;
		var rayDirY = player2.dirY + player2.planeY * cameraX;

		var mapX = Math.trunc(player2.posX);
		var mapY = Math.trunc(player2.posY);

		var sideDistX;
		var sideDistY;

		var deltaDistX = Math.abs(1 / rayDirX);
		var deltaDistY = Math.abs(1 / rayDirY);
		var perpWallDist;

		var stepX;
		var stepY;

		var hit = 0;
		var hitEnemy = 0;
		var side;

		if (rayDirX < 0) {
			stepX = -1;
			sideDistX = (player2.posX - mapX) * deltaDistX;
		} else {
			stepX = 1;
			sideDistX = (mapX + 1.0 - player2.posX) * deltaDistX;
		}
		if (rayDirY < 0) {
			stepY = -1;
			sideDistY = (player2.posY - mapY) * deltaDistY;
		} else {
			stepY = 1;
			sideDistY = (mapY + 1.0 - player2.posY) * deltaDistY;
		}

		while (hit == 0) {

			if (sideDistX < sideDistY) {
				sideDistX += deltaDistX;
				mapX += stepX;
				side = 0;
			} else {
				sideDistY += deltaDistY;
				mapY += stepY;
				side = 1;
			}

			if (worldMap[mapX][mapY] > 0) hit = 1;
		}

		if (side == 0) perpWallDist = (mapX - player2.posX + (1 - stepX) / 2) / rayDirX;
		else perpWallDist = (mapY - player2.posY + (1 - stepY) / 2) / rayDirY;

		var lineHeight = screen.height / perpWallDist;

		var drawStart = -lineHeight / 2 + screen.height / 2;
		if (drawStart < 0) drawStart = 0;
		var drawEnd = lineHeight / 2 + screen.height / 2;
		if (drawEnd >= screen.height) drawEnd = screen.height - 1;

		var color = worldMap[mapX][mapY];

		if (side == 1) {
			color = color + 5;
		}

		line(x, drawStart, x, drawEnd, color);
		player1.zBuffer[x - 120] = perpWallDist;
	}

	// Draw Player 1 on Player 2's screen
	var p1spriteX = player1.posX - player2.posX;
	var p1spriteY = player1.posY - player2.posY;

	var p1invDet = 1 / (player2.planeX * player2.dirY - player2.dirX * player2.planeY);

	var p1transformX = 2 * (p1invDet * (player2.dirY * p1spriteX - player2.dirX * p1spriteY));
	var p1transformY = p1invDet * (-player2.planeY * p1spriteX + player2.planeX * p1spriteY);

	var p1spriteScreenX = 121 + Math.trunc((120 / 2) * (1 + p1transformX / p1transformY));

	var p1spriteHeight = Math.abs(Math.trunc(136 / p1transformY));
	var p1drawStartY = -p1spriteHeight / 5 + 136 / 2;
	if (p1drawStartY < 0) p1drawStartY = 0;
	var p1drawEndY = p1spriteHeight / 2 + 136 / 2;
	if (p1drawEndY >= 136) p1drawEndY = 136 - 1;

	var p1spriteWidth = Math.abs(Math.trunc(0.5 * (136 / p1transformY)));
	var p1drawStartX = 121 + Math.trunc(0.5 * (-p1spriteWidth + p1spriteScreenX)) - 30;
	if (p1drawStartX < 121) p1drawStartX = 121;
	var p1drawEndX = 121 + Math.trunc(0.5 * (p1spriteWidth + p1spriteScreenX)) - 30;
	if (p1drawEndX >= 240) p1drawEndX = 240;

	for (var stripe = p1drawStartX; stripe < p1drawEndX; stripe++) {
		if (p1transformY > 0 && stripe >= 121 && stripe <= 240) {  // && p1transformY < player2.zBuffer[stripe - 120]
			line(stripe, p1drawStartY, stripe, p1drawEndY, 0);
			trace('drawing player 1');
		} else trace('not drawing player 1')
	}

	oldTimeElapsed = timeElapsed;
	timeElapsed = time();
	var frameTime = (timeElapsed - oldTimeElapsed) / 1000.0;
	print(Math.trunc(1.0 / frameTime));

	var moveSpeed = frameTime * 5.0;
	var rotSpeed = frameTime * 3.0;

	// if (btn(0)) {
	// 	if (worldMap[Math.trunc(player1.posX + player1.dirX * moveSpeed)][Math.trunc(player1.posY)] == 0)
	// 		player1.posX += player1.dirX * moveSpeed;
	// 	if (worldMap[Math.trunc(player1.posX)][Math.trunc(player1.posY + player1.dirY * moveSpeed)] == 0)
	// 		player1.posY += player1.dirY * moveSpeed;
	// }

	// if (btn(1)) {
	// 	if (worldMap[Math.trunc(player1.posX - player1.dirX * moveSpeed)][Math.trunc(player1.posY)] == 0)
	// 		player1.posX -= player1.dirX * moveSpeed;
	// 	if (worldMap[Math.trunc(player1.posX)][Math.trunc(player1.posY - player1.dirY * moveSpeed)] == 0)
	// 		player1.posY -= player1.dirY * moveSpeed;
	// }

	// if (btn(2)) {
	// 	var oldDirX = player1.dirX;
	// 	player1.dirX = player1.dirX * Math.cos(rotSpeed) - player1.dirY * Math.sin(rotSpeed);
	// 	player1.dirY = oldDirX * Math.sin(rotSpeed) + player1.dirY * Math.cos(rotSpeed);
	// 	var oldPlaneX = player1.planeX;
	// 	player1.planeX = player1.planeX * Math.cos(rotSpeed) - player1.planeY * Math.sin(rotSpeed);
	// 	player1.planeY = oldPlaneX * Math.sin(rotSpeed) + player1.planeY * Math.cos(rotSpeed);
	// }

	// if (btn(3)) {
	// 	var oldDirX = player1.dirX;
	// 	player1.dirX = player1.dirX * Math.cos(-rotSpeed) - player1.dirY * Math.sin(-rotSpeed);
	// 	player1.dirY = oldDirX * Math.sin(-rotSpeed) + player1.dirY * Math.cos(-rotSpeed);
	// 	var oldPlaneX = player1.planeX;
	// 	player1.planeX = player1.planeX * Math.cos(-rotSpeed) - player1.planeY * Math.sin(-rotSpeed);
	// 	player1.planeY = oldPlaneX * Math.sin(-rotSpeed) + player1.planeY * Math.cos(-rotSpeed);
	// }

	if (btn(0)) {
		if (worldMap[Math.trunc(player2.posX + player2.dirX * moveSpeed)][Math.trunc(player2.posY)] == 0)
			player2.posX += player2.dirX * moveSpeed;
		if (worldMap[Math.trunc(player2.posX)][Math.trunc(player2.posY + player2.dirY * moveSpeed)] == 0)
			player2.posY += player2.dirY * moveSpeed;
	}

	if (btn(1)) {
		if (worldMap[Math.trunc(player2.posX - player2.dirX * moveSpeed)][Math.trunc(player2.posY)] == 0)
			player2.posX -= player2.dirX * moveSpeed;
		if (worldMap[Math.trunc(player2.posX)][Math.trunc(player2.posY - player2.dirY * moveSpeed)] == 0)
			player2.posY -= player2.dirY * moveSpeed;
	}

	if (btn(2)) {
		var oldDirX = player2.dirX;
		player2.dirX = player2.dirX * Math.cos(rotSpeed) - player2.dirY * Math.sin(rotSpeed);
		player2.dirY = oldDirX * Math.sin(rotSpeed) + player2.dirY * Math.cos(rotSpeed);
		var oldPlaneX = player2.planeX;
		player2.planeX = player2.planeX * Math.cos(rotSpeed) - player2.planeY * Math.sin(rotSpeed);
		player2.planeY = oldPlaneX * Math.sin(rotSpeed) + player2.planeY * Math.cos(rotSpeed);
	}

	if (btn(3)) {
		var oldDirX = player2.dirX;
		player2.dirX = player2.dirX * Math.cos(-rotSpeed) - player2.dirY * Math.sin(-rotSpeed);
		player2.dirY = oldDirX * Math.sin(-rotSpeed) + player2.dirY * Math.cos(-rotSpeed);
		var oldPlaneX = player2.planeX;
		player2.planeX = player2.planeX * Math.cos(-rotSpeed) - player2.planeY * Math.sin(-rotSpeed);
		player2.planeY = oldPlaneX * Math.sin(-rotSpeed) + player2.planeY * Math.cos(-rotSpeed);
	}
}

// <TILES>
// 001:efffffffff222222f8888888f8222222f8fffffff8ff0ffff8ff0ffff8ff0fff
// 002:fffffeee2222ffee88880fee22280feefff80fff0ff80f0f0ff80f0f0ff80f0f
// 003:efffffffff222222f8888888f8222222f8fffffff8fffffff8ff0ffff8ff0fff
// 004:fffffeee2222ffee88880fee22280feefff80ffffff80f0f0ff80f0f0ff80f0f
// 017:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 018:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// 019:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 020:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// </TILES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <PALETTE>
// 000:140c1c44243430346d4e4a4e854c30346524d04648757161597dced27d2c8595a16daa2cd2aa996dc2cadad45edeeed6
// </PALETTE>
