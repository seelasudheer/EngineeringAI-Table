import React,{Component} from 'react'

class JsonData extends React.Component {
    constructor(props){
        super(props)
        this.state={
           data:props.location.state
        }
        console.log(this.state.data,"dadta");
        
    }
    render(){
        return(
            <div  style={{padding:"15px"}} >
                <h1>Raw Json</h1> <br/>
                {JSON.stringify(this.state.data)}
            </div>
        )
    }
}
export default JsonData