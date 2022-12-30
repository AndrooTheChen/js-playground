## Day 2
Some interesting/fun CSS properties to play around with:
    - `transform: rotate(90deg);` - rotate an object by degrees
    - `transform-origin: 100%;` - move the axis of rotation (0% is the centre)

These are fields that can be set in the CSS and even in the CSS properties for random stuff 
in the browser when inspecting element. Neat :3

The assignment here is building a dynamic clock that doesn't require any user input of any 
sort of event listener we just need to update the page at specific intervals (in our case this
time each second). For that we use `setInterval(func, delay)` [0] which, as the name implies,
calls the given function at every delay interavl (note that delay is in milliseconds).

So TIL HTML elements can have (theoretically) unlimited classes, they're just appended and 
delimieted by spaces [1][2]. 

Also going back to how we get elements from the DOM in JS, we use methods like `querySelector`
or `getElementById()` and they all return an `Element` object [3].

This `Element` object can have its CSS modified via the `.style` ~~accessor method~~ property [4].

[0] https://developer.mozilla.org/en-US/docs/Web/API/setInterval

[1] https://sebhastian.com/html-multiple-classes/#:~:text=There%20is%20no%20limit%20to,to%20keep%20your%20project%20maintainable

[2] https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto/CSS_FAQ#how_do_i_assign_multiple_classes_to_an_element

[3] https://developer.mozilla.org/en-US/docs/Web/API/Element

[4] https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style