export default class BinaryExpression {
  constructor(op, expression1, expression2) {
    this.op = op;
    this.expression1 = expression1;
    this.expression2 = expression2;
  }

  eval() {
    if(this.op === "+") {
      return this.expression1.eval() + this.expression2.eval();
    } else if(this.op === "-") {
      return this.expression1.eval() - this.expression2.eval();
    } else if(this.op === "*") {
      return this.expression1.eval() * this.expression2.eval();
    } else if(this.op === "/") {
      return this.expression1.eval() / this.expression2.eval();
    }
  }
}