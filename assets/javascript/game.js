$(document).ready(function() {
    var possibleCharacters = ["Jar Jar Binks", "Admiral Ackbar", "Lando Calrissian", "Porkins"];
    var possibleCharImages = ["assets/images/jarjar.jpeg", "assets/images/ackbar.jpg", "assets/images/lando.jpeg",  "assets/images/porkins.jpg"];
    var possibleEnemies = ["Kirk", "Spock", "Scotty"];
    var possibleEnemyImages = ["assets/images/kirk.jpg", "assets/images/spock.jpeg", "assets/images/scotty.jpg"];

    var defeatsToWin = possibleCharacters.length + possibleEnemies;
    var numberOfVictories = 0;

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
            $("#your-character").append(playerCharButton);
         }
    }

    function addHealthToPlayerButton() {
        $(".selected-player-char").append("<br></br>" + "<p id='selected-player-health'>" + $(".selected-player-char").attr("health-value") + "</p>");
    }

    function addHealthToEnemyButton() {
        $(".selected-enemy-char").append("<br></br>" + "<p id='selected-enemy-health'>" + $(".selected-enemy-char").attr("health-value") + "</p>");
    }
    
    function createEnemyCharacters() {
        for (var i = 0; i < possibleEnemies.length; i++) {
            var enemyCharButton = $("<button>");
            enemyCharButton.css("height", "200px");
            enemyCharButton.css("width", "200px");
            enemyCharButton.addClass("enemy-char");
            enemyCharButton.attr("name-value", possibleEnemies[i]);
            enemyCharButton.attr("health-value", 60);
            enemyCharButton.attr("counter-attack-value", 6);
            enemyCharButton.html("<img src=" + possibleEnemyImages[i] + " width='100%' height='70%'/>" );
            enemyCharButton.prepend($(enemyCharButton).attr("name-value"));
            $("#enemy-character").append(enemyCharButton);
         }
    }
    
    function startGame() {
        createPlayerCharacters();
        createEnemyCharacters();
        createAttackButton();
        // createResetButton();
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
            playerAttack = parseInt(playerAttack) + 6;
            attackButtonEnabled = false;
            $(".selected-enemy-char").remove();
            isEnemySelected = false;
            alert("You defeated " + enemyName + "!");
            numberOfVictories++;
            if (numberOfVictories === defeatsToWin){
                alert("You saved the Galaxy!");
                resetGame();
            }
        }
    }

    function updatePlayerValues() {
        if (isEnemyDead === false) {
            playerHealth -= enemyCounterAttack;
            playerAttack = parseInt(playerAttack) + 6;
            attackButtonEnabled = true;
            console.log(playerAttack);
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
        gameLogic();
    }

    function gameLogic() {
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
                addHealthToPlayerButton();
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
                addHealthToEnemyButton();
                attackButtonEnabled = true;
                enemyHealth = $(this).attr("health-value");
                enemyCounterAttack = $(this).attr("counter-attack-value");
                $(".selected-enemy-char").appendTo("#defender-area");
                showStatsOnPage();
            }
            
        });
    
        $("#attack-button").on("click", function (){
            updateEnemyValues();
            writeValuesToChar();
            updatePlayerValues();
            writeValuesToChar();
            showStatsOnPage();
        });
    
        // $("#reset-button").on("click", function() {
        //     resetGame();
        // });
    }

    function moveOtherCharactersToEnemy() {
        $(".player-char").appendTo("#enemy-character");
        $(".player-char").addClass("evil-char");
        $(".player-char").addClass("enemy-char");
        $(".player-char").removeClass("player-char");
        $(".evil-char").on("click", function() {
            if (isEnemySelected === false) {
                $(this).css("background-color", "red");
                $(this).css("color", "white");
                $(this).addClass("selected-enemy-char");
                enemyName = $(this).attr("name-value");
                isEnemySelected = true;
                addHealthToEnemyButton();
                attackButtonEnabled = true;
                enemyHealth = $(this).attr("health-value");
                enemyCounterAttack = $(this).attr("counter-attack-value");
                $(".selected-enemy-char").appendTo("#defender-area");
                showStatsOnPage();
            }
        });
    }

    function showStatsOnPage() {
        $("#selected-player-health").html("<p>Health: </p>" + playerHealth);
        $("#selected-enemy-health").html("<p>Health: </p>" + enemyHealth);
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
            addHealthToPlayerButton();
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
            addHealthToEnemyButton();
            attackButtonEnabled = true;
            enemyHealth = $(this).attr("health-value");
            enemyCounterAttack = $(this).attr("counter-attack-value");
            $(".selected-enemy-char").appendTo("#defender-area");
            showStatsOnPage();
        }
    });

    $("#attack-button").on("click", function (){
        if (attackButtonEnabled === true) {
                updateEnemyValues();
                updatePlayerValues();
                showStatsOnPage();
        }
        else {
            alert("Please choose a enemy to attack!");
        } 
    });

    // $("#reset-button").on("click", function() {
    //     resetGame();
    // });
});

