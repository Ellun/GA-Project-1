var $allies = $('.allies');
var $start = $('.start');
var $enemies = $('.enemies');
var enemyHealth = 500;
var $score = $('#p1Score');
var score = 0;
var $score2 = $('#p2Score');
var score2 = 0;
var $gameConsole = $('.gameConsole');
//source http://stackoverflow.com/questions/2249203/
//check-if-the-spacebar-is-being-pressed-and-the-mouse-is-moving-at-the-same-time
//Will create and fire a bullet on click
//will creat enemies on start
$start.on('click',newGame);

function newGame () {
  shipFactory();
  shipFactory2();
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
  //Player Controls
  $(document).on('keydown', function movep1(event) {
    if (event.keyCode === 87) {
      $p1.animate({'top':'-=4px'},{duration: 0.05, queue:false});
    } else if (event.keyCode === 83) {
      $p1.animate({'top':'+=4px'},{duration: 0.05, queue:false});
    } else if (event.keyCode === 65) {
      $p1.animate({'left':'-=10px'},{duration: 0.05, queue:false});
    } else if (event.keyCode === 68) {
      $p1.animate({'left':'+=10px'},{duration: 0.05, queue:false});
    }
  })
}

function shipFactory2() {
  $allies.append('<div class="ship" id="p2"></div>');
  $p2 = $('#p2');
  $(document).on('keydown', function movep2(event) {
    if (event.keyCode === 73) {
      $p2.animate({'top':'-=4px'},{duration: 0.05, queue:false});
    } else if (event.keyCode === 75) {
      $p2.animate({'top':'+=4px'},{duration: 0.05, queue:false});
    } else if (event.keyCode === 74) {
      $p2.animate({'left':'-=10px'},{duration: 0.05, queue:false});
    } else if (event.keyCode === 76) {
      $p2.animate({'left':'+=10px'},{duration: 0.05, queue:false});
    }
  })
}
//creates bullets
$(document).on('keydown', function moveUp(event) {
  if (32 === event.keyCode) {
    p1BulletFactory();
  }
});

$(document).on('keydown', function moveUp(event) {
  if (13 === event.keyCode) {
    p2BulletFactory();
  }
});

function EnemyAttributes (name,color,health) {
  this.name = name;
  this.color = color;
  this.health = health;
  this.x = x;
  this.y = y;
}

function enemyFactory () {
  $enemies.empty();
  for (var i = 1; i < 10; i++) {
    $enemy = $('<div>');
    $enemy.addClass('enemy');
    $enemy.attr('id', 'enemy' + i);
    $enemies.append($enemy);
    var loop = 0;
    while (loop < 500) {
      if (loop % 2 === 0) {
        $enemy.animate({'top':'0px'},3000);
        loop++;
      } else {
        $enemy.animate({'top':'450px'},3000);
        loop++;
        }
    }
    //var enemy = new EnemyAttributes(enemies[Math.floor(Math.random()*enemies.length)]);
  }
}

var enemies = [
    {name: 'redShip', color: 'red', health: 100, x: 200, y: 150},
    {name: 'greenShip', color: 'green', health: 200},
    {name: 'purpleShip', color: 'purple', health: 125},
];

//Create Bullets
function p1BulletFactory() {
  $p1.append('<div class="bullet" id="p1B"></div>');
  $p1B = $('#p1B');
  //https://www.youtube.com/watch?v=PyS35523130
  $p1B.animate({'left':'600px'},1200);
  //http://stackoverflow.com/questions/3655627/jquery-append-object-remove-it-with-delay
    setTimeout(function() {
      $p1.empty();
    }, 1200);
  check();
}

function p2BulletFactory() {
  $p2.append('<div class="bullet" id="p2B"></div>');
  $p2B = $('#p2B');
  $p2B.animate({'left':'600px'},1200);
    setTimeout(function() {
      $p2.empty();
    }, 1200);
  check2();
}

//Collision Detection
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function check() {
    if (parseInt($p1B.css('left'))  < parseInt($enemy.css('left')) + parseInt($enemy.css('width')) &&
       parseInt($p1B.css('left')) + parseInt($p1B.css('width')) + 500 > parseInt($enemy.css('left')) &&
       parseInt($p1.css('top')) < parseInt($enemy.css('top')) + parseInt($enemy.css('height'))&&
       parseInt($p1.css('height')) + parseInt($p1.css('top')) > parseInt($enemy.css('top')))
      {
         enemyHealth -= 100;
         score += 250;
         $score.text(score);
         if (enemyHealth <= 0) {
           setTimeout(function() {
             $enemy.remove();
           }, 1000);
         }
    }
}

function check2() {
    if (parseInt($p2B.css('left'))  < parseInt($enemy.css('left')) + parseInt($enemy.css('width')) &&
       parseInt($p2B.css('left')) + parseInt($p2B.css('width')) + 500 > parseInt($enemy.css('left')) &&
       parseInt($p2.css('top')) < parseInt($enemy.css('top')) + parseInt($enemy.css('height'))&&
       parseInt($p2.css('height')) + parseInt($p2.css('top')) > parseInt($enemy.css('top')))
      {
         enemyHealth -= 100;
         score2 += 250;
         $score2.text(score2);
         if (enemyHealth <= 0) {
           setTimeout(function() {
             $enemy.remove();
           }, 0.5);
         }
    }
}
