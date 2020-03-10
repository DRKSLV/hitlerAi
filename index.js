// Create the character level generator with a pre trained model
const rnn = ml5.charRNN('./models/input/', modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}


$(document).ready(function () {
    console.log("ready!");
    ready();
});


function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function ready() {
    // Generate content
    $("#generate").click((evt) => {
        $("#generate").prop("disabled", true);

        rnn.generate({ length: $("#length").val(), seed: $("#input").val() }, (err, results) => {
            console.log(results);
            $("#input").val((i, v) => v + results.sample);
            $("#generate").prop("disabled", false);
        });
    });

    // Predict
    $("#predict").click((evt) => {
        $("#predict").prop("disabled", true);
        
        rnn.predict(0.5, (err, results) => {
            console.log(results);
            $("#predict").prop("disabled", false);
        });
    });
}