import React from 'react'
interface Props {
    name:string;
    enthusiumLevel?:number 
}
interface State {
    currentLevel:number;
}
class Hello extends React.Component<Props ,State> {
    state={currentLevel:this.props.enthusiumLevel || 1}

    handleIncrement=()=> {
        this.updateCurrentLevel(1)
    }
    handleDecrement=()=> {
        this.updateCurrentLevel(-1)
    }
    updateCurrentLevel=(change:number) => {
        this.setState((currentLevel)=>{return {currentLevel:this.state.currentLevel +change}})
    }
    render() {

        const {name}=this.props;
        if(this.state.currentLevel <=0) {
            throw new Error("error!!")
        }
       


        return (
           <div className='hello'>
            <div className='greeting'>
          <h1> Hellop {name} {getExclamation(this.state.currentLevel)}</h1>
            </div>
            <button onClick={this.handleIncrement}>Increment</button>
            <button onClick={this.handleDecrement}>Decrement</button>
           </div>
        );

    }

}

export default Hello;

function getExclamation(numChars:number){
    return Array(numChars+1) .join("!");
}