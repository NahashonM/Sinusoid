

class App extends React.Component 
{
    constructor(props) {
        super(props)
    }

    render ()  {
        return( 
            <div id="app-container">
                <div id="root-menu-container">   
                    <RootMenu />
                </div>

                <div id="canvas-container"> 
                    <WaveCanvas />
                </div>
            </div>)
    }
}


ReactDOM.render( <App/>, document.getElementById('root') );


