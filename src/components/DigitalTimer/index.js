import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onStartOrPauseTimer = () => {
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onDecreaseTimerLimit = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 0) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaceTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitControllerSection = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="set-timer-container">
        <button
          type="button"
          className="controllers-button set-timer-buttons"
          onClick={this.onDecreaseTimerLimit}
          disabled={isButtonsDisabled}
        >
          -
        </button>
        <div className="set-timer-bg">
          <p className="set-timer">{timerLimitInMinutes} </p>
        </div>

        <button
          type="button"
          className="controllers-button set-timer-buttons"
          onClick={this.onIncreaceTimerLimit}
          disabled={isButtonsDisabled}
        >
          +
        </button>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerControllerSection = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controllers-bg">
        <button
          type="button"
          className="controllers-button timer-controllers-section"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            className="timer-controllers-image"
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
          />
          <p className="timer-controllers-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="controllers-button timer-controllers-section"
          onClick={this.onClickReset}
        >
          <img
            className="timer-controllers-image"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="timer-controllers-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="digital-timer-app">
        <h1>Digital Timer</h1>
        <div className="timer-details-container">
          <div className="timer-container-bg">
            <div className="timer-bg">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-status">{labelText}</p>
            </div>
          </div>

          <div className="timer-controllers-container">
            {this.renderTimerControllerSection()}
            <p className="timer-limit-text">Set Timer Limit</p>
            {this.renderTimerLimitControllerSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
