class Questions {
    constructor(data) {
        this.originalData = data.slice(0);
        this.questionsList = data.slice(0);
        this.question;
        this.answers = [];
        this.correctLetter;
        this.index;

    }

    /**
     * Returns random question from QuestionsList;
     * If QuestionsList is empty, refresh with originalData.
     */
    getRandomQuestion() {
        this.index = this.getRandomInt(this.questionsList.length);
        this.question = this.questionsList[this.index][0];
        return this.question;
    }

    getAnswers() {
        this.answers=[];
        this.answers.push(this.questionsList[this.index][1])
        this.answers.push(this.questionsList[this.index][2])
        this.answers.push(this.questionsList[this.index][3])
        this.answers.push(this.questionsList[this.index][4])
        if (this.questionsList.length <= 1) {
            this.questionsList = this.originalData.slice(0);
        } else {
            this.questionsList.splice(this.index, 1);
        }
        return this.answers;
    }

    getCorrect() {
        return this.correctLetter;
    }

    setCorrect(letter) {
        this.correctLetter=letter;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


}