import React from 'react';
import './Step.scss'
const Step = (props) => {

    return (
        <div className={props.step.isValid ? 'step valid' : 'step invalid'}>
            
            <div className="title">
                {props.step.title}
            </div>
            {props.current}
            <div  className='progressbar'>
                <div className={props.step.style}></div>
            </div>
        </div>
    )
}

export default Step