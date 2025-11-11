export {};
/* interface Player {
    y: number;
    score: number;
    paddleHeight: number;
    paddleWidth: number;
    paddleSpeed: number;
}

interface Players {
    [playerId: string]: Player;
}

interface Ball {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
}

interface GameOptions {
    height?: number;
    width?: number;
    paddleWidth?: number;
    paddleHeight?: number;
    paddleSpeed?: number;
    ballSpeedX?: number;
    ballSpeedY?: number;
    ballRadius?: number;
}

interface Chat {
    player1: string;
    player2: string;
    timestamp: number;
}

class Game {
    private height: number;
    private width: number;
    private paddleWidth: number;
    private paddleHeight: number;
    private paddleSpeed: number;
    private ballSpeedX: number;
    private ballSpeedY: number;
    private players: Players;
    private ball: Ball;
    private isRunning: boolean;

    constructor(PlayerId1: string, PlayerId2: string, options: GameOptions = {}) {
        this.height = options.height ?? 600;
        this.width = options.width ?? 800;
        
// 		this.paddleWidth = options.paddleWidth ?? 5;
// 		this.paddleHeight = options.paddleHeight ?? 100;
// 		this.paddleSpeed = options.paddleSpeed ?? 5;

// 		this.ballSpeedX = options.ballSpeedX ?? 5;
// 		this.ballSpeedY = options.ballSpeedY ?? 3;

// 		this.players = {
// 			[PlayerId1] : {y: (this.height - this.paddleHeight) / 2, score: 0, paddleHeight: this.paddleHeight, paddleWidth: this.paddleWidth, paddleSpeed: this.paddleSpeed},
// 			[PlayerId2] : {y: (this.height - this.paddleHeight) / 2, score: 0, paddleHeight: this.paddleHeight, paddleWidth: this.paddleWidth, paddleSpeed: this.paddleSpeed},
// 		};

// 		this.ball = {
// 			x: this.width / 2,
// 			y: this.height /2,
// 			radius: options.ballRadius || 10,
// 			vx: this.ballSpeedX,
// 			vy: this.ballSpeedY,
// 		};

// 		this.isRunning = false;
// 	}


// 	//Start the game
// 	public start(): void {
// 		this.isRunning = true;
// 	}

// 	//Stop the game
// 	public stop(): void {
// 		this.isRunning = false;
// 	}

// 	//Called 60/sec to update the position of the ball
// 	private update(): void {
// 		this.ball.x += this.ball.vx;
// 		this.ball.y += this.ball.vy;

// 		if ((this.ball.y + this.ball.radius) >= this.height || (this.ball.y - this.ball.radius) <= 0) {
// 			this.ball.vy *= -1;
// 		}

// 		const player1 = Object.keys(this.players)[0];
// 		const player2 = Object.keys(this.players)[1];

// 		//Player 1 side
// 		if (this.ball.x - this.ball.radius <= this.paddleWidth) {
// 			if (this.ball.y > this.players[player1].y && this.ball.y < (this.players[player1].y + this.paddleHeight)) {
// 				this.ball.vx *= -1;
// 			}
// 			else {
// 				this.scoreUp(player2);
// 			}
// 		}

// 		//Player 2 side
// 		if (this.ball.x + this.ball.radius >= this.width - this.paddleWidth) {
// 			if (this.ball.y > this.players[player2].y && this.ball.y < (this.players[player2].y + this.paddleHeight)) {
// 				this.ball.vx *= -1;
// 			}
// 			else {
// 				this.scoreUp(player1);
// 			}
// 		}

// 		if (this.players[player1].score >= 11 && this.players[player1].score >= this.players[player2].score + 2) {
// 			this.stop();
// 		}

// 		if (this.players[player2].score >= 11 && this.players[player2].score >= this.players[player1].score + 2) {
// 			this.stop();
// 		}
    
    }

    public movePaddle(playerId: string, direction: 0 | 1): void {
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

    scoreUp (playerId: string): void {
        this.players[playerId].score++;

        this.ball.x = this.width / 2;
        this.ball.y = this.height / 2;

    }

    getState(): {ball: Ball; players: Players} {
        return {
            ball: this.ball,
            players: this.players
        };
    }
} */
//# sourceMappingURL=game_objects.js.map