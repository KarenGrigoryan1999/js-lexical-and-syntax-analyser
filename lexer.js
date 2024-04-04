export default class Lexer {
  tokenList = [];
  buffer = "";
  position = 0;

  constructor(formula) {
    this.formula = formula;
  }

  tokenize() {
    for (this.position = 0; this.position < this.formula.length; this.position++) {
      if (!isNaN(parseInt(this.formula[this.position]))) {
        this.tokenizeNumber();
      } else if (this.formula[this.position] == "+") {
        this.tokenizePlus();
      } else if (this.formula[this.position] == "-") {
        this.tokenizeMinus();
      } else if (this.formula[this.position] == "*") {
        this.tokenizeStar();
      } else if (this.formula[this.position] == "/") {
        this.tokenizeDiv();
      } else if(this.formula[this.position] == '(') {
        this.tokenizeLeftBracket();
      } else if(this.formula[this.position] == ')') {
        this.tokenizeRightBracket();
      } else if(this.formula[this.position] == ' ') {
        continue;
      } else {
        throw `Unexpected token ${this.formula[this.position]}`;
      }
    }

    return this.tokenList;
  }

  tokenizeNumber() {
    while (!isNaN(parseInt(this.formula[this.position]))) {
      this.buffer += this.formula[this.position];
      this.position++;
    }

    this.position--;

    this.tokenList.push({
      value: this.buffer,
      type: "NUMBER"
    });
    this.buffer = "";
  }

  tokenizeLeftBracket() {
    this.tokenList.push({
      value: null,
      type: "L_BRACKET"
    });
  }

  tokenizeRightBracket() {
    this.tokenList.push({
      value: null,
      type: "R_BRACKET"
    });
  }

  tokenizePlus() {
    this.tokenList.push({
      value: null,
      type: "PLUS"
    });
  }

  tokenizeMinus() {
    this.tokenList.push({
      value: null,
      type: "MINUS"
    });
  }

  tokenizeStar() {
    this.tokenList.push({
      value: null,
      type: "STAR"
    });
  }

  tokenizeDiv() {
    this.tokenList.push({
      value: null,
      type: "DIV"
    });
  }
}