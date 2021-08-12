// animation globals
const starting_value = 0;          // Counter start value.
window.counter_total = 167408645;  // Counter end value.
window.increment_max = 9123456;    // Counter MAX increment
window.change_rate_ms = 50;        // Counter MAX change rate (in ms)

// Find text element on the HTML page
span = $("#counter");
// Set text to the starting value.
span.text(starting_value);

counter_value = parseInt(span.text().trim());

// Start animation
updateText(span, counter_value);

// Function that runs the animation
function updateText(el, current_value) {
    // We scale both the increment value and the rate of change based on
    // the fraction of the animation that is completed. In other words, 
    // this is slower at the start and speeds up to the end.
    fraction_completed = 1 - (current_value / window.counter_total);
    timer = Math.ceil(window.change_rate_ms * fraction_completed)
    increment = 1 + Math.ceil(window.increment_max * fraction_completed)

    setTimeout(function() {
        new_value = current_value + increment;

        // Clamp to max value to make sure final value is exact.
        if (new_value > window.counter_total) {
            new_value = window.counter_total;
        }
        // Update text on page.
        el.text(new_value);

        // If we haven't reached the end, schedule a new frame of the animation.
        if (new_value < window.counter_total) {
            updateText(el, new_value);
        }
    }, timer);
}