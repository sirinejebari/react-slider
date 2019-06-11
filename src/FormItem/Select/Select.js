import React from 'react';
import './Select.scss'
import { setValue } from '../../store/Actions'
import store from '../../store/Store'
class Select extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
    }

    componentWillMount() {
        this.setState({
            value: this.props.value
        })
    }
    selectOption(value) {
        this.setState({
            value: this.state.value === value ? '' : value
        }, () => {
            let valueToDispatch = {}
            valueToDispatch[this.props.step.title] = this.state.value
            store.dispatch(setValue(valueToDispatch))
        })

    }
    render() {
        let options = [];
        this.props.step.data.map((op, index) => {
            options.push(
                <div key={op.value} value={op.value} onClick={() => this.selectOption(op.value)} className={this.state.value === op.value ? 'option-container selected' : 'option-container '} >
                    <option >
                        {op.label}

                    </option>
                    {this.state.value === op.value ? <i className="fas fa-check-circle"></i> : ''}
                </div>
            )
        })
        return (
            <div className={this.props.step.invalid ? 'select invalid': 'select valid'}>
                <div className="title">
                    {this.props.step.label}
                </div>
                <div className="options">
                    {options}
                </div>
                {this.props.step.invalid ? 
                <div className="error">Champ erroné</div>: ''}
            </div>
        )
    }
}

export default Select;