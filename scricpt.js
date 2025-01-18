
var reactions = [
    { description: "Qual dos seguintes componentes NÃO está presente em um nucleotídeo?", name: "Ácido graxo" },
    { description: "O processo de síntese de proteínas ocorre em qual organela celular?", name: "Ribossomo" },
    { description: "Durante a replicação do DNA, qual enzima é responsável por separar as fitas da dupla hélice?", name: "Helicase" },
    { description: "Qual tipo de mutação ocorre quando um único nucleotídeo é substituído por outro?", name: "Substituição de bases" },
    { description: " Qual das ferramentas a seguir é usada para cortar sequências específicas de DNA em tecnologia recombinante?", name: "Endonuclease de restrição" },
    { description: "Em proteínas, as ligações de hidrogênio que estabilizam a estrutura secundária (alfa-hélice ou beta-pregueada) ocorrem entre:", name: "Átomos da cadeia principal do polipeptídeo" },
    { description: "Qual base nitrogenada é encontrada apenas no RNA?", name: "Uracila" },
    { description: "", name: "Facilitar o pareamento entre o RNAt e o RNAm e catalisar a formação de ligações peptídicas." },
    { description: "Durante a tradução, qual tipo de RNA transporta aminoácidos para o ribossomo?", name: "RNA transportador " },
    { description: "O DNA é transcrito para RNA pela ação de qual enzima?", name: "RNA polimerase" },
    { description: "Qual mecanismo é usado para reparar danos na fita dupla do DNA?", name: "Recombinação homóloga" },
    { description: "A técnica de eletroforese em gel é usada para ?", name: "Separar moléculas de DNA ou RNA" },
    { description: "A técnica de eletroforese em gel é usada paraNa técnica de Western Blot, qual molécula é analisada??", name: "edição de genomas precisa" },
    { description: "Qual a técnica de CRISPR-Cas9?", name: "Núcleo" }
];
var currentReactions;
var currentReaction;
var score = 0;
var totalQuestions = 14;
var questionCount = 0;
var timer;
var answered = false;

function loadQuestion() {
    if (currentReactions.length === 0) {
        currentReactions = shuffle(reactions.slice());
    }
    currentReaction = currentReactions.pop();
    document.getElementById('question').innerText = currentReaction.description;
    var choices = reactions.map(function(reaction) { return reaction.name; });
    choices = shuffle(choices).slice(0, 4);
    if (choices.indexOf(currentReaction.name) === -1) {
        choices[0] = currentReaction.name;
        choices = shuffle(choices);
    }
    var choicesHTML = choices.map(function(choice) {
        return '<label class="choice"><input type="radio" name="reaction" value="' + choice + '"> ' + choice + '</label>';
    }).join('');
    document.getElementById('choices').innerHTML = choicesHTML;
    document.getElementById('checkButton').disabled = false;
    startTimer();
    answered = false;
}

function checkAnswer() {
    if (!answered) {
        answered = true;
        clearTimeout(timer);
        var userAnswer = document.querySelector('input[name="reaction"]:checked');
        if (userAnswer && userAnswer.value === currentReaction.name) {
            document.getElementById('result').innerText = "Correto!";
            score++;
        } else {
            document.getElementById('result').innerText = "Incorreto. A resposta correta era: " + currentReaction.name;
        }
        document.getElementById('score').innerText = score;
        document.getElementById('checkButton').disabled = true;
        questionCount++;
        if (questionCount >= totalQuestions) {
            endGame();
        } else {
            setTimeout(nextQuestion, 2000);
        }
    }
}

function nextQuestion() {
    document.getElementById('result').innerText = 'Resultado';
    loadQuestion();
}

function startGame() {
    score = 0;
    questionCount = 0;
    currentReactions = [];
    document.getElementById('score').innerText = score;
    document.getElementById('start').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('endgame').style.display = 'none';
    nextQuestion();
}

function resetGame() {
    clearTimeout(timer);
    document.getElementById('start').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('endgame').style.display = 'none';
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('endgame').style.display = 'block';
    document.getElementById('endgameScore').innerText = "Você acertou " + score + " de " + totalQuestions + " perguntas.";
    if (score > totalQuestions / 2) {
        document.getElementById('endgameTitle').innerText = "Parabéns!";
    } else {
        document.getElementById('endgameTitle').innerText = "Tente novamente!";
    }
}

function startTimer() {
    var time = 30;
    document.getElementById('time').innerText = time;
    timer = setInterval(function() {
        time--;
        document.getElementById('time').innerText = time;
        if (time <= 0) {
            clearTimeout(timer);
            if (!answered) {
                checkAnswer();
            }
        }
    }, 1000);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
