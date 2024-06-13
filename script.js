const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "TG/Flappy/t.png";
bg.src = "TG/Flappy/background.jpg";
fg.src = "TG/Flappy/t.png";
pipeNorth.src = "TG/Flappy/north.png";
pipeSouth.src = "TG/Flappy/north.png";

const gap = 85;
const constant = pipeNorth.height + gap;

let bX = 10;
let bY = 150;
const gravity = 1.5;
let score = 0;

// Audio files
const fly = new Audio();
const scor = new Audio();

fly.src = "TG/Flappy/wing-flap-1-6434.mp3";
scor.src = "TG/Flappy/score.wav";

// Keydown event
document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

// Pipe coordinates
const pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Draw function
function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detect collision
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width &&
           (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= canvas.height - fg.height) {
            location.reload(); // Reload the page
        }

        if(pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
