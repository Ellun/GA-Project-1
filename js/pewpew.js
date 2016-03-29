var $gameConsole = $('.gameConsole');
var $allies      = $('.allies');
var $start       = $('.start');
var enemies      = [];
var $score       = $('.p1Score');
var $score2      = $('.p2Score');
var $health      = $('.p1Health');
var $health2     = $('.p2Health');
var $p1          = $('#p1');
var $p2          = $('#p2');
var score        = 0;
var score2       = 0;
var bossHealth   = 10000;
var $gg          = $('<div>');
var $info        = $('.info');

//source http://stackoverflow.com/questions/2249203/
//check-if-the-spacebar-is-being-pressed-and-the-mouse-is-moving-at-the-same-time

$(document).ready( () => { // On load, this function will execute
  var upAndDown = 0;
  while (upAndDown < 500) {
    (upAndDown % 2 === 0) ? y = 50 : y = 180; // Ternary
    $info.animate({'top': y + 'px'},4000); // Animates info div up and down
    upAndDown++;
  }
});

//will creat enemies on start
$start.on('click',newGame);

function reset() {
  $gg.remove();
  newGame();
}

function newGame () {
  shipFactory();
  enemyFactory();
  $gameConsole.animate({'left':'-780px'},60000);
  setTimeout(function() {
    $start.remove();
    $info.remove();
  },1);
}

//creates starting ships
function shipFactory() {
  $allies.empty();
  var player = null;
  for (var i = 1; i < 3; i++) {
    if (i === 1) {
      player = new Player1();
    } else if (i === 2) {
      player = new Player2();
    }
    var $player = $('<div>');
    $player.addClass('player');
    $player.attr('id', 'p' + i)
    $player.attr('health', player.health);
    $player.attr('score', player.score);
    $player.attr('lives', player.lives);
    $allies.append($player);
  }
  $p1 = $('#p1');
  $p2 = $('#p2');
}

//http://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
setInterval(onKeyDown, 20);
var keys = {};

$(document).on('keydown', function (event) {
  keys[event.keyCode] = true;
  switch (event.keyCode) {
    case 87:
      onKeyDown($p1, 'up');
      break;
    case 83:
      onKeyDown($p1, 'down');
      break;
    case 65:
      onKeyDown($p1, 'left');
      break;
    case 68:
      onKeyDown($p1, 'right');
      break;
    case 32:
      onKeyDown($p1, 'shoot');
      break;
    case 73:
      onKeyDown($p2, 'up');
      break;
    case 75:
      onKeyDown($p2, 'down');
      break;
    case 74:
      onKeyDown($p2, 'left');
      break;
    case 76:
      onKeyDown($p2, 'right');
      break;
    case 13:
      onKeyDown($p2, 'shoot');
      break;
    }
});

$(document).on('keyup', function(event) {
    delete keys[event.keyCode];
});


function onKeyDown($player, action) {
  switch (action) {
    case 'up':
      $player.animate({'top':'-=4px'},0);
      break;
    case 'down':
      $player.animate({'top':'+=4px'},0);
      break;
    case 'left':
      $player.animate({'left':'-=10px'},0);
      break;
    case 'right':
      $player.animate({'left':'+=10px'},0);
      break;
    case 'shoot':
      bulletFactory($player);
      break;
  }
}

function enemyFactory () {
  $('.enemies').empty();
  $boss = $('<div>');
  $boss.attr('id','enemy11');
  $('.enemies').append($boss);
  for (var i = 1; i <= 10; i++) {
    var currentEnemy = null;
    var randomNumber = Math.floor(Math.random()*4);
    switch (randomNumber) {
      case 0:
        currentEnemy = new Grunt();
        break;
      case 1:
        currentEnemy = new FatGrunt();
        break;
      case 2:
        currentEnemy = new BigGrunt();
        break;
      case 3:
        currentEnemy = new GiantGrunt();
        break;
    }
    currentEnemy.id = 'enemy' + i;
    var $enemy = $('<div>');
    $enemy.addClass('enemy');
    $enemy.attr('id', currentEnemy.id);
    $enemy.attr('health',currentEnemy.health)
    $boss.attr('health', 10000);
    $('.enemies').append($enemy);
    enemies.push(currentEnemy);
    var loop = 0;
    while (loop < 500) {
      if (loop % 2 === 0) {
        $enemy.animate({'top':'0px'},currentEnemy.speed);
        $boss.animate({'top':'0px'},1750);
        loop++;
      } else {
        $enemy.animate({'top':'530px'},currentEnemy.speed);
        $boss.animate({'top':'350px'},1750);;
        loop++;
        }
    }
    (function(enemy) {
    setInterval(function(){
      var randomID = makeid();
      enemy.append('<div class="eBullet" id="' + randomID + '"></div>');
      var $eBullet = $('.eBullet', enemy);
      $eBullet.animate({'left':'-400px'},2990);
      checkEnemy(enemy, 400);
      setTimeout(function() {
        enemy.empty();
      }, 2990);
    }, 3000);
    setInterval(function(){
      $boss.append('<div class="giantBullet"></div>','<div class="mediumBullet"></div>','<div class="mediumBullet2"></div>');
      var $giantBullet = $('.giantBullet');
      var $mediumBullet = $('.mediumBullet');
      var $mediumBullet2 = $('.mediumBullet2 ');
      $giantBullet.animate({'left':'-600px'},1990);
      $mediumBullet.animate({'left':'-600px'},1990);
      $mediumBullet2.animate({'left':'-600px'},1990);
      checkEnemy($boss, 600);
      setTimeout(function() {
        $boss.empty();
      }, 1990);
    }, 2000);
  })($enemy);
}
}
function Player1() {
  this.health = 4500;
  this.id = '';
  this.score = 0;
  this.lives = 3;
}

