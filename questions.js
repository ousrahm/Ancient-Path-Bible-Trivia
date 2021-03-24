class Questions {
    constructor(data) {

        this.questionObject = this.setUpOriginalData(data);
        this.permanentQuestionObject = this.setUpOriginalData(data);

        this.question;
        this.answers = [];
        this.correctLetter;
        this.index;
        this.stage;
        // Change this to 12 eventually
        this.stages = 4;
    }

    /**
     * Transforms data into a object of multiple 2D arrays for each stage.
     * @param {2D Array} data 
     * @returns {Object} questionObject
     */
    setUpOriginalData(data) {
        var questionObject = {"0":[], "1":[], "2":[], "3":[]};
        
        for (let i = 1; i < data.length; i++) {
            var stage = data[i][5];
            questionObject[stage].push(data[i]);
        }
        return questionObject;

    }

    /** 
     * Returns random question from QuestionsList;
     * If QuestionsList is empty, refresh with originalData.
     * @param {Number} stage
     */
    getRandomQuestion(stage) {
        this.stage = stage.toString();
        this.index = this.getRandomInt(this.questionObject[this.stage].length);

        this.question = this.questionObject[this.stage][this.index][0];
        return this.question;
    }

    getAnswers() {
        this.answers=[];
        this.answers.push(this.questionObject[this.stage][this.index][1])
        this.answers.push(this.questionObject[this.stage][this.index][2])
        this.answers.push(this.questionObject[this.stage][this.index][3])
        this.answers.push(this.questionObject[this.stage][this.index][4])
        if (this.questionObject[this.stage].length <= 1) {
            this.questionObject[this.stage] = this.permanentQuestionObject[this.stage];
        } else {
            this.questionObject[this.stage].splice(this.index, 1);
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