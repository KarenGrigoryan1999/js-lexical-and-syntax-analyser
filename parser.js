import BinaryExpression from "./expressions/binaryExpression.js";
import NumberExpression from "./expressions/numberExpression.js";
import UnaryExpression from "./expressions/unaryExpression.js";

export default class Parser {
  tokenList;
  position = 0;

  constructor(tokenList) {
    this.tokenList = tokenList;
    this.tokenList.push({type: "EOF", value: null});
  }

  parse() {
    return this.evaluateExpression();
  }

  evaluateExpression() {
    return this.evaluateAdditive();
  }

  evaluateAdditive() {
    let result = this.evaluateMultiplicative();

    while (true) {
      if (this.match("PLUS")) {
        result = new BinaryExpression('+', result, this.evaluateMultiplicative());
        continue;
      }
      if (this.match("MINUS")) {
        result = new BinaryExpression('-', result, this.evaluateMultiplicative());
        continue;
      }
      break;
    }
  
    return result;
  }

  evaluateMultiplicative() {
    let result = this.evaluateUnary();

    while (true) {
      if (this.match("STAR")) {
        result = new BinaryExpression('*', result, this.evaluateUnary());
        continue;
      }
      if (this.match("DIV")) {
        result = new BinaryExpression('/', result, this.evaluateUnary());
        continue;
      }
      break;
    }
  
    return result;
  }

  evaluateUnary() {
    if(this.match('MINUS')) {
      return new UnaryExpression('-', this.evaluatePrimary());
    } else if(this.match('PLUS')) {
      return new UnaryExpression('+', this.evaluatePrimary());
    }

    return this.evaluatePrimary();
  }

  evaluatePrimary() {
    const current = this.get(0);
    if(this.match('NUMBER')) {
      return new NumberExpression(current.value);
    }
    else if(this.match('L_BRACKET')) {
      const result = this.evaluateExpression();
      if(this.match("R_BRACKET")) return result;
    }
    
    throw 'Uncaught token expression';
  }

  match(tokenType) {
    if(this.tokenList[this.position].type === tokenType) {
      this.position++;
      return true;
    }
    return false;
  }

  get(offset) {
    return this.tokenList[this.position + offset];
  }
}