function Player2() {
  this.health = 4500;
  this.id = '';
  this.score = 0;
  this.lives = 3;
}

function Grunt() {
  this.health = 100;
  this.id = '';
  this.speed = 2000;
}

function FatGrunt() {
  this.health = 200;
  this.id = '';
  this.speed = 3000;
}

function BigGrunt() {
  this.health = 300;
  this.id = '';
  this.speed = 4000;
}

function GiantGrunt() {
  this.health = 400;
  this.id = '';
  this.speed = 6000;
}

function bulletFactory($player) {
  //generate random ID
  var randomID = makeid();
  $player.append('<div class="bullet" id="' + randomID + '"></div>');
  var $bullet = $('#' + randomID);
  //https://www.youtube.com/watch?v=PyS35523130
  $bullet.animate({'left':'400px'},1200);
  //http://stackoverflow.com/questions/3655627/jquery-append-object-remove-it-with-delay
  setTimeout(function() {
    $player.empty();
  }, 1200);
  check($player);
}

//http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

//Collision Detection
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function check($player,target) {
  var $enemyContainer = $('.enemies');
  for (var i = 1; i <= 11; i++) {
    var $hitEnemy = $enemyContainer.find('#enemy' + i);
    if (
      parseInt($player.css('left'))  < (parseInt($hitEnemy.css('left')) + parseInt($hitEnemy.css('width'))) &&
      (parseInt($player.css('left')) + parseInt($player.css('width')) + 400) > parseInt($hitEnemy.css('left')) &&
      parseInt($player.css('top')) < (parseInt($hitEnemy.css('top')) + parseInt($hitEnemy.css('height'))) &&
      (parseInt($player.css('height')) + parseInt($player.css('top'))) > parseInt($hitEnemy.css('top'))
    ){
      var previousHealth = $hitEnemy.attr('health')
      $hitEnemy.attr('health',(previousHealth - 100));
      var previousScore = parseInt($player.attr('score'));
      $player.attr('score',(previousScore + 250));
      if ($player === $p1) {
        $score.text($player.attr('score'));
      }
      if ($player === $p2) {
        $score2.text($player.attr('score'));
      }
      if ($p1.attr('score') > $p2.attr('score')) {
        var winner = 'Player 1';
      } else if ($p1.attr('score') < $p2.attr('score')) {
        var winner = 'Player 2';
      } else {
        var winner = 'tie';
      }
      if ($hitEnemy.attr('health') <= 0) {
        $hitEnemy.remove();
        if (!document.getElementById("enemy11")) {
          winGame(winner);
        }
      //   window.setTimeout(function() {
      //   $hitEnemy.remove();
      // }, 1200);
      }
    }
  }
}
function checkEnemy($eBullet, distance) {
  var $alliesContainer = $('.allies');
  for (var i = 1; i <= 2; i++) {
    var $hitPlayer = $alliesContainer.find('#p' + i);
    if (
      parseInt($eBullet.css('left'))  > (parseInt($hitPlayer.css('left')) + parseInt($hitPlayer.css('width'))) &&
      (parseInt($eBullet.css('left')) - parseInt($eBullet.css('width')) - distance) < parseInt($hitPlayer.css('left')) &&
      parseInt($eBullet.css('top')) < (parseInt($hitPlayer.css('top')) + parseInt($hitPlayer.css('height'))) &&
      (parseInt($eBullet.css('height')) + parseInt($eBullet.css('top'))) > parseInt($hitPlayer.css('top'))
    ){
      var previousHealth = parseInt($hitPlayer.attr('health'));
      $hitPlayer.attr('health',(previousHealth - 100));
      $health.text($('#p1').attr('health'));
      $health2.text($('#p2').attr('health'));
      if ($hitPlayer.attr('health') <= 0) {
        var previousLives = $hitPlayer.attr('lives');
        $hitPlayer.attr('lives',(previousLives - 1));
        $hitPlayer.attr('health',(4500));
        if ($hitPlayer.attr('lives') <= 0) {
          $hitPlayer.remove();
          //http://stackoverflow.com/questions/14535733/how-to-check-if-div-element-is-empty
          if( $('.allies').is(':empty') ) {
          loseGame();
        }

      //   window.setTimeout(function() {
      //   $hitEnemy.remove();
      // }, 1200);
      }
    }
  }
}
}

function winGame($player) {
  $gg.addClass('gg');
  if ($player === 'tie') {
    $gg.text('It is a tie!');
  } else {
    $gg.text($player + ' is the winner!');
  }
  $gameConsole.append($gg);
  $gg.on('click', reset);
}

function loseGame() {
  $gg.addClass('gg');
  $gg.text('GAME OVER')
  $gameConsole.append($gg);
  $gg.on('click', reset);
}
