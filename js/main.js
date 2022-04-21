//first task
import Quantities from './firstTask/Quantities.js';
import Converter from './firstTask/Converter.js';
import ConverterUpper from './firstTask/ConverterUpper.js';

const unit = document.getElementById('unit'),
    convert_to = document.getElementById('convert_to'),
    number_unit = document.getElementById('number');

number_unit.onkeydown = (event) => {
    return (event.key >= '0' && event.key <= '9') || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Delete' || event.key == 'Backspace' || event.key == '.';
}
let first_form = document.getElementById("first_form");
first_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries());
    let pushEntries = new Quantities(data.unit, data.value, data.convert_to);
    let JSON_form = pushEntries.getJSON();
    let converter = new Converter(JSON_form);

    let result = converter.converting();
    if (typeof result == typeof {}) {
        let converterUpper = new ConverterUpper(JSON.stringify(result));
        let str = converterUpper.converting();
        str = JSON.parse(str);
        document.querySelector('.out-1').textContent = `Your result ${str.value}${str.unit}`;
    } else {
        result = JSON.parse(result);
        document.querySelector('.out-1').textContent = `Your result ${result.value}${result.unit}`;
    }
});


function adderElements(el, text) {
    let above_option = document.createElement("option");
    above_option.setAttribute("value", el);
    above_option.textContent = text;
    document.getElementById(el).remove();
    let option_clone = above_option.cloneNode(true);
    unit.append(above_option);
    convert_to.append(option_clone);
}

let add_value = document.getElementById("add_value");
add_value.onclick = () => {
    let option = document.getElementById('add_to');

    if (option.value == "mm") {
        adderElements(option.value, "millimeters");
    } else if (option.value == "yd") {
        adderElements(option.value, "yards");
    } else if (option.value == "km") {
        adderElements(option.value, "kilometers");
    }
}

//second Task