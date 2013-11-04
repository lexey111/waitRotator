/**
 *
 * Wait rotator example page JS
 *
 */
// items
var example = document.getElementById('example-item');
var layout_example = document.getElementById('example-layout-container');
// sizes
var sizes = document.getElementsByName('rotator-size');
// slices
var slices = document.getElementsByName('rotator-slices');
// parts
var parts = document.getElementsByName('rotator-borders');
// speeds
var speed = document.getElementsByName('rotator-speed');
// thickness
var thick = document.getElementsByName('rotator-thick');
// colors
var colors = document.getElementsByName('rotator-color');
// styles
var styles = document.getElementsByName('rotator-style');
// shapes
var shapes = document.getElementsByName('rotator-shape');

/**
 * Collect class names from values of radiobuttons
 * @param inputs
 * @returns {string}
 * @private
 */
function _getRadioValue(inputs) {
    var i, s = '';
    for (i = 0; i < inputs.length; ++i) {
        if (inputs[i].checked) {
            if (inputs[i].value != '') {
                s += ' ' + inputs[i].value;
            }
            break;
        }
    }
    return s;
}

/**
 * Build list of classes for example circle
 */
function rebuildClassList() {
    var s = 'wait-rotator-circle'; // base class

    s += _getRadioValue(sizes);
    s += _getRadioValue(slices);
    s += _getRadioValue(parts);
    s += _getRadioValue(speed);
    s += _getRadioValue(thick);
    s += _getRadioValue(colors);
    s += _getRadioValue(styles);
    s += _getRadioValue(shapes);

    example.className = '';
    example.offsetWidth = example.offsetWidth; // reflow magic
    var classes = s.split(' ');
    var t = '';
    for (var i = 0; i < classes.length; i++) {
        if (t != '') t += ' ';
        t += '<span>' + classes[i] + '</span>';
    }

    layout_example.innerHTML = '&lt;div class="' + t + '"&gt;&lt;/div&gt;';

    example.className = s;
    example.offsetWidth = example.offsetWidth;
}

/**
 * Show fullscreen wait layer
 * @param {Number} duration in ms - optional
 */
var wait_layer = document.getElementById("wait-rotator-fullscreen");
var wait_timer;
function showWait(duration) {
    // show the wait layer
    wait_layer.style.display = 'block';
    wait_layer.style.opacity = 1;

    // start new countdown if any
    clearTimeout(wait_timer);

    // check is wait duration set at all...
    if ((typeof duration != 'undefined') && (!isNaN(parseInt(duration)) && isFinite(duration))) {
        // yes - well, let's start countdown timer
        wait_timer = setTimeout(function () {
            hideWait();
        }, duration);
    }
}
/**
 * Hide wait layer (fadeOut)
 */
function hideWait() {
    wait_layer.style.opacity = 1;
    (function fade() {
        if ((wait_layer.style.opacity -= .2) <= .2) {
            wait_layer.style.display = 'none';
        } else {
            setTimeout(fade, 40);
        }
    })();
}

/**
 * When user press space or return while label (radiobutton in this example) is focused
 * @param e
 * @param label
 * @returns {boolean}
 */
function labelClickByKeyboard(e, label){
    // if return or spacebar...
    if ((e.which == 32) || (e.which == 13)){
        if (label.htmlFor != '') {
            // find the input[radio] assotiated with this label and click it
            var elem = document.getElementById(label.htmlFor);
            if (elem) {
                elem.click();
            }
        }
        e.cancelBubble = true;
        e.stopPropagation();
        return false;
    }
    return true;
}

function init() {
    // assign events to radiobuttons
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; ++i) {
        inputs[i].onclick = function () {
            var s = this.value;
            if (s.indexOf('slice') != -1) {
                parts[0].checked = true;
            }
            if (s.indexOf('part') != -1) {
                slices[0].checked = true;
            }
            rebuildClassList();
            return true;
        }
    }
    // build classes for the first time
    rebuildClassList();

    // assign keyboard events for labels (click on space or enter)
    var labels = document.getElementsByTagName('label');
    for (i = 0; i < labels.length; ++i) {
        labels[i].onkeyup = function(e){
            labelClickByKeyboard(e, this);
        };
    }

    // assign call for full-screen wait layer (5 second)
    // when user click on the demo link
    document.getElementById('fullscreen-wait').onclick = function (e) {
        e.preventDefault();
        showWait(5000);
        return false;
    };
}

init();