
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
var $enemy1 = $('#enemy1');
var enemyHealth = 100;
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
  $allies.append('<div class="ship" id="p1"></div>');
  $p1 = $('#p1');
  $p1.score = 0;
  $allies.append('<div class="ship" id="p2"></div>');
  $p2 = $('#p2');
  $p2.score = 0;
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
  $boss.attr('id','boss');
  $('.enemies').append($boss);
  for (var i = 1; i <= 10; i++) {
    var currentEnemy = null;
    var randomNumber = Math.floor(Math.random()*3);
    console.log(randomNumber);
    switch (randomNumber) {
      case 0:
        currentEnemy = new Grunt();
        break;
      case 1:
        currentEnemy = new BigGrunt();
        break;
      case 2:
        currentEnemy = new GiantGrunt();
        break;
    }
    currentEnemy.id = 'enemy' + i;
    var $enemy = $('<div>');
    $enemy.addClass('enemy');
    $enemy.attr('id', currentEnemy.id);
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
        $boss.animate({'top':'100px'},3000);
        loop++;
        }
    }
  }
}

function Grunt() {
  this.health = 100;
  this.id = '';
  this.speed = 2000;
}

function BigGrunt() {
  this.health = 200;
  this.id = '';
  this.speed = 4000;
}


function GiantGrunt() {
  this.health = 300;
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
  $bullet.animate({'left':'600px'},1200);
  //http://stackoverflow.com/questions/3655627/jquery-append-object-remove-it-with-delay
  setTimeout(function() {
    $player.empty();
  }, 1200);
  //check();
  //check3();
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
// function check() {
//   for (var i = 1; i <= 10; i++) {
//     if (parseInt($p1B.css('left'))  < parseInt($enemy.attr('id','enemy' + i).css('left')) + parseInt($enemy.attr('id','enemy' + i).css('width')) &&
//        parseInt($p1B.css('left')) + parseInt($p1B.css('width')) + 500 > parseInt($enemy.attr('id','enemy' + i).css('left')) &&
//        parseInt($p1.css('top')) < parseInt($enemy.attr('id','enemy' + i).css('top')) + parseInt($enemy.attr('id','enemy' + i).css('height'))&&
//        parseInt($p1.css('height')) + parseInt($p1.css('top')) > parseInt($enemy.attr('id','enemy' + i).css('top')))
//       {
//          enemyHealth -= 100;
//          //this.health -= 100;
//          score += 250;
//          $score.text(score);
//          if (enemyHealth <= 0) {
//            setTimeout(function() {
//             //  console.log($enemy1);
//              $('#enemy1').remove();
//
//            }, 1);
//          }
//     }
//   }
// }

function check($player) {
  for (var i = 1; i <= 10; i++) {
    if (parseInt($player.css('left'))  < parseInt($enemy.attr('id','enemy' + i).css('left')) + parseInt($enemy.attr('id','enemy' + i).css('width')) &&
      parseInt($player.css('left')) + parseInt($player.css('width')) + 500 > parseInt($enemy.attr('id','enemy' + i).css('left')) &&
      parseInt($player.css('top')) < parseInt($enemy.attr('id','enemy' + i).css('top')) + parseInt($enemy.attr('id','enemy' + i).css('height'))&&
      parseInt($player.css('height')) + parseInt($player.css('top')) > parseInt($enemy.attr('id','enemy' + i).css('top')))
      {
      var currentEnemy = getEnemyById('enemy' + i);
      currentEnemy.health-= 100;
      $player.score += 250;
      //$score2.text(score2);
      if (currentEnemy.health <= 0) {
        setTimeout(function() {
        $('#' + currentEnemy.id).remove();
        }, 0.5);
      }
    }
  }
}
function getEnemyById(id) {
  for (var i = 0; i < enemies.length ; i++) {
    if (enemies[i].id === id) {
      return enemies[i];
    }
  }
  return null;
}

function check2() {
    if (parseInt($p2B.css('left'))  < parseInt($boss.css('left')) + parseInt($boss.css('width')) &&
       parseInt($p2B.css('left')) + parseInt($p2B.css('width')) + 500 > parseInt($boss.css('left')) &&
       parseInt($p2.css('top')) < parseInt($boss.css('top')) + parseInt($boss.css('height'))&&
       parseInt($p2.css('height')) + parseInt($p2.css('top')) > parseInt($boss.css('top')))
      {
         bossHealth -= 100;
         player.score += 250;
         //$score2.text(score2);
         if (bossHealth <= 0) {
           setTimeout(function() {
             $('#boss').remove();
           }, 0.5);
         }
       }
}

function check3() {
    if (parseInt($p1B.css('left'))  < parseInt($boss.css('left')) + parseInt($boss.css('width')) &&
       parseInt($p1B.css('left')) + parseInt($p1B.css('width')) + 500 > parseInt($boss.css('left')) &&
       parseInt($p1.css('top')) < parseInt($boss.css('top')) + parseInt($boss.css('height'))&&
       parseInt($p1.css('height')) + parseInt($p1.css('top')) > parseInt(boss.css('top')))
      {
         bossHealth -= 100;
         score += 250;
         $score.text(score);
         if (bossHealth <= 0) {
           setTimeout(function() {
             $('#boss').remove();
           }, 0.5);
         }
       }
}
