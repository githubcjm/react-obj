import React,{
    Component
} from 'react'
class Niming extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'千峰教育'
        }
    }
    componentDidMount(){
        //获取id
        console.log(this.props.match.params);
        
    }
    render(){
        return (
            <div>
                匿名投诉
            </div>
        )
    }
}

export default Niming