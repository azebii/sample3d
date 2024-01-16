'use strict'

const Matrix = class extends Float32Array
{
    constructor()
    {
        super(16)

        this[ 0] = 1
        this[ 1] = 0
        this[ 2] = 0
        this[ 3] = 0

        this[ 4] = 0
        this[ 5] = 1
        this[ 6] = 0
        this[ 7] = 0
        
        this[ 8] = 0
        this[ 9] = 0
        this[10] = 1
        this[11] = 0
        
        this[12] = 0
        this[13] = 0
        this[14] = 0
        this[15] = 1
    }

    setTranslate (left, down, near)
    {
        this[ 0] = 1
        this[ 1] = 0
        this[ 2] = 0
        this[ 3] = 0

        this[ 4] = 0
        this[ 5] = 1
        this[ 6] = 0
        this[ 7] = 0

        this[ 8] = 0
        this[ 9] = 0
        this[10] = 1
        this[11] = 0

        this[12] = left
        this[13] = down
        this[14] = near
        this[15] = 1
    }

    setScale (width, height, depth)
    {
        this[ 0] = width
        this[ 1] = 0
        this[ 2] = 0
        this[ 3] = 0

        this[ 4] = 0
        this[ 5] = height
        this[ 6] = 0
        this[ 7] = 0

        this[ 8] = 0
        this[ 9] = 0
        this[10] = depth
        this[11] = 0

        this[12] = 0
        this[13] = 0
        this[14] = 0
        this[15] = 1
    }

    setRotateX (rad)
    {
        this[ 0] = 1
        this[ 1] = 0
        this[ 2] = 0
        this[ 3] = 0

        this[ 4] = 0
        this[ 5] = Math.cos(rad)
        this[ 6] = Math.sin(rad)
        this[ 7] = 0

        this[ 8] = 0
        this[ 9] = -Math.sin(rad)
        this[10] = Math.cos(rad)
        this[11] = 0

        this[12] = 0
        this[13] = 0
        this[14] = 0
        this[15] = 1
    }

    setRotateY (rad)
    {
        this[ 0] = Math.cos(rad)
        this[ 1] = 0
        this[ 2] = -Math.sin(rad)
        this[ 3] = 0

        this[ 4] = 0
        this[ 5] = 1
        this[ 6] = 0
        this[ 7] = 0

        this[ 8] = Math.sin(rad)
        this[ 9] = 0
        this[10] = Math.cos(rad)
        this[11] = 0

        this[12] = 0
        this[13] = 0
        this[14] = 0
        this[15] = 1
    }

    setRotateZ (rad)
    {
        this[ 0] = Math.cos(rad)
        this[ 1] = Math.sin(rad)
        this[ 2] = 0
        this[ 3] = 0

        this[ 4] = -Math.sin(rad)
        this[ 5] = Math.cos(rad)
        this[ 6] = 0
        this[ 7] = 0

        this[ 8] = 0
        this[ 9] = 0
        this[10] = 1
        this[11] = 0

        this[12] = 0
        this[13] = 0
        this[14] = 0
        this[15] = 1
    }

    setParallel (left, right, down, up, near, far)
    {
        this[ 0] = 2 / (right - left)
        this[ 1] = 0
        this[ 2] = 0
        this[ 3] = 0

        this[ 4] = 0
        this[ 5] = 2 / (up - down)
        this[ 6] = 0
        this[ 7] = 0

        this[ 8] = 0
        this[ 9] = 0
        this[10] = 2 / (far - near)
        this[11] = 0

        this[12] = -(right + left) / (right - left)
        this[13] = -(up + down) / (up - down)
        this[14] = -(far + near) / (far - near)
        this[15] = 1
    }

    setPerspective (left, right, down, up, far, near, size)
    {
        if(size === 1.0)
        {
            this.setParallel(left, right, down, up, near, far)
            return
        }

        this[ 0] = 2 * size / (right - left)
        this[ 1] = 0
        this[ 2] = 0
        this[ 3] = 0

        this[ 4] = 0
        this[ 5] = 2 * size / (up - down)
        this[ 6] = 0
        this[ 7] = 0

        this[ 8] = -(right + left) / (right - left)
        this[ 9] = -(up + down) / (up - down)
        this[10] = (far + near) / (far - near)
        this[11] = 1

        this[12] = 0
        this[13] = 0
        this[14] = -2 * far * near / (far - near)
        this[15] = 0
    }

    multiply (right)
    {
        const m = new Matrix()
        const l = new Matrix()
        for(let i in this){ l[i] = this[i] }
        const r = right
        
        m[ 0] = l[ 0] * r[ 0] + l[ 4] * r[ 1] + l[ 8] * r[ 2] + l[12] * r[ 3]
        m[ 1] = l[ 1] * r[ 0] + l[ 5] * r[ 1] + l[ 9] * r[ 2] + l[13] * r[ 3]
        m[ 2] = l[ 2] * r[ 0] + l[ 6] * r[ 1] + l[10] * r[ 2] + l[14] * r[ 3]
        m[ 3] = l[ 3] * r[ 0] + l[ 7] * r[ 1] + l[11] * r[ 2] + l[15] * r[ 3]
        
        m[ 4] = l[ 0] * r[ 4] + l[ 4] * r[ 5] + l[ 8] * r[ 6] + l[12] * r[ 7]
        m[ 5] = l[ 1] * r[ 4] + l[ 5] * r[ 5] + l[ 9] * r[ 6] + l[13] * r[ 7]
        m[ 6] = l[ 2] * r[ 4] + l[ 6] * r[ 5] + l[10] * r[ 6] + l[14] * r[ 7]
        m[ 7] = l[ 3] * r[ 4] + l[ 7] * r[ 5] + l[11] * r[ 6] + l[15] * r[ 7]
        
        m[ 8] = l[ 0] * r[ 8] + l[ 4] * r[ 9] + l[ 8] * r[10] + l[12] * r[11]
        m[ 9] = l[ 1] * r[ 8] + l[ 5] * r[ 9] + l[ 9] * r[10] + l[13] * r[11]
        m[10] = l[ 2] * r[ 8] + l[ 6] * r[ 9] + l[10] * r[10] + l[14] * r[11]
        m[11] = l[ 3] * r[ 8] + l[ 7] * r[ 9] + l[11] * r[10] + l[15] * r[11]
        
        m[12] = l[ 0] * r[12] + l[ 4] * r[13] + l[ 8] * r[14] + l[12] * r[15]
        m[13] = l[ 1] * r[12] + l[ 5] * r[13] + l[ 9] * r[14] + l[13] * r[15]
        m[14] = l[ 2] * r[12] + l[ 6] * r[13] + l[10] * r[14] + l[14] * r[15]
        m[15] = l[ 3] * r[12] + l[ 7] * r[13] + l[11] * r[14] + l[15] * r[15]
        
        return m
    }
}



