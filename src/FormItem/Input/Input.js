import React from 'react'
import './Input.scss';
import { setValue } from '../../store/Actions'
import store from '../../store/Store'
export default class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            valid: null,
            isFocused: false
        }
    }

    componentWillMount() {
        this.setState({
            value: ( this.props.value &&  this.props.value!== null) ?  this.props.value: this.state.value
        })
    }

    validateAndUpdate(event) {
        let value = isNaN(event.target.value) ? event.target.value : parseInt(event.target.value);
        let valid = false;
        if (this.props.step.option && (this.props.step.option.max || this.props.step.option.min)) {
            let max = this.props.step.option.max;
            let min = this.props.step.option.min;
            if ((max && max < value) || (min && value < min)) {
                valid = false
            } else {
                valid = true
            }
        } else {
            valid = true
        }
        this.setState({
            value: value,
            valid: valid
        })
        let valueToDispatch = {}
        valueToDispatch[this.props.step.title] = value
        store.dispatch(setValue(valueToDispatch))

    }

    onFocus() {
        this.setState({
            isFocused: true
        })
    }

    onBlur() {
        this.setState({
            isFocused: false
        })
    }

    render() {
        return (
            <form className="input">
                <div className="title">
                    {this.props.step.label}
                </div>
                <input value={this.state.value} onChange={(e) => this.validateAndUpdate(e)}
                    onFocus={() => this.onFocus()} onBlur={() => this.onBlur()}
                    className={this.props.step.invalid && !this.state.isFocused ? 'text-input invalid' : 'text-input valid'}
                    max={this.props.step.option.max}
                    min={this.props.step.option.min} required></input>
                {this.props.step.invalid && !this.state.isFocused ?
                    <div className="error">Champ erroné</div> : ''}
            </form>
        )
    }
}