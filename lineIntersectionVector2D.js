class LineIntersectionVector2D {
    constructor () {
        this.lines = []
        this.currentIntersections = []
        // Data structure of this.lines array: [{x1, y1, x2, y2}, ...]

    }
    
    createLine(x1, y1, x2, y2) {
        this.lines.push({x1, y1, x2, y2})
        return this.lines[this.lines.length - 1]
    }

    // Checks intersection between all lines in this.lines
    update() {
        this.currentIntersections = []
        // loop through this.lines with no repeated combinations
        for (let i = 0; i < this.lines.length; i++) {
            for (let j = i; j < this.lines.length; j++) {
                let point = this.checkIntersection(this.lines[i], this.lines[j])
                if (point) {
                    this.currentIntersections.push(point)
                }
            }
        }
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