//import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

//read all

app.get("/quiz", (req, res) => {
    const quizList = readJSONFile();
    if (quizList != undefined) {
        res.status(200).send(quizList);
    } else {
        res.status(404).send("No question found");
    }
});

//add question
app.post("/quiz", (req, res) => {
    const quizList = readJSONFile();
    var newQuestion = {
        id : uuid.v4.apply(),
        question: req.body.question,
        answers: req.body.answers
    }
    quizList.push(newQuestion);
    writeJSONFile(quizList);
    res.status(200).send(newQuestion);
   
});

app.put("/quiz/:id", (req, res) => {
    var id = req.params.id;
    var checkIfQuestionExist = false;
    const quizList = readJSONFile();
    for(let i = 0; i < quizList.length; i++) {
        if(quizList[i].id === id) {
            quizList[i].question = req.body.question;
            quizList[i].answers = req.body.answers;
            checkIfQuestionExist  = true;
            break;
        }
    }

    if(checkIfQuestionExist  === true) {
        
        writeJSONFile(quizList);
        res.status(200).send("Updated Question");
    } else {
        res.status(404).send("Question not found!");
    }
});

app.delete("/quiz/:id", (req, res) => {
    const quizList = readJSONFile();
    var id = req.params.id;
    var checkIfQuestionExist = false;
    for(let i = 0; i < quizList.length; i++) {
        if(quizList[i].id === id) {
            checkIfQuestionExist = true;
            quizList.splice(i, 1); 
            break;
        }
    }
  
    if(checkIfQuestionExist === true) {
      writeJSONFile(quizList);
      res.status(200).send("Question deleted!");
  } else {
      res.status(404).send("Question not find!");
  }
  
  });

function readJSONFile() {
    return JSON.parse(fs.readFileSync("quiz.json"))["quiz"];
}

function writeJSONFile(content) {
    fs.writeFileSync(
        "quiz.json",
        JSON.stringify({
            quiz: content
        }, null, 4),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

app.listen("30000", () =>
    console.log("Server started at: http://localhost:30000")
);