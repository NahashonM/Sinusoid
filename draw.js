
/* center x, center y, radius, time, angular velocity, context, color space */
function WaveCircle(cx, cy, r, angle, ctx, color) {

    ctx.beginPath()
    ctx.arc( cx, cy, r, 0, Math.PI * 2)

    ctx.lineWidth = 0.5;
    ctx.setLineDash([ Math.PI * 3 ])
    ctx.strokeStyle = color[0]
    ctx.stroke()
    
    let ex = cx + ( r * Math.cos(angle * Math.PI / 180))
    let ey = cy + ( r * Math.sin(angle * Math.PI / 180))
    
    // draw line from origin to point
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo( ex, ey)
    
    ctx.lineWidth = 2;
    ctx.setLineDash([])
    ctx.strokeStyle = color[1]
    ctx.stroke()
    
    // draw angle marker from origin to point
    ctx.beginPath()
    ctx.arc( ex, ey, 1.5, 0, Math.PI * 2)
    ctx.strokeStyle = color[2]
    ctx.stroke()
    
    return {cx: ex, cy: ey}
}


function evalEqn(eqn, x) { 'use strict'; return eval(eqn) }


function WaveSinusoidal(gx, gy, tt, wavefn, graphWidth, ctx, color) {
    'use strict';

    // draw graph
    ctx.beginPath()
    ctx.moveTo(gx, gy - 50)
    ctx.lineTo(gx, gy + 100)

    ctx.moveTo(gx, gy)
    ctx.lineTo(graphWidth, gy)

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = color[0]
    ctx.stroke()
    
    ctx.beginPath()

    let m = 0
    for( var i = gx, j = tt; i < graphWidth; i++, j++ ) {
        let t = j * Math.PI / 180
        let y = gy + 10 * eval(wavefn) 
        ctx.lineTo(i, y)
    }

    ctx.strokeStyle = color[2]
    ctx.stroke()
}


function DrawCombinedWaves(gx, gy, gWidth, waves, tt, combinedWaveFn, ctx, color) {
    // draw individual Sinusoidals
    let cxy = {cx: gx + 150, cy: gy }
    gx += 400
    for(let i = 0; i <waves.length; i++ ) {
        
        let angle = 2 * Math.PI * waves[i].frequency * tt

        cxy = WaveCircle(cxy.cx, cxy.cy, waves[i].amplitude * 10, angle, ctx, color)

    }

    // draw graph
    ctx.beginPath()
    ctx.moveTo(gx, gy - 50)
    ctx.lineTo(gx, gy + 100)
    
    ctx.moveTo(gx, gy)
    ctx.lineTo(gWidth, gy)
    
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = color[0]
    ctx.stroke()
    
    ctx.beginPath()
    
    ctx.moveTo(cxy.cx, cxy.cy)
    let m = 0
    for( var i = gx, j = tt; i < gWidth; i++, j++ ) {
        let t = j * Math.PI / 180
        let y = gy + 10 * eval(combinedWaveFn) 
        ctx.lineTo(i, y)
    }

    ctx.strokeStyle = color[2]
    ctx.stroke()
}




function Wave(equation) {
    this.raweqn   = equation
    this.equation   = equation
    this.frequency  = 1
    this.amplitude  = 1
    this.freqStr = ""

    
    /* 
        format the equation
        Should be called every time the equation is changed

        // /\d*\.*\d*(?=\*)/  1234.567*  1234* .1234*
        // /((\d*\.*\d*)\**(\d*\.*\d*))*(?=\*)/g   1234.567 * 1234.567* 
        // /((\d*\.?\d*)(\*|\/)(\d*\.?\d*))*(?=(\*|\/))/g
        */
       this.Init = function() {
           this.equation = this.equation.replaceAll(/cos/ig, 'Math.cos');
           this.equation = this.equation.replaceAll(/pi/ig, 'Math.PI');
           this.equation = this.equation.replaceAll(/sin/ig, 'Math.sin');
           this.equation = this.equation.replaceAll(/\s|.*=/g, '');
           
           let stack = []
           
           let m = this.equation.match(/sin|cos\(/i).index + 3
           let i = m
           this.parseAmplitude(m)
        
        for(; i < this.equation.length; i++) {
            if (this.equation[i] === '(')   stack.push(i)
            if (this.equation[i] === ')')   stack.pop(i)
            if (!stack.length)  break
        }
        
        if (stack.length) return false;
        
        this.freqStr = this.equation.substr(m+1, i - m - 1)
        
        if(this.freqStr.length <= 0) return false
        
        this.ParseFrequency()
        
        return true
    }
    
    this.parseAmplitude = function (fnIndex) {
        let tmpStr = this.equation.substr(0, fnIndex - 8) 

        let res = tmpStr.match(/((\d*\.?\d*)(\*|\/)?(\d*\.?\d*))*(?=(\*|\/))/g)


        if(!tmpStr) { this.amplitude  = 1; return;  }
        
        this.amplitude = eval(res[0])
    }
    
    /*Parse frequency from Math.sin parameter */
    this.ParseFrequency = function() {
        'use strict';
        let t = 10;
        this.frequency = (eval(this.freqStr) / t)/(2 * Math.PI)
    }
    
    /*Parse equation value */
    this.ParseEqn = function(t) { 'use strict'; return eval(this.freqStr) }
    
    /* Draw Equation */
    this.Draw = (posX, posY, t, graphWidth, ctx, colors) => {
        let angle = 2 * Math.PI * this.frequency * t
        WaveCircle(posX + 40, posY + 60, 40, angle, ctx, colors)

        WaveSinusoidal(posX + 90, posY + 60, t, this.equation, graphWidth, ctx, colors) 
    }
    

    /* Call init function */
    this.Init()
}


