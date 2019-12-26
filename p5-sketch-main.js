const p5Main = new p5((sketch) => {
    const s = sketch

    const FRAME_RATE = 60

    s.preload = () => { }

    s.setup = () => {
        s.createCanvas(800, 600)
        s.frameRate(FRAME_RATE)
    }

    s.draw = async () => {
        // ---------------------------------------------------------------------
        s.background(127)

        s.strokeWeight(1)
        s.stroke(0)
        s.noFill()
        s.rect(0, 0, s.width, s.height)

        // ---------------------------------------------------------------------
        // ...
    }
}, 'p5-main')

window.p5Main = p5Main
