import React from 'react'
import Step from './Step'
import './Stepper.scss'
class Stepper extends React.Component {

    render() {
        let questions = []
        
        this.props.steps.map( (step, index) => {
                step[1].title = step[0]
                step[1].style= index < this.props.currentStep ? 'valid': index > this.props.currentStep ? 'untouched' : 'current';
                if(index > 0) {
                    questions.push(<div  key={index+'sep'} className="separator">
                       <div></div> 
                    </div>)
                }
                questions.push(
                    <Step key={index} step={step[1]}  current={this.props.currentStep === index}></Step>
                )                
            
        })
        return (
            <div className="stepper">
                {questions}
            </div>
        )
    
    }
}

export default Stepper