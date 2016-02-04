
var $allies = $('.allies');
var $start = $('.start');
var $enemies = $('.enemies');
var $score = $('#p1Score');
var $score2 = $('#p2Score');
var score = 0;
var score2 = 0;
var $gameConsole = $('.gameConsole');
var $enemy1 = $('#enemy1');
var enemyHealth = 100;
var bossHealth = 10000;

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

// key = [false,false,false,false,false];
// key2 = [false,false,false,false,false];
//
// $(document).on('keydown', function keydown(event){
//   switch(event.keyCode) {
//     case 87:
//     key[0] = true;
//     break;
//     case 83:
//     key[1] = true;
//     break;
//     case 65:
//     key[2] = true;
//     break;
//     case 68:
//     key[3] = true;
//     break;
//     case 32:
//     key[4] = true;
//     break;
//   }
// })
//
// $(document).on('keyup', function keyup(event){
//   switch(event.keyCode) {
//     case 87:
//     key[0] = false;
//     break;
//     case 83:
//     key[1] = false;
//     break;
//     case 65:
//     key[2] = false;
//     break;
//     case 68:
//     key[3] = false;
//     break;
//     case 32:
//     key[4] = false;
//     break;
//   }
// })
//
// $(document).on('keydown', function keydown(event){
//   switch(event.keyCode) {
//     case 73:
//     key2[0] = true;
//     break;
//     case 73:
//     key2[1] = true;
//     break;
//     case 74:
//     key2[2] = true;
//     break;
//     case 76:
//     key2[3] = true;
//     break;
//     case 13:
//     key2[4] = true;
//     break;
//   }
// })

// $(document).on('keyup', function keyup(event){
//   switch(event.keyCode) {
//     case 73:
//     key2[0] = false;
//     break;
//     case 75:
//     key2[1] = false;
//     break;
//     case 74:
//     key2[2] = false;
//     break;
//     case 76:
//     key2[3] = false;
//     break;
//     case 13:
//     key2[4] = false;
//     break;
//   }
// })

//Player Controls
// function checkKeys(events){
//   if(key[0] || key[1] || key[2] || key[3] || key[4]) {
//     if (key[0]) {
//       $p1.animate({'top':'-=4/30px'},{duration: 0.05, queue:false});
//     } else if (keys[1]) {
//       $p1.animate({'top':'+=4/30px'},{duration: 0.05, queue:false});
//     } if (keys[2]) {
//       $p1.animate({'left':'-=0.3px'},{duration: 0.05, queue:false});
//     } if (keys[3]) {
//         $p1.animate({'left':'+=0.3px'},{duration: 0.05, queue:false});
//     }
//   }
// }

//creates starting ships
function shipFactory() {
  $allies.empty();
  $allies.append('<div class="ship" id="p1"></div>');
  $p1 = $('#p1');

//   $(document).on('keydown', function movep1(event) {
//     if (event.keyCode === 87) {
//       $p1.animate({'top':'-=4px'},{duration: 0.05, queue:false});
//     } else if (event.keyCode === 83) {
//       $p1.animate({'top':'+=4px'},{duration: 0.05, queue:false});
//     } else if (event.keyCode === 65) {
//       $p1.animate({'left':'-=10px'},{duration: 0.05, queue:false});
//     } else if (event.keyCode === 68) {
//       $p1.animate({'left':'+=10px'},{duration: 0.05, queue:false});
//     }
//   })
}

