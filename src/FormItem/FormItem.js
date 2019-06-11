import React from 'react';
import Select from './Select/Select'
import Input from './Input/Input';
export default class FormItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index: null}
    }
    
    render() {
        switch(this.props.question.type) {
            case 'select':
                return <Select value={this.props.value} key={this.props.index} step={this.props.question}></Select>
            case 'input':
                return <Input key={this.props.index}  value={this.props.value} step={this.props.question}></Input>
                default:
                    return `Question type ${this.props.question.type} not supported`
        }
        
    }
}