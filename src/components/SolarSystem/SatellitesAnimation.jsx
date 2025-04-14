import styled, { css, keyframes } from 'styled-components';
import {useEffect, useRef, useState, memo} from "react";
import { planetData } from './PlanetsDB';
import { Divide } from 'lucide-react';

export const move = keyframes`
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;
export const Satellite = styled.div`
  content: 'sdfadf';
  position: absolute;

  top: calc(50% - ${props => props.size / 2}px); 
  left: calc(50% - ${props => props.size / 2}px);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: white;
  border-radius: 50%;
  animation: ${props => css`satellite ${props.orbit}s linear infinite`};
  visibility: ${props => props.isHovered ? 'visible' : 'hidden'};
`;

const StyledDiv = styled.div`
  position: absolute;

  height: 200px;
  width: 200px;
  border-radius: 50%;
  z-index:100;
  

 animation: ${ css`${move} ${props => props.$day / 1}s linear infinite`};
 
 transition: box-shadow 0.5s ease-in-out, transform 0.5s ease-in-out;
 box-shadow: -10px 20px 20px rgba(0, 0, 0, 0.3);
 
 &:hover {
  box-shadow: 0 0 0 3px white;
  
  ${Satellite} {
         visibility: visible;
       }
  }

  &:hover ~ .webglCanvas {
    transform: scale(1.21);
  }
 
    &:hover::before {
    content: '';
     position: absolute;
   top: -50px;
     left: -50px;
      width: 300px;
     height: 300px;
      border-radius: 50%;
    border: 1px dotted white;
    animation: orbit 2s linear infinite;
   }
 
  @keyframes orbit {
    0% {
      transform: rotate(0deg);
     }
      100% {
       transform: rotate(360deg);
     }
   }
 
   @keyframes satellite {
     0% {
        transform: rotate(0deg) translateX(${props => props.isHovered ? '250px' : '150px'});
      }
     100% {
       transform: rotate(360deg) translateX(${props => props.isHovered ? '250px' : '150px'});
     }
    }
    }
  `;






export const PlanetImage = (props) =>{
  const [count, setCount] = useState(0);
  
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  
   
  let myReq;


  
 













  useEffect(() => {
   
    const canvaser = canvasRef.current;
    const port = window.location.port;
    const gl = canvaser.getContext('webgl', { antialias: true, alpha: true });
    canvaser.width = 800;
    canvaser.height = 600;
    gl.viewport(0, 0, 800, 600);
    
    
    if (!gl) {
        console.error('Unable to initialize WebGL.');
    }
    
    // Vertex shader program
    const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
    
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    
    varying highp vec2 vTextureCoord;
    
    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;
    }
    `;
    
    // Fragment shader program
    const fsSource = `
    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;
    
    void main(void) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
    `;
    
    // Initialize a shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
    };
    
    const buffers = initBuffers(gl);
    
    // Use a high-resolution Mars texture
    const texture = loadTexture(gl, `http://localhost:${port}//public/`+ props.name +'.jpeg');
    
    let rotation = 0.0;
    
    function render(now) {
     
        now = 0.1/ props.$day;
        rotation += now;
        
    
        drawScene(gl, programInfo, buffers, texture, rotation);
    
        animationFrameRef.current  = requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
    function initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
    
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    }
    
    function loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    
    function initBuffers(gl) {
        const latitudeBands = 60;
        const longitudeBands = 60;
        const radius = 2;
    
        const vertexPositionData = [];
        const textureCoordData = [];
        const indexData = [];
    
        for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            const theta = latNumber * Math.PI / latitudeBands;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
    
            for (let longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                const phi = longNumber * 2 * Math.PI / longitudeBands;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
    
                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;
                const u = 1 - (longNumber / longitudeBands);
                const v = 1 - (latNumber / latitudeBands);
    
                vertexPositionData.push(radius * x);
                vertexPositionData.push(radius * y);
                vertexPositionData.push(radius * z);
                textureCoordData.push(u);
                textureCoordData.push(v);
            }
        }
    
        for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
            for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
                const first = (latNumber * (longitudeBands + 1)) + longNumber;
                const second = first + longitudeBands + 1;
                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);
    
                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }
    
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    
        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
    
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    
        return {
            position: positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
            vertexCount: indexData.length,
        };
    }
    
    function loadTexture(gl, url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 20;
        const height = 20;
        const border = 20;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([1024, 2000, 0, 1024]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      width, height, border, srcFormat, srcType,
                      pixel);
    
        const image = new Image();
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                          srcFormat, srcType, image);
    
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
               gl.generateMipmap(gl.TEXTURE_2D);
            } else {
              
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                
            }
        };
        const ext = gl.getExtension('EXT_texture_filter_anisotropic') ||
        gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
        gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    if (ext) {
    const maxAnisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, maxAnisotropy);
    }
    
    
        image.src = url;
    
        return texture;
    }
    
    function isPowerOf2(value) {
        return (value & (value - 1)) == 0;
    }
    
    function drawScene(gl, programInfo, buffers, texture, rotation) {
        gl.clearColor(0.0, 0.0, 0.0, 0.0);  
        gl.clearDepth(1.0);                 
        gl.enable(gl.DEPTH_TEST);           
        gl.depthFunc(gl.LEQUAL);            
    
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        const fieldOfView = 45 * Math.PI / 180;
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();
    
        mat4.perspective(projectionMatrix,
                         fieldOfView,
                         aspect,
                         zNear,
                         zFar);
    
        const modelViewMatrix = mat4.create();
    
        mat4.translate(modelViewMatrix,
                       modelViewMatrix,
                       [-0.0, 0.0, -6.0]); 
    
        mat4.rotate(modelViewMatrix,
                    modelViewMatrix,
                    rotation,
                    [0, 1, 0]);
    
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }
    
        {
            const num = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord,
                num,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.textureCoord);
        }
    
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    
        gl.useProgram(programInfo.program);
    
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
    
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    
        {
            const vertexCount = buffers.vertexCount;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }

    return () => {
      if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
      }
  };


   
}, []); // Empty dependency array means this effect runs once after the initial render



return(
  <div>

        <div style={{ width: '205px', height: '200px', className:"outerDiv"}}>
                       <StyledDiv>
  {props.children}
  </StyledDiv>    

        <canvas id="glCanvas" ref={canvasRef} className='webglCanvas' >
        
        </canvas>
        </div>
        
        </div>




)}