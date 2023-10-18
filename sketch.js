// Variáveis
let xball;
let yball;
let velocidadeXball;
let velocidadeYball;
let xPlayer;
let yPlayer;
let largura = 15;
let altura = 140;
let xBot;
let yBot;
let velocidadeYOponente;
let chanceErrar = false;
let colidiu = false;
let scorePlayer = 0;
let scoreBot = 0;
let status = "inicio";
let movingUp = false;
let movingDown = false;
let erroCount = 0;

function setup() {
  createCanvas(600, 400);
  iniciarJogo();
}

function draw() {
  background(0);
  player(xPlayer, yPlayer);
  bola();
  bot(xBot, yBot);
  movimentaBall();
  verificarColisaoBallcomParedes();
  colisaoBolaPlayer();
  colisaoBolaBot();
  movimentoBot();
  movePlayer();
  gameEnd();
  pontuacao();
}

function iniciarJogo() {
  xball = width / 2;
  yball = height / 2;
  velocidadeXball = random(5, 8);
  velocidadeYball = random(3, 6);
  xPlayer = 15;
  yPlayer = height / 2 - altura / 2;
  xBot = width - 2 * largura;
  yBot = height / 2 - altura / 2;
  chanceErrar = false;
  status = "inicio";
}

function bola() {
  fill(255);
  noStroke();
  ellipse(xball, yball, 15, 15);
}

function player(x, y) {
  fill(255);
  noStroke();
  rect(xPlayer, yPlayer, largura, altura);
}

function bot(x, y) {
  fill(255);
  noStroke();
  rect(xBot, yBot, largura, altura);
}

function movimentaBall() {
  xball += velocidadeXball;
  yball += velocidadeYball;
}

function verificarColisaoBallcomParedes() {
  if (yball + 7.5 > height || yball - 7.5 < 0) {
    velocidadeYball *= -1;
  }
}

function colisaoBolaPlayer() {
  if (xball - 7.5 < xPlayer + largura && yball - 7.5 < yPlayer + altura && yball + 7.5 > yPlayer) {
    velocidadeXball *= -1;
  }
}

function colisaoBolaBot() {
  if (xball + 7.5 > xBot && yball - 7.5 < yBot + altura && yball + 7.5 > yBot) {
    velocidadeXball *= -1;
  }
}

function movimentoBot() {
  let probabilidadeErro = random(201); // Gere um número aleatório de 0 a 200
  if (erroCount < 5) {
    if (probabilidadeErro < 175) {
      // Bot erra o movimento se o número for menor que 175
      erroCount++;
      yBot = random(height - altura);
    }
  } else {
    if (probabilidadeErro < 190) {
      // Bot erra o movimento se o número for menor que 190
      erroCount = 0;
      yBot = random(height - altura);
    }
  }
  let alvoY = yball - altura / 2;
  yBot = lerp(yBot, alvoY, 0.1);
}

function keyPressed() {
  if (key === 'w' || key === 'W') {
    movingUp = true;
  } else if (key === 's' || key === 'S') {
    movingDown = true;
  }
}

function keyReleased() {
  if (key === 'w' || key === 'W') {
    movingUp = false;
  } else if (key === 's' || key === 'S') {
    movingDown = false;
  }
}

function gameEnd() {
  if (scorePlayer >= 20 || scoreBot >= 20) {
    textSize(30);
    fill(255);
    text("Fim de Jogo - Clique para recomeçar", width / 4, height / 2);
    status = "fim";
  }
}

function pontuacao() {
  textSize(30);
  fill(255);
  text("Player: " + scorePlayer, 50, 30);
  text("Bot: " + scoreBot, width - 120, 30);
  if (xball < 0) {
    scoreBot++;
    iniciarJogo();
  } else if (xball > width) {
    scorePlayer++;
    iniciarJogo();
  }
}

function mousePressed() {
  if (status === "fim") {
    iniciarJogo();
    scorePlayer = 0;
    scoreBot = 0;
  } else if (status === "inicio") {
    status = "game";
  }
}

function movePlayer() {
  if (movingUp) {
    yPlayer -= 10;
  }
  if (movingDown) {
    yPlayer += 10;
  }
}
