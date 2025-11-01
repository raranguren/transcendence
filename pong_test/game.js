const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

class Game {
	constructor(PlayerId1, PlayerId2, options = {}) {
		this.height = options.height || 600;
		this.width = options.width || 800;

		this.paddleWidth = options.paddleWidth || 5;
		this.paddleHeight = options.paddleHeight || 100;
		this.paddleSpeed = options.paddleSpeed || 30;

		this.ballSpeedX = options.ballSpeedX || 5;
		this.ballSpeedY = options.ballSpeedY || 3;

		this.players = {
			[PlayerId1] : {y: (this.height - this.paddleHeight) / 2, score: 0},
			[PlayerId2] : {y: (this.height - this.paddleHeight) / 2, score: 0},
		};

		this.ball = {
			x: this.width / 2,
			y: this.height /2,
			radius: options.ballRadius || 10,
			vx: this.ballSpeedX,
			vy: this.ballSpeedY,
		};

		this.isRunning = false;
		this.interval = null;
	}

	//Start the game
	start() {
		this.isRunning = true;
		this.interval = setInterval(() => this.update(), 1000/60);
	}

	//Stop the game
	stop() {
		this.isRunning = false;
		clearInterval(this.interval);
	}

	//Called 60/sec to update the position of the ball
	update() {
		this.ball.x += this.ball.vx;
		this.ball.y += this.ball.vy;

		if ((this.ball.y + this.ball.radius) >= this.height || (this.ball.y - this.ball.radius) <= 0) {
			this.ball.vy *= -1;
		}

		const player1 = Object.keys(this.players)[0];
		const player2 = Object.keys(this.players)[1];

		//Player 1 side
		if (this.ball.x - this.ball.radius <= this.paddleWidth) {
			if (this.ball.y >= this.players[player1].y && this.ball.y <= (this.players[player1].y + this.paddleHeight)) {
				this.ball.vx *= -1;
			}
			else {
				this.scoreUp(player2);
			}
		}

		//Player 2 side
		if (this.ball.x + this.ball.radius >= this.width - this.paddleWidth) {
			if (this.ball.y >= this.players[player2].y && this.ball.y <= (this.players[player2].y + this.paddleHeight)) {
				this.ball.vx *= -1;
			}
			else {
				this.scoreUp(player1);
			}
		}

		if (this.players[player1].score >= 11 && this.players[player1].score >= this.players[player2].score + 2) {
			this.stop();
		}

		if (this.players[player2].score >= 11 && this.players[player2].score >= this.players[player1].score + 2) {
			this.stop();
		}
	
		this.render();
	}

	movePaddle(playerId, direction) {
		if (this.players[playerId]) {
			//Paddle move down
			if (direction == 1) {
				this.players[playerId].y = Math.min(this.height -this.paddleHeight , this.players[playerId].y + this.paddleSpeed);
			}
			//Paddle move up
			if (direction == 0) {
				this.players[playerId].y = Math.max(0 , this.players[playerId].y - this.paddleSpeed);
			}
		}
	}

	scoreUp (playerId) {
		this.players[playerId].score++;

		this.ball.x = this.width / 2;
		this.ball.y = this.height / 2;

	}

	getState() {
		return {
			ball: this.ball,
			players: this.players
		};
	}

	render() {
        context.clearRect(0, 0, this.width, this.height); // Efface le canvas

        // Dessiner la balle
        context.beginPath();
        context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        context.fillStyle = "#fff";
        context.fill();
        context.closePath();

        // Dessiner les paddles
        const player1 = Object.keys(this.players)[0];
        const player2 = Object.keys(this.players)[1];

        context.fillStyle = "#fff";
        context.fillRect(0, this.players[player1].y, this.paddleWidth, this.paddleHeight); // Paddle 1
        context.fillRect(this.width - this.paddleWidth, this.players[player2].y, this.paddleWidth, this.paddleHeight); // Paddle 2

        // Dessiner les scores
        context.font = "30px Arial";
        context.fillText(this.players[player1].score, this.width / 4, 50);
        context.fillText(this.players[player2].score, this.width - this.width / 4, 50);
    }
}

// Initialisation et gestion des contrôles
const game = new Game('player1', 'player2', { height: 600, width: 800 });

game.start();

// Contrôles clavier
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        game.movePaddle('player2', 0); // Déplacer le paddle du joueur 2 vers le haut
    }
    if (event.key === 'ArrowDown') {
        game.movePaddle('player2', 1); // Déplacer le paddle du joueur 2 vers le bas
    }

    if (event.key === 'w') {
        game.movePaddle('player1', 0); // Déplacer le paddle du joueur 1 vers le haut
    }
    if (event.key === 's') {
        game.movePaddle('player1', 1); // Déplacer le paddle du joueur 1 vers le bas
    }
});

