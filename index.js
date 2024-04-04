import Lexer from "./lexer.js";
import Parser from "./parser.js";

const formula = "(2 + 22) * 2 / 24";

try {
  const MyLexer = new Lexer(formula);
  const tokens = MyLexer.tokenize();
  const MyParser = new Parser(tokens);
  const expressions = MyParser.parse();

  console.log("Наши токены:", tokens);
  console.log("Наше AST:", expressions);

  const result = expressions.eval();
  console.log("Результат:", result);
} catch(error) {
  console.error(error);
}