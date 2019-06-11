import React from 'react';
import './App.scss';
import Stepper from './stepper/Stepper'
import FormItem from './FormItem/FormItem';
import store from './store/Store'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
      loading: true,
      value: {},
      steps: [],
      showResults: false
    }
  }

  validateCurrentStep() {
    let valid = true;
    let stepNAme = this.state.steps[this.state.currentStep][0]
    let step = this.state.steps[this.state.currentStep][1]
    let currentVal = this.state.value[stepNAme]
    valid = currentVal !== null && currentVal !== undefined && currentVal !== '';
    if (step.option.max) {
      valid = valid && (step.option.max > currentVal)
    }
    if (step.option.min) {
      valid = valid && (currentVal > step.option.min)
    }
    let temp = this.state.steps;
    temp[this.state.currentStep][1].invalid = !valid
    this.setState({
      steps: temp
    })
    return valid

  }
  nextQuestion() {
    let valid = this.validateCurrentStep()
    let temp = this.state.steps;
    temp[this.state.currentStep][1].invalid = !valid
    this.setState({
      steps: temp
    })
    if (valid && this.state.currentStep < this.state.steps.length - 1) {
      this.setState({
        currentStep: this.state.currentStep + 1
      })
    }
  }
  previousQuestion() {
    if (this.state.currentStep > 0) {
      this.setState({
        currentStep: this.state.currentStep - 1
      })
    }
  }
  componentDidMount() {
    axios.get(' http://www.mocky.io/v2/5cff6faa3200008000eac624')
   // axios.get('http://localhost:9888/api/questionnaire')
      .then((response) => {
        this.setState({
          loading: false,
          steps: Object.entries(response.data.questionnaire)
        }
        )
      })
      .catch((error) => {
        console.log(error)
        alert(`Error: can't get data from API.`)
        this.setState({
          loading: false
        })
      })


    const unsubscribe = store.subscribe(() => {
      this.setState({ value: store.getState().formValue }, () => {
        this.validateCurrentStep()
      })

    })
    this.setState({
      unsubscribe: unsubscribe
    })
  }

  componentWillUnmount() {
    this.state.unsubscribe()
  }

  showResults() {
    let valid = this.validateCurrentStep()
    let temp = this.state.steps;
    temp[this.state.currentStep][1].invalid = !valid
    this.setState({
      steps: temp,
      showResults: valid
    })
  }
  render() {
    let resultsDisplay = [];
    if (this.state.showResults) {
      let results = Object.entries(this.state.value);

      results.map(rslt => {
        resultsDisplay.push(
          <div key={rslt[0] + 'display'} className="item">
            <div className="item-title">{rslt[0]}</div>
            <div className="value"> {rslt[1]}</div>
          </div>
        )
      })

    }
    return (
      <div className="App">
        {
          !this.state.showResults ?

            <div className="content">
              <Stepper steps={this.state.steps} currentStep={this.state.currentStep}></Stepper>
              {
                this.state.steps && this.state.steps.length ?
                  <FormItem value={this.state.value[this.state.steps[this.state.currentStep][0]]} index={this.state.currentStep} question={this.state.steps[this.state.currentStep][1]}></FormItem>
                  : <div> {
                    this.state.loading ? 'Loading...' : 'Quesionnaire is empty!'
                  }</div>
              }
              <div className="navigation">
                {
                  this.state.currentStep > 0 ? <button onClick={() => this.previousQuestion()}>Previous</button> : ''
                }
                {
                  this.state.currentStep < this.state.steps.length - 1 ?
                    <button onClick={() => this.nextQuestion()}>Next</button> : <div>
                      {this.state.steps.length ?
                        <button onClick={() => this.showResults()}>Afficher Resultat</button> : ''}
                    </div>
                }
              </div>
            </div> :


            <div className="results">
              <div className="title">Results</div>
              <div>{resultsDisplay}</div>
              <button>Submit</button>

            </div>

        }

      </div>
    );
  }
}


export default App;