'use strict'

const Renderer = class
{
    constructor(canvas)
    {
        this._canvas = canvas
        const gl = canvas.getContext("webgl2")
        this._gl = gl

        if (gl == null)
        {
            console.error('WebGL2 unsuppoted.')
            return
        }

        const canvasVertexShaderString =
        `#version 300 es
            in vec3 position;
            in vec2 coordinate;
            
            out vec2 varCoordinate;
            
            void main(void)
            {
                varCoordinate = coordinate;
                gl_Position = vec4(position, 1.0);
            }
        `
        const canvasFragmentShaderString =
        `#version 300 es
            precision highp sampler2D;
            precision highp float;
            
            in vec2 varCoordinate;
            
            out vec4 outColor;
            
            uniform sampler2D sampler;
            
            void main(void)
            {
                outColor = texture(sampler, varCoordinate);
            }
        `
        
        const canvasVertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(canvasVertexShader, canvasVertexShaderString)
        gl.compileShader(canvasVertexShader)
        if(gl.getShaderParameter(canvasVertexShader, gl.COMPILE_STATUS))
            this._canvasVertexShader = canvasVertexShader
        else
            console.error(gl.getShaderInfoLog(canvasVertexShader))
        
        const canvasFragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(canvasFragmentShader, canvasFragmentShaderString)
        gl.compileShader(canvasFragmentShader)
        if(gl.getShaderParameter(canvasFragmentShader, gl.COMPILE_STATUS))
            this._canvasFragmentShader = canvasFragmentShader
        else
            console.error(gl.getShaderInfoLog(canvasFragmentShader))
        
        const canvasProgram = gl.createProgram()
        gl.attachShader(canvasProgram, canvasVertexShader)
        gl.attachShader(canvasProgram, canvasFragmentShader)
        gl.linkProgram(canvasProgram)
        if(gl.getProgramParameter(canvasProgram, gl.LINK_STATUS))
        {
            gl.useProgram(canvasProgram)
            this._canvasProgram = canvasProgram
        }
        else
            console.error(gl.getProgramInfoLog(canvasProgram))



        this.positionArray = 
        [
            -1.0, -1.0, 0.0,
             1.0, -1.0, 0.0,
            -1.0 , 1.0, 0.0, 
             1.0 , 1.0, 0.0,
        ]

        this.coordinateArray =
        [
            0, 0,
            1, 0,
            0, 1,
            1, 1,
        ]

        this.vertex = []
        for(let i = 0; i < 4; i++)
        {
            this.vertex.push(this.positionArray[i * 3 + 0])
            this.vertex.push(this.positionArray[i * 3 + 1])
            this.vertex.push(this.positionArray[i * 3 + 2])
            this.vertex.push(this.coordinateArray[i * 2 + 0])
            this.vertex.push(this.coordinateArray[i * 2 + 1])    
        }

        const vbo = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex), gl.STATIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        this._vbo = vbo

        this.index =
        [
            0, 1, 2,
            3, 2, 1,
        ]

        const ibo = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(this.index), gl.STATIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
        this._ibo = ibo

        this._canvasSamplerLocation = gl.getUniformLocation(this._canvasProgram, 'sampler')
        this._canvasPositionLocation = gl.getAttribLocation(this._canvasProgram, 'position')
        this._canvasCoordinateLocation = gl.getAttribLocation(this._canvasProgram, 'coordinate')

        gl.clearColor(0.0, 0.0, 0.0, 0.0)
		gl.clearDepth(1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD)
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE)
        gl.enable(gl.BLEND)

        gl.frontFace(gl.CCW)
        gl.enable(gl.CULL_FACE)

        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
    }

    render()
    {
        const gl = this._gl

        if(this._frameTexture != null)
        {
            gl.activeTexture(gl.TEXTURE0 + 0)
            gl.bindTexture(gl.TEXTURE_2D, this._frameTexture)
            gl.uniform1i(this.canvasSamplerLocation, 0)
        }
        else return

        if(gl.getProgramParameter(this._canvasProgram, gl.LINK_STATUS))
            gl.useProgram(this._canvasProgram)

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo)
        
        gl.enableVertexAttribArray(this._canvasPositionLocation)
        gl.vertexAttribPointer(this._canvasPositionLocation, 3, gl.FLOAT, false, (3 + 2) * 4, 0)

        gl.enableVertexAttribArray(this._canvasCoordinateLocation)
        gl.vertexAttribPointer(this._canvasCoordinateLocation, 2, gl.FLOAT, false, (3 + 2) * 4, 3 * 4)
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo)

        gl.drawElements(gl.TRIANGLES, this.index.length, gl.UNSIGNED_SHORT, 0)

        gl.flush()
    }

    clear(r = 0, g = 0, b = 0, a = 0)
    {
        const gl = this._gl
        gl.clearColor(r, g, b, a)
		gl.clearDepth(1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    }

    clearFrame(r = 0, g = 0, b = 0, a = 0)
    {
        const gl = this._gl
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer)
        gl.clearColor(r, g, b, a)
		gl.clearDepth(1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    resize(width = 256, height = 256)
    {
        const gl = this._gl
        const canvas = this._canvas
        
        canvas.width = width
        canvas.height = height
        
        gl.viewport(0, 0, width, height)
        
        this._depthRenderBuffer = gl.createRenderbuffer()
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._depthRenderBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height)
        gl.bindRenderbuffer(gl.RENDERBUFFER, null)
        
        this._frameTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this._frameTexture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        
        this._framebuffer = gl.createFramebuffer()
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer)
        
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthRenderBuffer)
        
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._frameTexture, 0)

        gl.bindTexture(gl.TEXTURE_2D, null)
        gl.bindRenderbuffer(gl.RENDERBUFFER, null)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
}



