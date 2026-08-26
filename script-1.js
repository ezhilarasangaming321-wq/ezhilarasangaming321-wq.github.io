document.addEventListener('DOMContentLoaded', () => {

    const leftString = document.getElementById('string-left');
    const rightString = document.getElementById('string-right');
    const body = document.body;

    // 1. Left Lamp Toggle -> Dark Green Theme
    leftString.addEventListener('click', () => {
        leftString.classList.add('pull');
        setTimeout(() => leftString.classList.remove('pull'), 200);

        if (body.classList.contains('green-theme')) {
            // ஏற்கனவே Green எரியும்போது கிளிக் செய்தால் Off ஆகும்
            body.className = 'light-off';
        } else {
            // Green Theme-க்கு மாறும்
            body.className = 'green-theme';
        }
    });

    // 2. Right Lamp Toggle -> Dark Red Theme
    rightString.addEventListener('click', () => {
        rightString.classList.add('pull');
        setTimeout(() => rightString.classList.remove('pull'), 200);

        if (body.classList.contains('red-theme')) {
            // ஏற்கனவே Red எரியும்போது கிளிக் செய்தால் Off ஆகும்
            body.className = 'light-off';
        } else {
            // Red Theme-க்கு மாறும்
            body.className = 'red-theme';
        }
    });

    // Profile & Buttons Click Event

    console.log("Left Lamp (Green) & Right Lamp (Red) Dual Theme Enabled!");
});