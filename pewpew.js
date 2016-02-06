
var $allies = $('.allies');
var $start = $('.start');
var enemies = [];
var $score = $('#p1Score');
var $score2 = $('#p2Score');
var $health = $('#p1Health');
var $health2 = $('#p2Health');
var $p1 = $('#p1');
var $p2 = $('#p2');
var score = 0;
var score2 = 0;
var $gameConsole = $('.gameConsole');
var bossHealth = 10000;

//source http://stackoverflow.com/questions/2249203/
//check-if-the-spacebar-is-being-pressed-and-the-mouse-is-moving-at-the-same-time

//will creat enemies on start
$start.on('click',newGame);

function newGame () {
  shipFactory();
  enemyFactory();
  $gameConsole.animate({'right':'720px'},60000);
  setTimeout(function() {
    $start.remove();
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
  console.log(keys);
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
    //console.log(randomNumber);
    switch (randomNumber) {
      case 0:
        currentEnemy = new Grunt();
        console.log(0);
        break;
      case 1:
        currentEnemy = new FatGrunt();
        console.log(1);
        break;
      case 2:
        currentEnemy = new BigGrunt();
        console.log(2);
        break;
      case 3:
        currentEnemy = new GiantGrunt();
        console.log(3);
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
        $enemy.animate({'top':'480px'},currentEnemy.speed);
        $boss.animate({'top':'300px'},1750);;
        loop++;
        }
    }
    (function(enemy) {
    setInterval(function(){
      var randomID = makeid();
      enemy.append('<div class="eBullet" id="' + randomID + '"></div>');
      $boss.append('<div class="giantBullet"></div>','<div class="mediumBullet"></div>','<div class="mediumBullet2"></div>');
      var $eBullet = $('.eBullet', enemy);
      var $giantBullet = $('.giantBullet');
      var $mediumBullet = $('.mediumBullet');
      var $mediumBullet2 = $('.mediumBullet2 ');
      $eBullet.animate({'left':'-400px'},2990);
      $giantBullet.animate({'left':'-300px'},2990);
      $mediumBullet.animate({'left':'-300px'},2990);
      $mediumBullet2.animate({'left':'-300px'},2990);
      checkEnemy(enemy, 400);
      checkEnemy($boss, 300);
      setTimeout(function() {
        enemy.empty();
        $boss.empty();
      }, 2990);
    }, 3000);
  })($enemy);
}
}
function Player1() {
  this.health = 3000;
  this.id = '';
  this.score = 0;
  this.lives = 3;
}

function Player2() {
  this.health = 3000;
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
      if ($hitEnemy.attr('health') <= 0) {
        $hitEnemy.remove();


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
      if ($hitPlayer === $('#p1')) {
        $health.text($hitPlayer.attr('health'));
      }
      if ($hitPlayer === $p2) {
        $health2.text($hitPlayer.attr('health'));
      }
      if ($hitPlayer.attr('health') <= 0) {
        var previousLives = $hitPlayer.attr('lives');
        $hitPlayer.attr('lives',(previousLives - 1));
        $hitPlayer.attr('health',(3000));
        if ($hitPlayer.attr('lives') <= 0) {
          $hitPlayer.remove();
          //http://stackoverflow.com/questions/14535733/how-to-check-if-div-element-is-empty
          if( $('.allies').is(':empty') ) {
          endGame();
        }

      //   window.setTimeout(function() {
      //   $hitEnemy.remove();
      // }, 1200);
      }
    }
  }
}
}

function endGame() {
  var $gg = $('<div>');
  $gg.addClass('gg');
  $gg.text('GAME OVER')
  $gameConsole.append($gg);
}
