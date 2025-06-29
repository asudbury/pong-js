const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 12;

let leftPaddle = { x: 10, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
let rightPaddle = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
let ball = { x: canvas.width / 2 - ballSize / 2, y: canvas.height / 2 - ballSize / 2, dx: 5, dy: 3 };

let leftScore = 0, rightScore = 0;

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center line
    ctx.fillStyle = '#fff';
    ctx.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);

    // Paddles
    ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

    // Ball
    ctx.fillRect(ball.x, ball.y, ballSize, ballSize);

    // Scores
    ctx.font = "30px Arial";
    ctx.fillText(leftScore, canvas.width / 4, 40);
    ctx.fillText(rightScore, 3 * canvas.width / 4, 40);
}

// Move paddles and ball
function update() {
    // Move paddles
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Prevent paddles from going out of bounds
    leftPaddle.y = Math.max(Math.min(leftPaddle.y, canvas.height - paddleHeight), 0);
    rightPaddle.y = Math.max(Math.min(rightPaddle.y, canvas.height - paddleHeight), 0);

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom collision
    if (ball.y < 0 || ball.y + ballSize > canvas.height) ball.dy *= -1;

    // Paddle collision
    if (ball.x < leftPaddle.x + paddleWidth &&
        ball.y + ballSize > leftPaddle.y &&
        ball.y < leftPaddle.y + paddleHeight) {
        ball.dx *= -1;
        ball.x = leftPaddle.x + paddleWidth;
    }
    if (ball.x + ballSize > rightPaddle.x &&
        ball.y + ballSize > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight) {
        ball.dx *= -1;
        ball.x = rightPaddle.x - ballSize;
    }

    // Score
    if (ball.x < 0) {
        rightScore++;
        resetBall();
    } else if (ball.x + ballSize > canvas.width) {
        leftScore++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2 - ballSize / 2;
    ball.y = canvas.height / 2 - ballSize / 2;
    ball.dx = (Math.random() > 0.5 ? 5 : -5);
    ball.dy = (Math.random() > 0.5 ? 3 : -3);
}

// Key controls
document.addEventListener('keydown', e => {
    if (e.key === 'w') leftPaddle.dy = -6;
    if (e.key === 's') leftPaddle.dy = 6;
    if (e.key === 'ArrowUp') rightPaddle.dy = -6;
    if (e.key === 'ArrowDown') rightPaddle.dy = 6;
});
document.addEventListener('keyup', e => {
    if (e.key === 'w' || e.key === 's') leftPaddle.dy = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') rightPaddle.dy = 0;
});

// Main loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();