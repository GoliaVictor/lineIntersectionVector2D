class LineIntersectionVector2D {
    constructor () {
        this.lines = []
        this.currentIntersections = []
        // Data structure of this.lines array: [{x1, y1, x2, y2}, ...]

    }

    // Checks intersection between all lines in this.lines
    update() {
        this.currentIntersections = []
        // loop through this.lines with no repeated combinations
        for (let i = 0; i < this.lines.length; i++) {
            for (let j = i+1; j < this.lines.length; j++) {
                if ((this.lines[i].kin != this.lines[j].kin) || (this.lines[i].kin == null && this.lines[j].kin == null)) {
                    let point = this.checkIntersection(this.lines[i], this.lines[j])
                    if (point) {
                        this.currentIntersections.push(point)
                    }
                    else if (point == undefined) {
                        let point = this.checkIntersection(this.lines[j], this.lines[i])
                        if (point) {
                            this.currentIntersections.push(point)
                        }
                    }
                }
            }
        }
    }

    // x, y is position of center
    // r is radius
    // n is number of sides
    createRegularPolygon(x, y, r, n, rotation=0) {
        const kin = "kin" + Math.random().toString(16).slice(2)

        function toRadians (angle) {
            return angle * (Math.PI / 180);
        }
        let vertexes = []

        for (let a = 0; a < 360; a+= 360/n) {
            vertexes.push({x: r*Math.cos(toRadians(a + rotation)) + x, y: r*Math.sin(toRadians(a + rotation)) + y})
        }

        for (let n = 0; n < vertexes.length-1; n++) {
            this.lines.push({x1: vertexes[n].x, y1: vertexes[n].y, x2: vertexes[n+1].x, y2: vertexes[n+1].y, kin: kin})
        }
        this.lines.push({x1: vertexes[vertexes.length-1].x, y1: vertexes[vertexes.length-1].y, x2: vertexes[0].x, y2: vertexes[0].y, kin: kin})

        return kin;
    }

    createRect(x, y, w, h, rotation=0) {
        const kin = "kin" + Math.random().toString(16).slice(2)

        function toRadians (angle) {
            return angle * (Math.PI / 180);
        }

        const cosine = Math.cos(toRadians(rotation))
        const sine = Math.sin(toRadians(rotation))

        let vertexes = [{x: x, y: y}]
        vertexes.push({x: vertexes[0].x + w*cosine, y: vertexes[0].y + w*sine})
        vertexes.push({x: vertexes[1].x - h*sine, y: vertexes[1].y + h*cosine})
        vertexes.push({x: vertexes[0].x - h*sine, y: vertexes[0].y + h*cosine})

        for (let n = 0; n < vertexes.length-1; n++) {
            this.lines.push({x1: vertexes[n].x, y1: vertexes[n].y, x2: vertexes[n+1].x, y2: vertexes[n+1].y, kin: kin})
        }
        this.lines.push({x1: vertexes[vertexes.length-1].x, y1: vertexes[vertexes.length-1].y, x2: vertexes[0].x, y2: vertexes[0].y, kin: kin})

        return kin;
    }

    createLine(x1, y1, x2, y2) {
        this.lines.push({x1, y1, x2, y2})
        return this.lines[this.lines.length - 1]
    }

    // Checks if two lines intersect where each paramater is line of structure {x1, y1, x2, y2}
    checkIntersection(line1, line2) {
        let x0 = line1.x1
        let y0 = line1.y1
        let x = line1.x2-line1.x1
        let y = line1.y2-line1.y1

        let a0 = line2.x1
        let b0 = line2.y1
        let a = line2.x2-line2.x1
        let b = line2.y2-line2.y1

        // prevent dividing by zero error
        if (a*y - b*x == 0) {
            return false
        }

        let lambdaV = (b*x0 - b*a0 + a*b0 - a*y0)/(a*y - b*x)
        if (lambdaV >= 0 && lambdaV <= 1) {
            let lambdaU = (x0 + lambdaV*x - a0)/(a)
            if (lambdaU >= 0 && lambdaU <= 1) {
                // Actually intersections only when both lambdaV and lambdaU between 0 and 1
                let point = {x: x0 + lambdaV*x, y: y0 + lambdaV*y}
                return point
            }
        }
        else {
            return false
        }
    }
}