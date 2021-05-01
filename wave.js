let     combinedWaves   = ''
let     waves           = []
const   per_wave_h      = 150
const   combined_wave_h = 350


class WaveCanvas extends React.Component 
{
    constructor(props) {
        super(props)

        this.state = {waves:[]}
        this.canvasRef          = React.createRef()
        this.canvasWrapperRef   = React.createRef()
        
        this.t = 0
        this.colors = ['rgba(0,0,0,0.2)','rgba(250,50,255,1)','rgba(0,0,255,1)','rgba(0,0,0,1)' ]

        //this.wave = new Wave("sin( 4 * t + 4 * t)")
        waves.push(new Wave("6.35 *   sin( 3.14159 * t)"))
        waves.push(new Wave(" 2.1 *  sin(  9.42478 * t)"))
        waves.push(new Wave(" 1.3 *  sin( 15.70796 * t)"))
        waves.push(new Wave(" 0.9 *  sin( 21.99115 * t)"))
        waves.push(new Wave(" 0.7 *  sin( 28.27433 * t)"))

        this.GetSeriesEqn()

    }
    

    componentDidMount = function() {
        window.onresize = this.Resize
        this.ctx        = this.canvasRef.current.getContext('2d');

        this.Resize()
        this.Draw()
    }

    componentWillUnmount = function() {
        alert("component unmounting")
    }

    GetSeriesEqn = () => {
        combinedWaves = ''
        waves.map((_wave, i) => { combinedWaves += _wave.equation + (i==(waves.length-1)? "": "+" )} )
    }

    AddWave = (eqn) => {
        waves.push(new Wave(eqn))
        this.canvasRef.current.height = waves.length * per_wave_h + combined_wave_h 

        this.GetSeriesEqn()
    }


    Draw = ()  => {

        this.ctx.clearRect(0,0, this.canvasRef.current.width, this.canvasRef.current.height)

        DrawCombinedWaves(0, combined_wave_h/2, this.canvasRef.current.width, waves, this.t, combinedWaves, this.ctx, this.colors)

        for(let i = 0; i < waves.length; i++) {
            waves[i].Draw(300, combined_wave_h + per_wave_h * i, this.t,  this.canvasRef.current.width, this.ctx, this.colors )
        }

        this.t++;
        
        requestAnimationFrame(this.Draw)
    }




    /* Events */
    OnClick = (evt) => {
        
    }

    Resize = () => {
        //let style = window.getComputedStyle(this.canvasWrapperRef.current)
        //this.canvasRef.current.width = style.getPropertyValue('width').replaceAll(/\D/g,'')
        this.canvasRef.current.width = window.innerWidth - 40
        this.canvasRef.current.height = waves.length * combined_wave_h + per_wave_h
    }

    render ()  {
        return( 
            <div
                ref={this.canvasWrapperRef} 
                id="canvas-wrapper">

                <canvas
                    id="canvas"
                    ref={this.canvasRef} 
                    onClick={(evt) => this.OnClick(evt) }></canvas>
            </div>)
    }
}
