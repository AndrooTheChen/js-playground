## Context
This small rabbit hole spawned from me getting annoyed from RealPython forcing me to try and
register to view their page [0]. Instead of registering in 30 seconds, I figured I wanted to waste
15 minutes figuring out how to get around this modal instead.

## Disabling the Modal
Right-clicking the actual modal itself I found that the class name was `modal-content`. From here
I just got the element from the DOM and for each `div` inside just set the `.style.display` to `none`:
```
let popup = document.getElementsByClassName("modal-content"); // returned HTMLCollection(4)
for (let i = 0; i < popup.length; i++) {
  popup[i].style.display = 'none';
}
```

## Allowing Scrolling again
Luckily this was a simple one-liner
```
document.body.style.overflow = 'auto';
```

## Deleting the backdrop fade
This was a little less straightforward for me to find. There were mulitple `modal-fade` classes, but
the only one that seemed to matter was:
```
class="modal-backdrop fade show __web-inspector-hide-shortcut__"
```

I ended up not even deleting this but instead just right-clicking and Hiding the element. I probably
could have just done this for all of the elements instead of writing code (except perhaps the 
scrolling part?)

[0] https://realpython.com/primer-on-python-decorators/