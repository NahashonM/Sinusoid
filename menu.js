
class MenuItem extends React.Component 
{
    constructor(props) {
        super(props)

        this.state = {value: props.min }
        this.inputRef = React.createRef();
    }


    OnChange(evt) {
        this.setState( {value: evt.target.value } )
    }

    render ()  {
        return( 
            <div className="menu-item">
                <div className="item-title"> { this.props.name } </div>
                <div className="item-values">
                    <input  type="range"
                            value= {this.state.value}
                            min={this.props.min}
                            max={this.props.max} 
                            step={this.props.step}
                            onChange={(evt) => this.OnChange(evt)} />

                    <input  ref={this.inputRef} 
                            type="number"
                            value={this.state.value}
                            min={this.props.min}
                            max={this.props.max} />
                </div>
            </div>)
    }
}


class CanvasMenu extends React.Component 
{
    constructor(props) {
        super(props)
        this.state = { collapsed: true}
    }

    OnClick = (evt) => { this.setState( {collapsed: !this.state.collapsed } ) }

    render ()  {
        return( 
            <div className="menu-container no-select">
                <div className="menu-titlebar" onClick={(evt) => this.OnClick(evt)}>
                    {this.state.collapsed? "\u25BA": "\u25BC"} Menu
                </div>

                <div className={`menu-items ${this.state.collapsed? "hidden":""}`}>
                    <MenuItem name="Amplitude" min={0} max={200} step={1}/>
                    <MenuItem name="Frequency" min={0.01} max={5} step={0.01}/>
                    <MenuItem name="Phase Angle" min={0} max={360} step={1}/>
                </div>
      
            </div>)
    }
}



class RootMenu extends React.Component 
{
    constructor(props) {
        super(props)
        this.state = { collapsed: true}
    }

    OnAddClick = () => {
        var element = document.createElement("canvas")
        element.className = "canvas"
        element.id = "canvas "

        this.props.container.current.appendChild( 
            React.createElement(WaveCanvas)
        )
    }

    OnSubClick = () => {

    }


    render() {
        return(
            <div className="root-menu no-select">
                <div className="menu-titlebar">
                    <span className="gmenu-entry" onClick={() => this.OnAddClick()}> + </span>
                    <span className="gmenu-entry" onClick={() => this.OnSubClick()}> - </span>
                </div>
            </div>
        )
    }

}