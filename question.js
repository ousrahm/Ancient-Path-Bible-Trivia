class Question {
    constructor(question, correct, incorrect1, incorrect2, incorrect3) {
        this.question = question;
        this.correct = correct;
        this.incorrect1 = incorrect1;
        this.incorrect2 = incorrect2;
        this.incorrect3 = incorrect3;
    }

    getQuestion() {
        return this.question;
    }

    getCorrect() {
        return this.correct;
    }
    
    getIncorrects() {
        let incorrects = [this.incorrect1, this.incorrect2, this.incorrect3];
        return incorrects;
    }

    changeQuestion(question, correct, incorrect1, incorrect2, incorrect3) {
        this.question = question;
        this.correct = correct;
        this.incorrect1 = incorrect1;
        this.incorrect2 = incorrect2;
        this.incorrect3 = incorrect3;
    }
}