const Model = class
{
    constructor(renderer = null)
    {
        if(renderer === null) return
        this._renderer = renderer
        const gl = renderer._gl
        this._gl = gl
        this._texture = null

        this.matrix = new Matrix()
        this.rotateMatrix = new Matrix()
        
        this._texture = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this._texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.bindTexture(gl.TEXTURE_2D, null)
    }
    
    setShaderType(type) {
        this._shaderType = type
        const gl = this._gl
        
        let renderVertexShaderString, renderFragmentShaderString
        
        if(type === 'white') {
            renderVertexShaderString =
                `#version 300 es
                
                    in vec3 position;
                    
                    uniform mat4 matrix;
                    
                    void main(void)
                    {
                        gl_Position = matrix * vec4(position, 1.0);
                    }
                `
            
            renderFragmentShaderString =
                `#version 300 es
                
                    precision mediump float;
                    
                    out vec4 outColor;
                    
                    void main(void)
                    {
                        outColor = vec4(1.0, 1.0, 1.0, 1.0);
                    }
                `
        }
        else if(type === 'flat') {
            renderVertexShaderString =
                `#version 300 es
                
                    in vec3 position;
                    in vec3 normal;
                    
                    flat out vec4 varColor;
                    
                    uniform mat4 rotateMatrix;
                    uniform mat4 matrix;
                    
                    void main(void)
                    {
                        vec3 n = normalize((rotateMatrix * vec4(normal, 0.0)).xyz);
                        vec3 l = normalize(vec3(0.0, 1.0, -1.0));
                        float c = dot(n, l);
                        varColor = vec4(c, c, c, 1.0);
                        gl_Position = matrix * vec4(position, 1.0);
                    }
                `
            
            renderFragmentShaderString =
                `#version 300 es
                
                    precision mediump float;
                    
                    flat in vec4 varColor;
                    
                    out vec4 outColor;
                    
                    void main(void)
                    {
                        outColor = varColor;
                    }
                `
        }
        else if(type === 'vertex') {
            renderVertexShaderString =
                `#version 300 es
                
                    in vec3 position;
                    in vec3 normal;
                    
                    out vec4 varColor;
                    
                    uniform mat4 rotateMatrix;
                    uniform mat4 matrix;
                    
                    void main()
                    {
                        vec3 n = normalize((rotateMatrix * vec4(normal, 0.0)).xyz);
                        vec3 l = normalize(vec3(0.0, 1.0, -1.0));
                        float c = dot(n, l);
                        varColor = vec4(c, c, c, 1.0);
                        gl_Position = matrix * vec4(position, 1.0);
                    }
                `
            
            renderFragmentShaderString =
                `#version 300 es
                
                    precision mediump float;
                    
                    in vec4 varColor;
                    
                    out vec4 outColor;
                    
                    void main()
                    {
                        outColor = varColor;
                    }
                `
        }
        else if(type === 'fragment') {
            renderVertexShaderString =
                `#version 300 es
                
                    in vec3 position;
                    in vec3 normal;
                    
                    out vec3 varNormal;
                    
                    uniform mat4 rotateMatrix;
                    uniform mat4 matrix;
                    
                    void main()
                    {
                        varNormal = (rotateMatrix * vec4(normal, 0.0)).xyz;
                        gl_Position = matrix * vec4(position, 1.0);
                    }
                `
            
            renderFragmentShaderString =
                `#version 300 es
                
                    precision mediump float;
                    
                    in vec3 varNormal;
                    
                    out vec4 outColor;
                    
                    void main()
                    {
                        vec3 n = normalize(varNormal);
                        vec3 l = normalize(vec3(0.0, 1.0, -1.0));
                        float c = dot(n, l);
                        outColor = vec4(c, c, c, 1.0);
                    }
                `
        }
        else {
            console.error('Shader type error.')
            return
        }

        const renderVertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(renderVertexShader, renderVertexShaderString)
        gl.compileShader(renderVertexShader)
        if(gl.getShaderParameter(renderVertexShader, gl.COMPILE_STATUS))
            this._renderVertexShader = renderVertexShader
        else
            console.error(gl.getShaderInfoLog(renderVertexShader))
        
        const renderFragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(renderFragmentShader, renderFragmentShaderString)
        gl.compileShader(renderFragmentShader)
        if(gl.getShaderParameter(renderFragmentShader, gl.COMPILE_STATUS))
            this._renderFragmentShader = renderFragmentShader
        else
            console.error(gl.getShaderInfoLog(renderFragmentShader))
        
        const renderProgram = gl.createProgram()
        gl.attachShader(renderProgram, renderVertexShader)
        gl.attachShader(renderProgram, renderFragmentShader)
        gl.linkProgram(renderProgram)
        if(gl.getProgramParameter(renderProgram, gl.LINK_STATUS))
        {
            gl.useProgram(renderProgram)
            this._renderProgram = renderProgram
        }
        else
            console.error(gl.getProgramInfoLog(renderProgram))
        
        this._renderMatrixLocation = gl.getUniformLocation(this._renderProgram, 'matrix')
        this._renderRotateMatrixLocation = gl.getUniformLocation(this._renderProgram, 'rotateMatrix')
        this._renderPositionLocation = gl.getAttribLocation(this._renderProgram, 'position')
        this._renderNormalLocation = gl.getAttribLocation(this._renderProgram, 'normal')
    }

    draw()
    {
        const renderer = this._renderer
        const gl = this._gl

        if(this._texture != null)
        {
            gl.activeTexture(gl.TEXTURE0 + 0)
            gl.bindTexture(gl.TEXTURE_2D, this._texture)
            gl.uniform1i(this._renderSamplerLocation, 0)
        }
        else return

        if(gl.getProgramParameter(this._renderProgram, gl.LINK_STATUS))
            gl.useProgram(this._renderProgram)

		gl.uniformMatrix4fv(this._renderMatrixLocation, false, this.matrix)
        
        if(this._shaderType !== 'white')
		gl.uniformMatrix4fv(this._renderRotateMatrixLocation, false, this.rotateMatrix)

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo)
        
        gl.enableVertexAttribArray(this._renderPositionLocation)
        gl.vertexAttribPointer(this._renderPositionLocation, 3, gl.FLOAT, false, (3 + 3) * 4, 0)
        
        if(this._shaderType !== 'white'){
            gl.enableVertexAttribArray(this._renderNormalLocation)
            gl.vertexAttribPointer(this._renderNormalLocation, 3, gl.FLOAT, false, (3 + 3) * 4, 3 * 4)
        }
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo)

		gl.bindFramebuffer(gl.FRAMEBUFFER, renderer._framebuffer)
        
        gl.drawElements(gl.TRIANGLES, this.index.length, gl.UNSIGNED_SHORT, 0)
        //gl.drawElements(gl.LINES, this.index.length, gl.UNSIGNED_SHORT, 0)
        
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    setAttributes(
        position =
            [
                -1.0,    0.0,    0.0,
                 1.0,    0.0,    0.0,
                 0.0,   -1.0,    0.0,
                 0.0,    1.0,    0.0,
                 0.0,    0.0,   -1.0,
                 0.0,    0.0,    1.0,
            ],
        normal =
            [
                -1.0,    0.0,    0.0,
                 1.0,    0.0,    0.0,
                 0.0,   -1.0,    0.0,
                 0.0,    1.0,    0.0,
                 0.0,    0.0,   -1.0,
                 0.0,    0.0,    1.0,
            ]
    )
    {
        const gl = this._gl

        this.position = position
        this.normal = normal
        
        this.vertex = []
        for(let i = 0; i < position.length / 3; i++)
        {
            this.vertex.push(position[i * 3 + 0])
            this.vertex.push(position[i * 3 + 1])
            this.vertex.push(position[i * 3 + 2])
            this.vertex.push(normal[i * 3 + 0])
            this.vertex.push(normal[i * 3 + 1])
            this.vertex.push(normal[i * 3 + 2]) 
        }

        const vbo = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex), gl.DYNAMIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        this._vbo = vbo
    }

    //  25
    // 0*1
    // 43
    setIndex(
        index =
        [
            4, 3, 0,
            4, 0, 2,
            4, 2, 1,
            4, 1, 3,
            
            5, 3, 1,
            5, 1, 2,
            5, 2, 0,
            5, 0, 3,
        ]
    )
    {
        const gl = this._gl
        this.index = index
        const ibo = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.DYNAMIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
        this._ibo = ibo
    }

    setTexture(width, height, data)
    {
        const gl = this._gl
        
        this.textureData = {
            width: width,
            height: height,
            data: new Uint8Array(data),
        }
        
        gl.bindTexture(gl.TEXTURE_2D, this._texture)
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            this.textureData.width,
            this.textureData.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            this.textureData.data
        )
        gl.bindTexture(gl.TEXTURE_2D, null)
    }

    setMatrix(matrix)
    {
        this.matrix = matrix
    }

    setRotateMatrix(rotateMatrix)
    {
        this.rotateMatrix = rotateMatrix
    }
}