
import React from "react"
class Button extends React.Component {
  constructor(props){
    super(props)
  }
   handleClick() {
    console.log("clicked kk")
  }

  render() {
    return(
        <button onClick={this.handleClick}>Click</button>
    )
  }
    
    

    }

export default Button
