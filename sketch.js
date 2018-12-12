var ctracker;
var slider;
var val = 5;
var positions;
let srcTextEye = "eye";
let srcTextEyebrow = "eyebrows";
let srcTextNose = "nose";
let srcTextMouth = "mouth";
let srcTextJaw = "myfacesjawline"
var rix, riy, lex, ley;
var eyebrows = [19, 20, 21, 22, 18, 17, 16, 15];
var r_eye = [23, 27, 25];
var l_eye = [30, 32, 28];
var nose1 = [33, 41, 62, 37];
var nose2 = [35, 42, 43, 39];
var mouth1 = [44, 61, 60, 59, 50];
var mouth2 = [44, 55, 53, 51, 50];

function setup() {

    // setup camera capture
    var videoInput = createCapture();
    videoInput.size(400, 300);
    videoInput.position(0, 0);

    // setup canvas
    var cnv = createCanvas(400, 300);
    cnv.position(0, 0);

    // setup tracker
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);

    //font
    textFont('Georgia');
    textAlign(CENTER, CENTER);
    textSize(10);
    smooth();
}


function draw() {

    clear();

    // get array of face marker positions [x, y] format
    positions = ctracker.getCurrentPosition();
    for (var i = 0; i < positions.length; i++) {

        background(255);

        //eyebrows
        for (let j = 0; j < srcTextEyebrow.length; j++) {
            text(srcTextEyebrow.charAt(j), positions[eyebrows[j]][0], positions[eyebrows[j]][1]);
        }

        //eye
        for (let j = 0; j < srcTextEye.length; j++) {
            push();
            textSize(20 / (pow(1 - j, 2) + 1));
            text(srcTextEye.charAt(j), positions[r_eye[j]][0], positions[r_eye[j]][1]);
            text(srcTextEye.charAt(j), positions[l_eye[j]][0], positions[l_eye[j]][1]);
            pop();
        }

        //mouth
        if (positions[57][1] - positions[60][1] > 8) {
            for (var i = 0; i < height; i = i + positions[57][1] - positions[60][1]) {
                push();
                translate(random(sin(i) * i), i * 0.7)
                fill(255, 0, 0, 200 - i)
                textSize(i / 2);
                text("♥", positions[57][0], positions[57][1]);
                //heart();
                pop();
            }
        }

        //Nose
        for (let j = 0; j < srcTextNose.length; j++) {
            text(srcTextNose.charAt(j), positions[nose1[j]][0], positions[nose1[j]][1]);
            //text(srcTextNose.charAt(j), positions[nose2[j]][0], positions[nose2[j]][1]);
        }

        //Mouth
        for (let j = 0; j < srcTextMouth.length; j++) {
            push();
            textSize(40 / (pow(2 - j, 2) + 2));
            text(srcTextMouth.charAt(j), positions[mouth1[j]][0], positions[mouth1[j]][1]);
            text(srcTextMouth.charAt(j), positions[mouth2[j]][0], positions[mouth2[j]][1]);
            pop();
        }

        //Jawline
        for (let j = 0; j < 14; j++) {
            push();
            text(srcTextJaw.charAt(j), positions[j][0], positions[j][1]);
            pop();
        }

    }
}

function heart() {
    textSize(30);
    text("♥", positions[57][0], positions[57][1]);
}
