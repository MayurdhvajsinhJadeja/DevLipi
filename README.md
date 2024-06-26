# DevLipi

Introducing DevLipi – – a programming language in Sanskrit inspired syntax 🕉️. DevLipi is crafted with a backend powered by JavaScript, ensuring a robust foundation. It functions as a interpreted language, allowing step-by-step code execution. The development of DevLipi centers around three key components: Lexer, Parser, and Interpreter. These components work in harmony to process and execute the DevLipi code.

## Lexer:

- The Lexer is responsible for breaking down the code into meaningful units called tokens.
- Tokens are the building blocks that represent the fundamental elements of the code, such as keywords, identifiers, and operators.

## Parser:

- The Parser acts as an architect, creating a structured plan known as an Abstract Syntax Tree (AST).
- The AST represents the hierarchical structure of the code, capturing its syntax and semantics in a more organized manner.

## Interpreter:

- The Interpreter takes the AST and executes the plan, bringing the DevLipi code to life.
- It ensures the smooth functionality of the code, step by step, aligning with the principles of JavaScript.


## Installation

- Install it globally using command
`npm i -g devlipi`

## Usage

- The choice of a file extension for DevLipi code is .lipi, and to execute the code, one needs to navigate to the DevLipi folder and run the following command:
`aarambh <filename.lipi>`

## Example

```devlipi
kriya sankhya|b, c| => {  -> Function definition taking two parameters b and c <-
  @a = 1;  -> Initializing variable a with value 1 <-
  yavat(a<=10){  -> Looping until the value of a is less than or equal to 10 <-
    prakashan a;  -> Printing the current value of a <-
    a = a + b + c;  -> Adding b and c to the current value of a and assigning it back to a <-
  };  -> End of loop <-
  yadi(a<10){ -> Printing text if condition is fulfilled <-
    prakashan 'less than 10';
  } anyatha { -> Printing text if condition is not fulfilled <-
    prakashan 'more than or equal to 10';
  };
};  -> End of function definition <-

sankhya|1,2|; -> Calling Function <-
```
