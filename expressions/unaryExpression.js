export default class UnaryExpression {
  constructor(op, expression1) {
    this.op = op;
    this.expression1 = expression1;
  }

  eval() {
    if(this.op === "+") {
      return this.expression1.eval();
    } else if(this.op === "-") {
      return -1*this.expression1.eval();
    }
  }
}