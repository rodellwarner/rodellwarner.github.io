// Questions & Answers

const STORE = [
  {
    question: 'The base of a pyramid is always:',
    answers: ['a triangle', 'built with its corners facing north, south, east, and west', 'built at sea level', 'a square'],
    get correctAnswer() {
      return this.answers[3];
    }
  },

  {
    question: 'The tip of a pyramid is called:',
    answers: ['an obelisk', 'the jewel', 'the pyramidion', 'the cone'],
    get correctAnswer() {
      return this.answers[2];
    }
  },

  {
    question: 'How long, on average, did it take to build each of the pyramids at Giza?',
    answers: ['About 20 years', 'About 200 years', 'About 2,000 years', 'About 20,000 years'],
    get correctAnswer() {
      return this.answers[0];
    }
  },

  {
    question: 'The river that runs near to the pyramids at Giza is called:',
    answers: ['The Delta', 'The Orinoco', 'The Giza River', 'The Nile'],
    get correctAnswer() {
      return this.answers[3];
    }
  },

  {
    question: 'How many sides/faces does the great pyramid at Giza have?',
    answers: ['5', '3', '8', '4'],
    get correctAnswer() {
      return this.answers[2];
    }
  }
];


let score = 0;
let questionNumber = 0;


function setInitialConditions() {
  console.log('***setInitialConditions ran***');
  $('.questionBox').hide();
  $('.responseBox').hide();
  $('#submitButton').hide();
  $('.submitButtonBox').hide();
  $('.nextQuestionButtonBox').hide();
  $('#finalNextButton').hide();
  $('.finalNextButtonBox').hide();
  $('.endOfQuizBox').hide();
  $('.restartQuizButtonBox').hide();
  $('.startQuizContainer').show();
  $('#startButton').show();
  $('.questionNumberAndScoreDisplay').show();
}


function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber);
  console.log('Question Number Updated! Question number is now ' + questionNumber);
}


function updateScore() {
  score++;
  $('.scoreNumber').text(score);
  console.log('Score Updated! ' + 'Score is now ' + score);
}


function handleStartQuiz() {
  $('#startButton').click(function(event) {
    console.log('***handleStartQuiz ran***');
    $('#startButton').hide();
    $('.startQuizContainer').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    generateQuestion();
  });
}


function generateQuestion() {
  console.log('***generateQuestion ran***');
  $('.questionBox').text("");
  let htmlForQuestion = `<p>${STORE[questionNumber - 1].question}</p>`;
  console.log('Question #' + questionNumber + ':' + ' ' + `${STORE[questionNumber - 1].question}`);
  htmlForQuestion += `<form id="quizForm">`;
  for (i = 0; i < STORE[questionNumber - 1].answers.length; i++) {
    console.log(`${STORE[questionNumber - 1].answers[i]}`);
    htmlForQuestion += `
        <li>
          <input type="radio" id="${STORE[questionNumber - 1].answers[i].slice(-5)}"
           name="answerChoice" value="${STORE[questionNumber - 1].answers[i]}" required="required">
          <label for="${STORE[questionNumber - 1].answers[i].slice(-5)}">${STORE[questionNumber - 1].answers[i]}</label>
        </li>
      `;
  
        $('.submitButtonBox').show();
        $('#submitButton').show();
  };

  htmlForQuestion += `</form>`;
  
  $('.questionBox').html(htmlForQuestion);
}


function youreRight() {
  console.log('***youreRight ran***');
  $('.questionBox').hide();
  $('.responseBox').show();
  $('.submitButtonBox').hide();
  $('.nextQuestionButtonBox').show();
  $('.responseBox').text("You're right!");
  updateScore();
}


function youreWrong() {
  console.log('***youreWrong ran***');
  $('.questionBox').hide();
  $('.responseBox').show();
  $('.submitButtonBox').hide();
  $('.nextQuestionButtonBox').show();
  let rightAnswer = STORE[questionNumber - 1].correctAnswer;
  $('.responseBox').text("Nope! " + "The correct answer is: " + `${rightAnswer}`);
}


function handleNextQuestion() {
  $('#nextQuestionButton').click(function(event) {
    console.log('***handleNextQuestion ran***');
    updateQuestionNumber();
    $('.questionBox').show();
    $('.responseBox').hide();
    $('.submitButtonBox').show();
    $('.nextQuestionButtonBox').hide();
    generateQuestion();
  });
}


function handleFinalNextButton() {
  console.log('***handleFinalNextButton ran***')
  $('#finalNextButton').click(function(event) {
  $('.questionBox').hide();
  $('.responseBox').hide();
  $('.submitButtonBox').hide();
  $('.nextQuestionButtonBox').hide();
  $('.finalNextButtonBox').hide()
  $('#finalNextButton').hide();
  $('.questionNumberAndScoreDisplay').hide();
  $('.endOfQuizBox').show();
  $('.endOfQuizBox').text('Your final score is ' + score + '/' + STORE.length);
  $('.restartQuizButtonBox').show();
  });
}


function resetQuestionNumberAndScore() {
  console.log('***resetQuestionNumberAndScore ran***');
  questionNumber = 0;
  score = 0;
  $('.questionNumber').text('0');
  $('.scoreNumber').text('0');
}


function handleRestartQuiz() {
  $('#restartQuizButton').click(function (event) {
    console.log('***handleRestartQuiz ran***');
    resetQuestionNumberAndScore();
    console.log('Question number reset. Question number is now ' + questionNumber);
    setInitialConditions();
  });
}


function handleSubmitAnswer() {
  $('body').on('submit', function(event) {
  event.preventDefault();
  console.log('***handleSubmitAnswer ran***');
  console.log('The question number is' + ' ' + questionNumber);
  let selectedAnswer = $("input[name=answerChoice]:checked").val();
  console.log('The selected answer is' + ' ' + selectedAnswer);
  let rightAnswer = STORE[questionNumber - 1].correctAnswer;
  console.log('The right answer is' + ' ' + rightAnswer);
  if (selectedAnswer === rightAnswer) {
    console.log('Right answer selected');
    youreRight();
  }
  else {
    console.log('Wrong answer slected');
    youreWrong();
  }
  if (questionNumber === STORE.length) {
    // $('#nextQuestionButton').val('Next');
    $('.nextQuestionButtonBox').hide();
    $('.finalNextButtonBox').show();
    $('#finalNextButton').show();
  }
  });
}


function handlePyramidQuiz() {
  console.log('***handlePyramidQuiz ran***');
  setInitialConditions();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestion();
  handleFinalNextButton();
  handleRestartQuiz();
}


//callback function
$(handlePyramidQuiz);
