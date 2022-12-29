Day 1
Starter html file has key mappings already, these keymappings are defined as a standard and can be seen in browser with the tool keycode.info

Looking at this again I need to brush up on HTML because I don’t understand what half this stuff is.

So each “element” in HTML is just whatever is surrounded by tags, and there are different tags that can contain different types of elements. Quote from w3schools [0]:

> The HTML element is everything from the start tag to the end tag

There is a page of basic examples [1] where there are a lot of common uses around the web.

Some other useful info surrounding HTML elements [2].

Javascript lets us modify the HTML stuff dynamically, here’s a quick example [3].
The `document.getElementById(<element>)` gets the actual element while the method innerHTML says we want to mutate the actual HTML content.

Data-key isn’t exactly a standard attribute used but is an attribute in our div elements that we use to store data for the element, see [4]. Apparently `data-*` elements are special in that they are “global attributes”. It allows us to store custom data to the private to the page or application. This custom data can then be mutated by Javascript.

Global attributes are simply just attributes that can be used for ALL HTML elements [5]. Somewhat like default traits that are implemented by every HTML element I think?

`<script>` tag unsurprisingly lets us run JS in browser, but the MDN documentation surrounding this led me into a rabbithole of reading some other stuff. Overall pretty good stuff [6].

Some really dope examples for 2D stuff [7] and 3D [8] stuff in WebGL.

Tutorial from MDN for getting started with Node/Express [9].

Intro to DOM [10].

```
Added a key listener with this snippet of code:
window.addEventListener('keydown', function (e) {
    console.log(e);
  });
```

We have a global variable window to get information for the currently open window and also add listeners/manipulate it. Each tab has its own independent window global var [11].

Transitions are defined as classes in CSS. The styling seems to be declarative where we have the base state of the key image and the active state. There is a `transition` field that lets us define the duration of the transition, but the transition happens by adding the desired “next state” class onto the original class. In our case, we added the `playing` class to the `keys` class in our event listener.

```
key.classList.add('playing');
```

There are different mutators other than just `add()` such as `remove()` or `toggle()`.

Overall from this exercise learned about key events, transitions on events or event follow-ups, and also playing audio in-browser.

[0] https://www.w3schools.com/html/html_elements.asp 

[1] https://www.w3schools.com/html/html_basic.asp 

[2] https://www.w3schools.com/html/html_elements.asp 

[3] https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_inner_html 

[4] https://www.w3schools.com/tags/att_data-.asp 

[5] https://www.w3schools.com/tags/ref_standardattributes.asp 

[6] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script 

[7] https://experiments.withgoogle.com/collection/chrome

[8] https://webglsamples.org/ 

[9] https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs 

[10] https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction 

[11] https://developer.mozilla.org/en-US/docs/Web/API/Window 
