// the link to your model provided by Teachable Machine export panel
const URL = `tm-my-image-model/`;

let model, webcam, maxPredictions, circle, sad, rectangle;
let image = document.querySelector("#hi");
let stBtn = document.querySelector(".start-now");
let predBtn = document.querySelector(".predee");
let refresh = true;
init();

// Load the image model 
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    if (refresh) {
        refresh = false;

    }
    else {
        location.reload();
    }

}


function loadDrawing() {
    image.src = canvas.toDataURL();
    // console.log(image);
    image.style.width = "200px";
    image.style.height = "200px";
    // console.log("from image function");
}

async function predict() {
    // predict can take in an image, video or canvas html element

    const prediction = await model.predict(image);
    for (let i = 0; i < maxPredictions; i++) {
        // console.log(prediction[i].className);
        // console.log(prediction[i].probability);
        if (rand === i) {
            if (prediction[rand].probability > 0.5) {
                predictionResult(`great! You Draw The Correct Shape`)
            }
            else {
                predictionResult(`Bad`)
            }
        }

    }
}
function executionPred() {
    loadDrawing();
    window.setTimeout(predict, 0);
}

predBtn.onclick = () => {

    executionPred();
}
function circleChoice(el) {

    el.addEventListener("click", () => {

        afterChoose();
        predBtn.onclick = () => {

            executionPred();
        }
    });
}
function rectangleChoice(el) {

    el.addEventListener("click", () => {

        afterChoose();
        predBtn.onclick = () => {

            executionPred();
        }
    });
}

function predictionResult(res) {
    let div = document.createElement("div");
    div.className = "prediction-result";
    let contentDiv = document.createElement("div");
    contentDiv.className = "content";
    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode(`${res}`);
    h2.appendChild(h2Text);
    let tryBtn = document.createElement("button");
    tryBtn.className = "try-btn";
    tryBtn.appendChild(document.createTextNode("Play Again!"));
    contentDiv.appendChild(h2);
    contentDiv.appendChild(tryBtn);
    div.appendChild(contentDiv);
    document.body.appendChild(div);
    tryBtn.addEventListener("click", () => {
        window.location.reload();
    })
}