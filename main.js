const quizData = [
  {
    question: '1.Which of the following is the correct way to declare an array in Java?',
    options: ['int[] arr = new int[5];',
               'int arr=new int[5];', 
	       'int arr[5];', 
	       'array[] arr=new int[5];'],
    answer: 'int[] arr = new int[5];',
  },
  {
    question: '2.Which keyword is used to prevent inheritance in Java?',
    options: ['super', 'final', 'static', 'private'],
    answer: 'final',
  },
  {
    question: `3.What is the output of the following code? 
    public class Test {
      public static void main(String[] args) {
        int a = 5;
        int b = 10;
        System.out.println(a + b);
      }
    }`,
    options: ['15', '510', 'Compilation Error', 'Runtime Error'],
    answer: '15',
  },
  {
    question: '4.Which of the following is the correct way to create an object of a class in Java?',
    options: ['MyClass obj = new MyClass();', 
   'MyClass obj = MyClass();', 'MyClass obj();', 'obj = new MyClass();'],
    answer: 'MyClass obj = new MyClass();',
  },
  {
    question: '5.Which of these access modifiers can be used for the members of a class but not for the class itself?',
    options: ['public', 'protected', 'private', 'abstract'],
    answer: 'private',
  },
  {
    question: `6.What will be the output of the following code? 
    class Test {
      public static void main(String[] args) {
        int x = 10;
        System.out.println(++x);
      }
    }`,
    options: ['9', '10', '11', 'Compilation Error'],
    answer: '11',
  },
  {
    question: '7.Which of the following loops is guaranteed to execute at least once?',
    options: ['for loop', 'while loop', 'do-while loop', 'All of the above'],
    answer: 'do-while loop',
  },
  {
    question: '8.What is the default value of a local variable in Java?',
    options: ['null', '0', 'Garbage Value', 'No default Value'],
    answer: 'No default Value',
  },
  {
    question: '9.Which of the following is used to handle exceptions in Java?',
    options: ['try-catch', 'if-else', 'switch-case', 'for-loop'],
    answer: 'try-catch',
  },
  {
  question: '10.Which method is used to start a thread in Java?',
  options: ['run()', 'start()', 'execute()', 'begin()'],
  answer: 'start()',
}

];

// Same JavaScript functions to handle the quiz behavior follow here...


const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();