window.addEventListener("clipboard", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    console.log("AAA");
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});

console.log("a")