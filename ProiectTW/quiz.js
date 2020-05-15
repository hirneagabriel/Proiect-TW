var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var coll = document.getElementsByClassName("collapsible-btn")[0]
var deleteButton = document.createElement("button")
    deleteButton.appendChild(document.createTextNode("Delete question"))
    deleteButton.classList.add('btn')

coll.addEventListener('click', () => {
   
    coll.classList.toggle('active')
    var content = coll.nextElementSibling
    if(content.style.display === 'block'){
        content.style.display = 'none'
        deleteButton.remove()
    }else{
        content.style.display = 'block'
        content.appendChild(deleteButton)
        deleteButton.addEventListener('click', deleteQuestion)

    }
})



startButton.addEventListener('click', getQuestions)
nextButton.addEventListener('click', () => {
    curentQuestionI++
    setNextQuestion()
})

function getQuestions() {
    fetch('http://localhost:30000/quiz', {
        method: 'get'
    }).then((response) => {
        response.json().then((data) => {
            
            var questions = data
            startGame(questions)
          

        })
    })
}


function addQuestion(){
    var question = document.getElementById("input-question").value;
    var answers =[]
    for(let i=0;i<4;i++)
    {   
        var correct
        var text = document.getElementsByClassName("input-answers")[i].value;
        
        if(document.getElementsByClassName("answer-true")[i].checked)
        { 
          correct = true  
        }
        else {
            correct = false
        }
        var answer ={
            text:text,
            correct:correct
        }
        answers.push(answer)
        
    }
    var newQuestion = {
        question: question,
        answers: answers
    }
    fetch('http://localhost:30000/quiz', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
    }).then(function(response) {
        window.location.reload()
    })

}

function deleteQuestion() {
    var id = document.getElementById("delete-id").value;
    fetch('http://localhost:30000/quiz/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        window.location.reload();
    })
}

function updateQuestion() {
    var id = document.getElementById("input-id").value;
    var question = document.getElementById("input-update-question").value;
    var answers =[]
    for(let i=0;i<4;i++)
    {   
        var correct
        var text = document.getElementsByClassName("input-update-answers")[i].value;
        
        if(document.getElementsByClassName("answer-update-true")[i].checked)
        { 
          correct = true  
        }
        else {
            correct = false
        }
        var answer ={
            text:text,
            correct:correct
        }
        answers.push(answer)
        
    }
    
    var newQuestion = {
        question: question,
        answers: answers
    }

    console.log(newQuestion, id)

    fetch('http://localhost:30000/quiz/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
    }).then(function(response) {
        window.location.reload();
    })
}



var Questions, curentQuestionI


function startGame(questions) {

    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    Questions = questions
    curentQuestionI = 0
    setNextQuestion()
}

function setNextQuestion() {
    resetState()


    showQuestion(Questions[curentQuestionI])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)

    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)

    })

    if (Questions.length > curentQuestionI + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}