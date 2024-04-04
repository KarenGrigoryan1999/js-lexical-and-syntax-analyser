export default class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  eval() {
    return parseFloat(this.value);
  }
}