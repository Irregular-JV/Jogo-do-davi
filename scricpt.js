
var reactions = [
    { description: "Qual é o principal ponto de controle da expressão gênica em células eucarióticas?", name: "Transcrição" },
    { description: "Qual é a função dos fatores de transcrição?", name: "Ajudar a RNA polimerase a iniciar a transcrição" },
    { description: "Qual é o papel da enzima RNA polimerase, sabendo que essa é uma peça central na expressão gênica?", name: "Transcrever RNA" },
    { description: "Qual base nitrogenada está presente no RNA, mas não no DNA?", name: "Uracila" },
    { description: "Qual tipo de RNA carrega os aminoácidos para os ribossomos durante a tradução? ", name: "RNA transportador (tRNA)" },
    { description: "O que é uma mutação no DNA e como ela pode afetar uma proteína?", name: "Uma mutação é uma alteração na sequência de DNA, que pode modificar a função da proteína." },
    { description: "Durante o processo de transcrição, qual das alternativas abaixo descreve corretamente o papel da RNA polimerase?", name: "Separar as fitas de DNA e sintetizar uma molécula de RNA complementar à fita molde." },
    { description: "Qual é a função principal do ribossomo durante o processo de tradução?", name: "Facilitar o pareamento entre o RNAt e o RNAm e catalisar a formação de ligações peptídicas." },
    { description: "O que é a técnica de CRISPR-Cas9 e para que é utilizada?", name: "Uma técnica de edição genômica que permite modificar o DNA de forma precisa." },
    { description: "Qual é a principal diferença funcional entre o DNA e o RNA nos organismos vivos?", name: "O DNA armazena as informações genéticas, enquanto o RNA está envolvido na síntese de proteínas." },
     // Reações existentes...
    { description: "Na síntese de proteínas, os ribossomos têm como função:", name: "Sintetizar proteínas" },
    { description: "Qual é o papel dos mecanismos de reparo do DNA nas células", name: "Eles corrigem erros e danos no DNA para evitar mutações prejudiciais." },
];
var currentReactions;
var currentReaction;
var score = 0;
var totalQuestions = 12;
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
