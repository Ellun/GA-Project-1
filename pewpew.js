
var $allies = $('.allies');
var $start = $('.start');
var enemies = [];
var $score = $('#p1Score');
var $score2 = $('#p2Score');
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
    $allies.append($player);
  }
  $p1 = $('#p1');
  $p2 = $('#p2');
}

$(document).on('keydown', function (event) {
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

function onKeyDown($player, action) {
  switch (action) {
    case 'up':
      $player.animate({'top':'-=4px'},{duration: 0.05, queue:false});
      break;
    case 'down':
      $player.animate({'top':'+=4px'},{duration: 0.05, queue:false});
      break;
    case 'left':
      $player.animate({'left':'-=10px'},{duration: 0.05, queue:false});
      break;
    case 'right':
      $player.animate({'left':'+=10px'},{duration: 0.05, queue:false});
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
        $boss.animate({'top':'0px'},3000);
        loop++;
      } else {
        $enemy.animate({'top':'480px'},currentEnemy.speed);
        $boss.animate({'top':'100px'},3000);;
        loop++;
        }
    }
    (function(enemy) {
    setInterval(function(){
      var randomID = makeid();
      enemy.append('<div class="eBullet" id="' + randomID + '"></div>');
      var $eBullet = $('.eBullet', enemy);
      $eBullet.animate({'left':'-300px'},2990);
      //checkEnemy($eBullet);
      setTimeout(function() {
        enemy.empty();
      }, 2990);
     }, 3000);
  })($enemy);
}
}
function Player1() {
  this.health = 1000;
  this.id = '';
  this.score = 0;
}

function Player2() {
  this.health = 1000;
  this.id = '';
  this.score = 0;
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
  if ($player === $p2) {
    $bullet.addClass('green');
  }
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

// function getEnemyById(id) {
//   for (var i = 1; i <= 10; i++) {
//     if (enemies[i].id === id) {
//       return enemies[i];
//     }
//   }
//   return null;
// }

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
      console.log($hitEnemy.attr('health'));
      var previousHealth = $hitEnemy.attr('health')
      $hitEnemy.attr('health',(previousHealth - 100));
      if ($player === $p1) {
        var previousScore = parseInt($player.attr('score'));
        $player.attr('score',(previousScore + 250));
        console.log($player.attr('score'));
        $score.text($player.attr('score'));
      }
      if ($player === $p2) {
        var previousScore = parseInt($player.attr('score'));
        $player.attr('score',(previousScore + 250));
        $score2.text($player.attr('score'));
      }
      if ($hitEnemy.attr('health') <= 0) {
        $hitEnemy.remove();
        if( $('.enemies').is(':empty') ) {
          
      //   window.setTimeout(function() {
      //   $hitEnemy.remove();
      // }, 1200);
      }
    }
  }
}
}
function checkEnemy($eBullet) {
  for (var i = 1; i <= 11; i++) {

    if (
      parseInt($eBullet.css('left'))  < (parseInt($hitEnemy.css('left')) + parseInt($hitEnemy.css('width'))) &&
      (parseInt($eBullet.css('left')) + parseInt($eBullet.css('width')) + 400) > parseInt($hitEnemy.css('left')) &&
      parseInt($eBullet.css('top')) < (parseInt($hitEnemy.css('top')) + parseInt($hitEnemy.css('height'))) &&
      (parseInt($eBullet.css('height')) + parseInt($eBullet.css('top'))) > parseInt($hitEnemy.css('top'))
    ){
      console.log($hitEnemy.attr('health'));
      var previousHealth = $hitEnemy.attr('health');
      $hitEnemy.attr('health',(previousHealth - 100));
      var previousScore = $player.attr('score');
      $player.attr('score',(previousScore + 250));
      console.log(previousHealth);
      if ($hitEnemy.attr('health') <= 0) {
        console.log('hey');
        $hitEnemy.remove();
      //   window.setTimeout(function() {
      //   $hitEnemy.remove();
      // }, 1200);
      }
    }
  }
}
