'use strict'

const pointer = {
    current: {
        x: 0,
        y: 0,
    },
    previous: {
        x: 0,
        y: 0,
    },
    first: {
        x: 0,
        y: 0,
    },
    down: false,
    downed: false,
}

let type = 'flat'

const div = document.createElement('div')
document.body.append(div)
const canvas = document.createElement('canvas')
div.append(canvas)
const flatButton = document.createElement('input')
flatButton.type = 'button'
flatButton.value = 'Flat'
flatButton.className = 'selected'
div.append(flatButton)
const vertexButton = document.createElement('input')
vertexButton.type = 'button'
vertexButton.value = 'Vertex'
div.append(vertexButton)
const fragmentButton = document.createElement('input')
fragmentButton.type = 'button'
fragmentButton.value = 'Fragment'
div.append(fragmentButton)

const renderer = new Renderer(canvas)

// Model
const flat = new Model(renderer)
flat.setAttributes(
    [
        -1.0,    0.0,    0.0,
         1.0,    0.0,    0.0,
         0.0,   -1.0,    0.0,
         0.0,    1.0,    0.0,
        -1.0,    0.0,    0.0,
         1.0,    0.0,    0.0,
         0.0,   -1.0,    0.0,
         0.0,    1.0,    0.0,
         0.0,    0.0,   -1.0,
         0.0,    0.0,    1.0,
    ],
    [
        -1.0,    1.0,   -1.0,
         1.0,   -1.0,   -1.0,
        -1.0,   -1.0,   -1.0,
         1.0,    1.0,   -1.0,
        -1.0,   -1.0,    1.0,
         1.0,    1.0,    1.0,
         1.0,   -1.0,    1.0,
        -1.0,    1.0,    1.0,
         0.0,    0.0,    0.0,
         0.0,    0.0,    0.0,
    ]
)
flat.setIndex(
    [
        8, 3, 0,
        8, 0, 2,
        8, 2, 1,
        8, 1, 3,
        
        9, 7, 5,
        9, 5, 6,
        9, 6, 4,
        9, 4, 7,
    ]
)
flat.setShaderType('flat')
const vertex = new Model(renderer)
vertex.setAttributes()
vertex.setIndex()
vertex.setShaderType('vertex')
const fragment = new Model(renderer)
fragment.setAttributes()
fragment.setIndex()
fragment.setShaderType('fragment')

// Matrix
const parallel = new Matrix()
parallel.setParallel(-1, 1, -1, 1, 1, 1000)

const translate = new Matrix()
translate.setTranslate(0, 0, 100)

const scale = new Matrix()
scale.setScale(1.0, 1.0, 1.0)

const rotate = {}
rotate.y = new Matrix()
rotate.x = new Matrix()

let rx = 0, ry = 0


const animation = (timestamp) => {
    requestAnimationFrame(animation)
    
    let cx, cy, px, py, fx, fy, dx, dy, mx, my
    if(pointer.down) {
        const cx = (pointer.current.x * 2 - window.innerWidth) / canvas.width
        const cy = (pointer.current.y * 2 - window.innerHeight) / canvas.height * 2
        const px = (pointer.previous.x * 2 - window.innerWidth) / canvas.width
        const py = (pointer.previous.y * 2 - window.innerHeight) / canvas.height * 2
        const fx = (pointer.first.x * 2 - window.innerWidth) / canvas.width
        const fy = (pointer.first.y * 2 - window.innerHeight) / canvas.height * 2
        const dx = cx - px
        const dy = cy - py
        const mx = cx - fx
        const my = cy - fy
        rx -= dx
        ry -= dy
        ry = Math.max(-0.5, Math.min(ry, 0.5))
    }
    
    renderer.clearFrame()

    rotate.y.setRotateY(rx * Math.PI)
    rotate.x.setRotateX(ry * Math.PI)
    
    
    let matrix, rotateMatrix
    matrix = parallel.multiply(translate)
    matrix = matrix.multiply(scale)
    matrix = matrix.multiply(rotate.x)
    matrix = matrix.multiply(rotate.y)
    
    rotateMatrix = rotate.x.multiply(rotate.y)
    
    flat.setRotateMatrix(rotateMatrix)
    flat.setMatrix(matrix)
    vertex.setRotateMatrix(rotateMatrix)
    vertex.setMatrix(matrix)
    fragment.setRotateMatrix(rotateMatrix)
    fragment.setMatrix(matrix)
    
    if(type === 'flat') flat.draw()
    if(type === 'vertex') vertex.draw()
    if(type === 'fragment') fragment.draw()
    
    renderer.render()
    
    pointer.previous.x = pointer.current.x
    pointer.previous.y = pointer.current.y
    pointer.downed = false
}
requestAnimationFrame(animation)

const click = (event) => {
    const t = event.target
    
    flatButton.className =''
    vertexButton.className =''
    fragmentButton.className =''
    
    t.className = 'selected'
    
    if(t.value === 'Flat') type = 'flat'
    if(t.value === 'Vertex') type = 'vertex'
    if(t.value === 'Fragment') type = 'fragment'
}

flatButton.addEventListener('click', click)
vertexButton.addEventListener('click', click)
fragmentButton.addEventListener('click', click)

canvas.addEventListener('pointerdown', (event) => {
    const x = event.pageX
    const y = event.pageY
    pointer.first.x = x
    pointer.first.y = y
    pointer.previous.x = x
    pointer.previous.y = y
    pointer.current.x = x
    pointer.current.y = y
    pointer.down = true
    pointer.downed = true
})
canvas.addEventListener('pointerup', (event) => {
    pointer.down = false
})
canvas.addEventListener('pointermove', (event) => {
    const x = event.pageX
    const y = event.pageY
    pointer.current.x = x
    pointer.current.y = y
})
canvas.addEventListener('pointerleave', (event) => {
    pointer.down = false
})
const resize = () => {
    const r = window.devicePixelRatio
    const w = Math.floor(window.innerWidth)
    const h = Math.floor(window.innerHeight)
    if(w / h <= 1 / 2)
        renderer.resize(w, w)
    else
        renderer.resize(h, h)
}
resize()
window.addEventListener('resize', resize)