/*
Starts:
    1.  Choose character (click on picture)
    2.  Player chooses opponent
    3.  THAT specific opponent is then moved to the defender area
    4. Attack Phase
        a. Enable Attack Button
        b. Deal damage to defending opponent
        c.  Opponent loses HP(Displayed on bottom of picture)
        d.  Opponent will attack player if HP is left
        e.  This will repeat until one or the other dies
    5.  Player wins if they beat all enemies(HP falls to 0)

Each Character has
    1.  Each character has Health, Attack Power, Counter Attack Power
    2.  Each time player attacks Attack Power increases (+6 per attack)
    3.  Enemies only has Counter Attack Power and HP
    4.  Enemies do not increase.
    5.  No Healing or recovering health.
    6.  Players should be able to win or lose with any character.  Pick the right enemies
*/



$(document).ready(function() {
    var possibleCharacters = ["Jar Jar Binks", "Admiral Ackbar", "Lando Calrissian", "Porkins"];
    var possibleEnemies = ["Kirk", "Spock", "Scotty"];

    var chosenCharacter = "";
    var playerHealth = 0;
    var playerAttack = 0;
    var playerCounterAttack = 0;

    var selectedEnemy = "";
    var enemyName;
    var enemyHealth = 0;
    var enemyAttack = 0;
    var enemyCounterAttack = 0;
    var isEnemyDead = false;

    var attackButtonEnabled = false;
    var resetButtonEnabled = false;

    function createPlayerCharacters() {
        for (var i = 0; i < possibleCharacters.length; i++) {
            var playerCharButton = $("<button>");
            playerCharButton.addClass("player-char");
            playerCharButton.attr("name-value", possibleCharacters[i]);
            playerCharButton.attr("health-value", 100);
            playerCharButton.attr("attack-value", 6);
            playerCharButton.attr("counter-attack-value", 6);
            playerCharButton.text(possibleCharacters[i]);
            $("#your-character").append(playerCharButton);
         }
    }
    
    function createEnemyCharacters() {
        for (var i = 0; i < possibleEnemies.length; i++) {
            var enemyCharButton = $("<button>");
            enemyCharButton.addClass("enemy-char");
            enemyCharButton.attr("name-value", possibleEnemies[i]);
            enemyCharButton.attr("health-value", 20);
            enemyCharButton.attr("counter-attack-value", 6);
            enemyCharButton.text(possibleEnemies[i]);
            $("#enemy-character").append(enemyCharButton);
         }
    }
    
    function startGame() {
        createPlayerCharacters();
        createEnemyCharacters();
        createAttackButton();
        createResetButton();
    }

    function createAttackButton() {
        var attackButton = $("<button>");
        attackButton.attr("id", "attack-button");
        attackButton.text("Attack");
        $("#button-area").append(attackButton);
    }

    function createResetButton() {
        var resetButton = $("<button>");
        resetButton.attr("id", "reset-button");
        resetButton.text("Reset");
        $("#button-area").append(resetButton);
    }
    
    $(".player-char").on("click", function() {
        chosenCharacter = $(this).attr("name-value");
        console.log($(chosenCharacter));
    });

    $(".enemy-char").on("click", function() {
        selectedEnemy = $(this).attr("name-value");
        $(".enemy-char").$(this).appendTo("#defender-area");
    })

    $("#attack-button").on("click", function (){
        updateEnemyValues();
        updatePlayerValues();
    });

    $("#reset-button").on("click", function() {
        resetGame();
    });

    function updateEnemyValues() {
        enemyHealth -= playerAttack;
        if (enemyHealth < 1) {
            isEnemyDead = true;
            attackButtonEnabled = false;
        }
    }

    function updatePlayerValues() {
        if (isEnemyDead === false) {
            playerHealth -= enemyCounterAttack;
            playerAttack += 6;
            attackButtonEnabled = true;
            console.log(playerAttack);
        }
        if (isEnemyDead === true) {
            attackButtonEnabled = false;
        }
        if (playerHealth < 1) {
            gameOver();
        }

    }
    function gameOver() {
        alert("You Lose");
        resetButtonEnable()
    }

    function resetButtonEnable() {
        resetButtonEnabled = true;
        resetGame();
    }

    function resetGame() {
        possibleCharacters = ["Jar Jar Binks", "Admiral Ackbar", "Lando Calrissian", "Porkins"];
        possibleEnemies = ["Kirk", "Spock", "Scotty"];
        startGame();
    }

    startGame();
});

