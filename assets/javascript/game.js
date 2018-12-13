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
    var possibleCharImages = ["assets/images/jarjar.jpeg", "assets/images/ackbar.jpg", "assets/images/lando.jpeg",  "assets/images/porkins.jpg"];
    var possibleEnemies = ["Kirk", "Spock", "Scotty"];
    var possibleEnemyImages = ["assets/images/kirk.jpg", "assets/images/spock.jpeg", "assets/images/scotty.jpg"];

    var chosenCharacter = "";
    var isPlayerSelected = false;
    var playerHealth = 0;
    var playerAttack = 0;
    var playerCounterAttack = 0;

    var selectedEnemy = "";
    var isEnemySelected = false;
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
            playerCharButton.css("height", "200px");
            playerCharButton.css("width", "200px");
            playerCharButton.addClass("player-char");
            playerCharButton.attr("name-value", possibleCharacters[i]);
            playerCharButton.attr("health-value", 100);
            playerCharButton.attr("attack-value", 6);
            playerCharButton.attr("counter-attack-value", 6);
            playerCharButton.html("<img src=" + possibleCharImages[i] + " width='100%' height='70%'/>" );
            playerCharButton.prepend($(playerCharButton).attr("name-value"));
            playerCharButton.append("<br></br>" + $(playerCharButton).attr("health-value"));
            $("#your-character").append(playerCharButton);
         }
    }
    
    function createEnemyCharacters() {
        for (var i = 0; i < possibleEnemies.length; i++) {
            var enemyCharButton = $("<button>");
            enemyCharButton.css("height", "200px");
            enemyCharButton.css("width", "200px");
            enemyCharButton.addClass("enemy-char");
            enemyCharButton.attr("name-value", possibleEnemies[i]);
            enemyCharButton.attr("health-value", 20);
            enemyCharButton.attr("counter-attack-value", 6);
            enemyCharButton.html("<img src=" + possibleEnemyImages[i] + " width='100%' height='70%'/>" );
            enemyCharButton.prepend($(enemyCharButton).attr("name-value"));
            enemyCharButton.append("<br></br>" + $(enemyCharButton).attr("health-value"));
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
    function updateEnemyValues() {
        enemyHealth -= playerAttack;
        if (enemyHealth < 1) {
            isEnemyDead = true;
            attackButtonEnabled = false;
            $(".selected-enemy-char").remove();
            isEnemySelected = false;
            alert("You defeated " + enemyName + "!");
        }
    }

    function updatePlayerValues() {
        if (isEnemyDead === false) {
            playerHealth -= enemyCounterAttack;
            playerAttack = parseInt(playerAttack) + 6;
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
        $(".player-char").remove();
        $(".enemy-char").remove();
        $(".selected-player-char").remove();
        $("#attack-button").remove();
        $("#reset-button").remove();
        chosenCharacter = "";
        isPlayerSelected = false;
        playerHealth = 0;
        playerAttack = 0;
        playerCounterAttack = 0;
        selectedEnemy = "";
        enemyName;
        enemyHealth = 0;
        enemyAttack = 0;
        enemyCounterAttack = 0;
        isEnemyDead = false;
        attackButtonEnabled = false;
        resetButtonEnabled = false;
        startGame();
    }

    function moveOtherCharactersToEnemy() {
        $(".player-char").appendTo("#enemy-character");
        $(".player-char").addClass("enemy-char");
        $(".player-char").removeClass("player-char");
    }

    function showStatsOnPage() {
        $("#your-stats").html("<p>Health: </p>" + playerHealth);
        $("#your-stats").append("<p>Attack: </p>" + playerAttack);
        $("#your-stats").append("<p>Enemy Health Remaining: </p>" + enemyHealth);
    }

    startGame();

    $(".player-char").on("click", function() {
        if (isPlayerSelected === false) {
            $(this).css("background-color", "blue");
            $(this).css("color", "white");
            $(this).addClass("selected-player-char");
            $(this).removeClass("player-char");
            chosenCharacter = $(this).attr("name-value");
            isPlayerSelected = true;
            playerHealth = $(this).attr("health-value");
            playerAttack = $(this).attr("player-attack");
            playerAttack = $(this).attr("counter-attack-value")
            moveOtherCharactersToEnemy();
            showStatsOnPage();
        }
    });

    $(".enemy-char").on("click", function() {
        if (isEnemySelected === false) {
            $(this).css("background-color", "red");
            $(this).css("color", "white");
            $(this).addClass("selected-enemy-char");
            enemyName = $(this).attr("name-value");
            isEnemySelected = true;
            enemyHealth = $(this).attr("health-value");
            enemyCounterAttack = $(this).attr("counter-attack-value");
            $(".selected-enemy-char").appendTo("#defender-area");
            showStatsOnPage();
        }
        
    })

    $("#attack-button").on("click", function (){
        updateEnemyValues();
        updatePlayerValues();
        showStatsOnPage();
    });

    $("#reset-button").on("click", function() {
        resetGame();
    });
});

