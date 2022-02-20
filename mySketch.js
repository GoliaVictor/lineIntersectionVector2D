const intersection = new LineIntersectionVector2D()
let creatingLine;

function setup() {
    createCanvas(600, 600)
    background(50)
}

function draw() {
    background(50)

    intersection.update()

    stroke(255, 255, 255)
    strokeWeight(1)
    for (const i of intersection.lines) {
        line(i.x1, i.y1, i.x2, i.y2)
    }

    if (mouseIsPressed) {
        creatingLine.x2 = mouseX
        creatingLine.y2 = mouseY
    }

    for (const p of intersection.currentIntersections) {
        stroke(113, 226, 113)
        strokeWeight(5)
        point(p.x, p.y)
    }
}

function mousePressed() {
    creatingLine = intersection.createLine(mouseX, mouseY, mouseX, mouseY)
}