A simple HTML CSS and Javascript calculator.

Initially, this used the eval() function to complete the equation. However, as that was insecure I've written a Shunting Yard algorithm to convert the infix equation to postfix notation. It then walks through the postfix array of operands and operators and calculates the result, placing that result in the screen.

There are a couple of shortcuts I took. First, I added a space in the value of the buttons which allowed me to split the equation string by spaces rather than needing to walk an array and build the numbers/floats etc. Secondly, I deliberately opted for a simple calculator without parentheses as that made it a little simpler to build.

The Javascript in particular could use a little cleaning up. At some point I plan on writing a little extra Javascript that will allow me to create an empty HTML div container element that the Javascript then populates with the calculator itself.
