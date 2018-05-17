/* ########         -CL Library-          ######## */
/* ########  Author: Christian Halvorsen  ######## */
/* ########        @ChristianHal98        ######## */

(function (window) {
    'use strict';

    // Function contains the library
    function christian_library() {
        // Creates the library object
        let lib = {};
        // Semantic Versioning - MAJOR.MINOR.PATCH-(alpha/beta)
        let version = '0.19.0-alpha';

        /* Library functions */

        // test function to check if library is successfully loaded
        lib.test = () => {
            console.log(`Christians_Library v${version} successfully loaded`);
        }

        // Generates a random number between the floor number and the upper number (min/max respectivly)
        lib.generateRandom = (floor, upper) => {
            return Math.floor(Math.random() * upper) + floor;
        }

        // Selects an element and returns it using querySelector
        lib.select = (element) => {
            return document.querySelector(element);
        }

        // Selects multiple elements and returns an array using querySelectorAll
        lib.selectAll = (element) => {
            return document.querySelectorAll(element);
        }

        // Prints a string to the selected element
        lib.print = (targetElementID, content) => {
            const outputElement = document.querySelector(targetElementID);
            // adds to the html element
            outputElement.innerHTML += content;
        }

        // Clears the innerHTML of an element
        lib.clearPrint = (targetElementID) => {
            const element = document.querySelector(targetElementID);
            element.innerHTML = '';
        }

        // creates a table element out of a two dimentional array
        lib.createTable = (newTableID, table, firstRowTitle, firstCellTitle) => {
            // Checks if the cellContent is a object
            if (typeof table === 'object') {
                const table = document.createElement('table');
                table.id = newTableID;
                const tableBody = document.createElement('tbody');
                const tableHead = document.createElement('thead');
                // Creates empty elements outside the loop to speed up the llop.
                let tr;
                let th;
                let thChild;
                let td;
                let tdChild;
                // The first row is 0
                let row = 0;

                // If the first row in the array is title, add th instead of td
                if (firstRowTitle) {
                    tr = document.createElement('tr');
                    for (let i = 0; i < table[0].length; i++) {
                        th = document.createElement('th');
                        tdChild = document.createTextNode(table[0][i]);
                        th.appendChild(tdChild);
                        tr.appendChild(th);
                    }
                    tableHead.appendChild(tr);
                    table.appendChild(tableHead);
                    // The first row is 1;
                    row = 1;
                }
                // add the table rows
                for (row; row < table.length; row++) {
                    tr = document.createElement('tr');
                    // add the cells in the rows
                    for (let cell = 0; cell < table[row].length; cell++) {
                        // If the first cell should be title
                        if (firstCellTitle && cell === 0) {
                            th = document.createElement('th');
                            thChild = document.createTextNode(table[row][cell]);
                            // Appends the table content to the table row
                            th.appendChild(thChild);
                            tr.appendChild(th);
                        } else {
                            td = document.createElement('td');
                            tdChild = document.createTextNode(table[row][cell]);
                            // Appends the table content ot the table row
                            td.appendChild(tdChild)
                            tr.appendChild(td);
                        }
                    }
                    // Appends the table row to the table's body
                    tableBody.appendChild(tr);
                }
                // Appends the table body to the table
                table.appendChild(tableBody);
                // returns the table
                return table;
            }
            // If the cellContent is not an object, throw and error.
            else {
                throw new Error('CL error: arr parameter at createTable() is not an array or object');
            }
        }

        // creates an HTML element ( h1, h2, p, etc.);
        lib.createTextElement = (elementToCreate, classOfNewElement, text) => {
            const element = document.createElement(elementToCreate);
            const txt = document.createTextNode(text);
            element.class = classOfNewElement;
            element.appendChild(txt);
            return element;
        }

        // Gets the form, adds an event listener for 'submit'. Also prevents default
        lib.form = (targetElementID, callback) => {
            // checks if the id is a string
            if (typeof targetElementID != 'string') {
                throw new Error('CL error: id parameter at form() is not a string.');
            }
            // checks if the user have passed in a function or not
            if (callback === undefined || callback === null) {
                throw new Error('CL error: func parameter at form() is undefined')
            }
            const form = document.querySelector(targetElementID);
            form.addEventListener('submit', function (evt) {
                evt.preventDefault();
                callback();
            });

        }

        // gets the value from a selected input element
        lib.getInput = (targetElementID) => {
            const input = document.querySelector(targetElementID);
            if (input.nodeName != 'INPUT') {
                throw new Error('CL Error: target element at getInput is not an input element.');
            }
            return input.value;
        }

        // same as getInput, but parses it into a number(float/integer)
        lib.getInputNumber = (targetElementID) => {
            const input = document.querySelector(targetElementID);
            if (input.nodeName != 'INPUT') {
                throw new Error('CL Error: target element at getInput is not an input element.');
            }
            return Number(input.value);
        }

        // Checks if an input element is checked, and returns a true/false
        lib.isChecked = (targetElementID) => {
            const checkbox = document.querySelector(targetElementID);
            // checks if input is of type checkbox or radio
            if (checkbox.type === 'radio' || checkbox.type === 'checkbox') {
                return checkbox.checked;
            } else {
                throw new Error(`CL error: id parameter of isChecked() is not radio/checbox input. input id=${targetElementID} is type:${checkbox.type}`);
            }
        }

        // ads <option> elements to a select element with a one dimentional array.
        lib.addSelectOption = (targetElementID, array) => {
            const select = document.querySelector(targetElementID);
            let option;
            let textNode;
            // checks if the targetted html element is a 'SELECT' element or not
            if (select.nodeName != 'SELECT') {
                throw new TypeError(`CL error: target element on addSelectOptions is not a select (html)element.`)
            }
            // checks if the passed arr parameter is an object or not
            if (typeof array != 'object') {
                throw new TypeError(`CL error: arr parameter is not an array at addSelectoptions()`);
            }
            // for each option in the array, add it to the select html element
            array.forEach((opt) => {
                option = document.createElement('option');
                textNode = document.createTextNode(opt);
                option.value = '';
                option.name = opt;
                option.appendChild(textNode);
                select.appendChild(option);
            });
        }

        // gets the selected index from the select list and returns it
        lib.getSelectOption = (targetElementID) => {
            const select = document.querySelector(targetElementID);
            return parseInt(select.selectedIndex);
        }

        // Gets the name of the selected option
        lib.getSelectOptionName = (targetElementID) => {
            const select = document.querySelector(targetElementID);
            // generates an array of all the options in the select list
            const selectedOption = document.querySelectorAll(targetElementID + ' option');
            // find out which option is currently selected
            const selected = selectedOption[parseInt(select.selectedIndex)];
            // returns the name property of that option tag
            return selected.name;
        }

        // Summarizes an array of numbers
        lib.summarize = (array) => {
            // checks if the arr parameter is an object or not
            if (typeof array != 'object') {
                throw new Error('CL Error: arr parameter at summarize() is not an array.');
            }
            let sum = 0;
            for (let i = 0; i < array.length; i++) {
                // checks if the current index in the array is a number or not
                if (typeof array[i] != 'number') {
                    throw new Error(`CL Error: '${array[i]}' is not a number in the array[${i}] given to the CL.summarize(arr) function`);
                }
                sum += array[i];
            }
            return sum;
        }

        // sets the source of an element
        lib.setSource = (targetElementID, source) => {
            const element = document.querySelector(targetElementID);
            element.src = source;
        }

        // adds a source tag to a parent video/audio element
        lib.addSource = (targetElementID, source, format) => {
            const element = document.querySelector(targetElementID);
            const src = document.createElement('source');
            // Checks if the target HTML element is not an audio or video tag.
            if (element.nodeName != 'AUDIO' || element.nodeName != 'VIDEO') {
                throw new Error('CL Error: target element at addSource() is not an audio or video tag');
            }
            // Checks what format the source is in (audio/video)
            if (element.nodeName === 'AUDIO') {
                format = `audio/${format}`;
            } else if (element.nodeName === 'VIDEO') {
                format = `video/${format}`;
            }
            source.src = source;
            source.type = format;
            element.appendChild(source);
        }
        // Rotates an image 360 degrees
        lib.rotateImage360 = (targetElementID, speed, callback) => {
            const targetElement = document.querySelector(targetElementID);
            let degree = 0;
            // stops the setInterval
            const clearInterval = () => {
                clearTimeout(rotate);
            }
            // rotates the image 360 degress
            const rotate = setInterval(() => {
                targetElement.style.transform = `rotate(${degree}deg)`;
                degree++;
                if (degree >= 360) {
                    targetElement.style.transform = `rotate(360deg)`;
                    clearInterval();
                    callback();
                }
            }, speed);
        }

        // Returns the library object
        return lib;
    }


    // Makes the library globally accesible
    if (typeof (window.CL) === 'undefined') {
        window.CL = christian_library();
    }
})(window);