function shipFactory2() {
  $allies.append('<div class="ship" id="p2"></div>');
  $p2 = $('#p2');
  // $(document).on('keydown', function movep2(event) {
  //   if (event.keyCode === 73) {
  //     $p2.animate({'top':'-=4px'},{duration: 0.05, queue:false});
  //   } else if (event.keyCode === 75) {
  //     $p2.animate({'top':'+=4px'},{duration: 0.05, queue:false});
  //   } else if (event.keyCode === 74) {
  //     $p2.animate({'left':'-=10px'},{duration: 0.05, queue:false});
  //   } else if (event.keyCode === 76) {
  //     $p2.animate({'left':'+=10px'},{duration: 0.05, queue:false});
  //   }
  // })
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

//window.setInterval(shipFactory.checkKeys, 1000 / 30);
//creates bullets
//$(document).on('keydown', function moveUp(event) {
  //if (32 === event.keyCode) {
  //  p1BulletFactory();
  //}
//});

// $(document).on('keydown', function moveUp(event) {
//   if (13 === event.keyCode) {
//     p2BulletFactory();
//   }
// });

function enemyFactory () {
  $enemies.empty();
  $boss = $('<div>');
  $boss.attr('id','boss');
  $enemies.append($boss);
  for (var i = 1; i <= 10; i++) {
    $enemy = $('<div>');
    $enemy.addClass('enemy');
    $enemy.attr('id', 'enemy' + i);
    $enemies.append($enemy);
    var loop = 0;
    while (loop < 500) {
      if (loop % 2 === 0) {
        $enemy.animate({'top':'0px'},3000);
        $boss.animate({'top':'0px'},3000);
        loop++;
      } else {
        $enemy.animate({'top':'480px'},3000);
        $boss.animate({'top':'100px'},3000);
        loop++;
        }
    }
  }
}

function EnemyFactory (name, id, color, health) {
  this.id = id;
  this.health = health;
}

// var enemies = [
//   {id: 'enemy' + i, health: 100},
//   {id: 'enemy' + i, health: 200},
//   {id: 'enemy' + i, health: 300},
// ];

//Create Bullets
// function p1BulletFactory() {
//   $p1.append('<div class="bullet" id="p1B"></div>');
//   $p1B = $('#p1B');
//   //https://www.youtube.com/watch?v=PyS35523130
//   $p1B.animate({'left':'600px'},1200);
//   //http://stackoverflow.com/questions/3655627/jquery-append-object-remove-it-with-delay
//     setTimeout(function() {
//       $p1.empty();
//     }, 1200);
//   //check();
//   check3();
// }
function bulletFactory($player) {
  console.log('adsfaf');
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

// function p2BulletFactory() {
//   $p2.append('<div class="bullet" id="p2B"></div>');
//   $p2B = $('#p2B');
//   $p2B.animate({'left':'600px'},1200);
//     setTimeout(function() {
//       $p2.empty();
//     }, 1200);
//   //check1();
//   check2();
// }
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

// function check1() {
//   for (var i = 1; i <= 10; i++) {
//     if (parseInt($p2B.css('left'))  < parseInt($enemy.attr('id','enemy' + i).css('left')) + parseInt($enemy.attr('id','enemy' + i).css('width')) &&
//        parseInt($p2B.css('left')) + parseInt($p2B.css('width')) + 500 > parseInt($enemy.attr('id','enemy' + i).css('left')) &&
//        parseInt($p2.css('top')) < parseInt($enemy.attr('id','enemy' + i).css('top')) + parseInt($enemy.attr('id','enemy' + i).css('height'))&&
//        parseInt($p2.css('height')) + parseInt($p2.css('top')) > parseInt($enemy.attr('id','enemy' + i).css('top')))
//       {
//          this.health-= 100;
//          score2 += 250;
//          $score2.text(score2);
//          if (this.health <= 0) {
//            setTimeout(function() {
//              this.id.remove();
//            }, 0.5);
//          }
//        }
//     }
// }

function check2() {
    if (parseInt($p2B.css('left'))  < parseInt($boss.css('left')) + parseInt($boss.css('width')) &&
       parseInt($p2B.css('left')) + parseInt($p2B.css('width')) + 500 > parseInt($boss.css('left')) &&
       parseInt($p2.css('top')) < parseInt($boss.css('top')) + parseInt($boss.css('height'))&&
       parseInt($p2.css('height')) + parseInt($p2.css('top')) > parseInt($boss.css('top')))
      {
         bossHealth -= 100;
         score2 += 250;
         $score2.text(score2);
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
