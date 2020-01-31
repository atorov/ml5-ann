const p5Main = new p5((sketch) => {
    const s = sketch

    const FRAME_RATE = 60

    let poseNet
    let poses
    // let skeleton
    let video

    s.preload = () => { }

    s.setup = () => {
        s.createCanvas(640, 480)
        s.frameRate(FRAME_RATE)

        video = s.createCapture(s.VIDEO)
        video.hide()

        poseNet = ml5.poseNet(video)
        poseNet.on('pose', (item) => {
            poses = item
        })
    }

    s.draw = async () => {
        // ---------------------------------------------------------------------
        s.background(0)

        s.strokeWeight(1)
        s.stroke(127)
        s.noFill()
        s.rect(0, 0, s.width, s.height)

        // ---------------------------------------------------------------------
        s.translate(s.width, 0)
        s.scale(-1.0, 1.0)

        s.tint(255, 31)
        s.image(video, 0, 0, s.width, s.height)

        if (poses) {
            poses.forEach(({ pose, skeleton }/* , poseIndex */) => {
                // console.log('::: TODO: --- --- ---')
                // console.log('::: TODO: pose #', poseIndex)
                // console.log('::: TODO: pose:', pose)
                // console.log('::: TODO: pose score:', pose.score)
                // console.log('::: TODO: skeleton:', skeleton)
                // console.log('::: TODO: poses:', poses)

                if (
                    pose.score > 0.25
                    // && skeleton.length
                ) {
                    const dist = s.dist(pose.rightEye.x, pose.rightEye.y, pose.leftEye.x, pose.leftEye.y)

                    skeleton.forEach((pair) => {
                        const x1 = pair[0].position.x
                        const y1 = pair[0].position.y
                        const x2 = pair[1].position.x
                        const y2 = pair[1].position.y
                        s.stroke(255)
                        s.strokeWeight(4)
                        s.line(x1, y1, x2, y2)
                    })

                    s.stroke(255)
                    s.strokeWeight(2)

                    s.fill(0, 127, 255)
                    pose.keypoints.forEach((point) => {
                        s.circle(point.position.x, point.position.y, 16)
                    })

                    s.fill(255, 0, 127)
                    s.circle(pose.nose.x, pose.nose.y, s.constrain(dist, 32, s.width))

                    s.fill(255, 0, 127)
                    s.circle(pose.rightWrist.x, pose.rightWrist.y, 32)
                    s.circle(pose.leftWrist.x, pose.leftWrist.y, 32)
                }
            })
        }
    }
}, 'p5-main')

window.p5Main = p5Main
