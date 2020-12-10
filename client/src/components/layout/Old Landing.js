import React, {Fragment, Component, createRef, DOMElement } from 'react'
import buddha from "../buddha.png"
import logo from "../mudra_logo.png"
import introLogo from "../introLogo.svg"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import '../style.css'
import { CSSTransition } from 'react-transition-group';
import TimeField from '../Components/TimeComponent'
import ReactPlayer from 'react-player';


interface IProps {

}

interface IState {
    displayTime: string,
        timer: number,
        showCountdown: boolean,
        appearHome: boolean,
        initialLoad: boolean,
        activeInput: boolean
}

class TimerPage extends Component <IProps, IState> {
    constructor(props: IProps){
        super(props)
        this.state = {
            timer: 1200,
            showCountdown: false,
            displayTime: '20:00',
            appearHome: true,
            initialLoad: true,
            activeInput: false
        }
    }


    componentDidMount = async () => {
        setTimeout(this.appearMainContent , 4000);
        document.addEventListener("keydown", this.handleEscKey, false)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscKey, false)
    }

    handleEscKey = (event: any) => {
        if (event.key === 'Escape')

            this.setState({
                showCountdown: false
            })

    }

    renderTime = (remainingTime?: number) => {
    const bell = require("../bell1.wav")
    if (remainingTime === 0) {

    return (
<Fragment>
<ReactPlayer url={bell} playing volume={0.5}/>
</Fragment>
)
}

return(
    <Fragment>
        <div className="countdown-number">{this.remainingTimeToString(remainingTime)}</div>
    </Fragment>
)
}

remainingTimeToString = (remainingTime?: number) => {
    if (remainingTime === undefined)
        return '00:00'
    else {
        let minutes = Math.floor(remainingTime / 60)
        let seconds = remainingTime - minutes * 60
        let secondsString = seconds.toString()
        let minutesString = minutes.toString()
        if (seconds < 10)
            secondsString = '0'+ seconds
        if (minutes < 10)
            minutesString = '0' + minutes

        return (minutesString + ':' + secondsString)
    }
}

onTimeChange = (event: any, time: string) => {
    let minutes = parseInt(time.slice(0,2))
    let seconds = parseInt(time.slice(3,5))
    let totalSeconds = minutes* 60 + seconds;
    this.setState({
        displayTime: time,
        timer: totalSeconds,
        activeInput: true
    })
}

toggleAppear = () => {
    this.setState({
        appearHome: !this.state.appearHome
    })
}

appearMainContent = () => {
    this.setState({
        initialLoad: false
    })
}

searchOnEnter = (event: any) => {

    if(event.key === 'Enter'){
        this.setState({
            showCountdown: true
        })
    }
}

resetTimer = async() => {
    await (this.setState({showCountdown: false}))

    this.setState({
        showCountdown:true
    })
}

render = () => {
    const {appearHome} = this.state;
    return(

        <Fragment>
            <header>
                <div>
                    <h1>MEDITATION TIMER</h1>
                </div>
            </header>

            <main>
                {this.state.initialLoad ? (
                    <CSSTransition
                        in={appearHome}
                        appear={true}
                        timeout={2000}
                        classNames="fade">
                        <div>
                            <img className="intro-logo" src={introLogo} alt=""/>
                        </div>
                    </CSSTransition>
                ) : (

                    <div className="main-first-wrap">
                        <CSSTransition
                            in={appearHome}
                            appear={true}
                            timeout={1000}
                            classNames="contentfade">
                            <div className="logo">
                                <img src={logo} alt=""/>
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={appearHome}
                            appear={true}
                            timeout={1000}
                            classNames="contentfade">
                            <div className={`main-wrapper ${this.state.showCountdown && 'm-top'}`}>


                                {!this.state.showCountdown && (
                                    <CSSTransition
                                        in={appearHome}
                                        appear={true}
                                        timeout={500}
                                        classNames="contentfade">
                                        <div onKeyPress={this.searchOnEnter}>
                                            <span>SET TIME</span>
                                            <TimeField  className={`timer ${this.state.activeInput && 'timer-active'}`} value={this.state.displayTime} onChange={this.onTimeChange} />
                                        </div>
                                    </CSSTransition>
                                )}


                                {this.state.showCountdown &&
                                <CSSTransition
                                    in={appearHome}
                                    appear={true}
                                    timeout={1000}
                                    classNames="contentfade">
                                    <div className="timer-wrapper">

                                        <CountdownCircleTimer
                                            isPlaying
                                            duration={this.state.timer}
                                            colors={[["#efba96", 0.33], ["#efba96", 0.33], ["#efba96", 0.33]]}
                                            size={300}
                                            trailColor={" "}
                                            strokeWidth={9}
                                        >
                                            {({ remainingTime }) => this.renderTime(remainingTime)}
                                        </CountdownCircleTimer>
                                        <img src={buddha} alt="Buddha" />


                                    </div>
                                </CSSTransition>
                                }

                                {!this.state.showCountdown ?
                                    (<button onClick={() => this.setState({showCountdown: true})}>meditate</button>)
                                    :
                                    (<div className="bottom-btns">
                                        <button onClick={this.resetTimer}>reset</button>
                                        <span className="set-new" onClick={() => this.setState({showCountdown: false, activeInput:false})}>SET NEW TIMER</span>
                                    </div>)
                                }

                            </div>
                        </CSSTransition>
                    </div>
                )}

            </main>

            <footer>
                <div>
                    <h2>INFO</h2>
                </div>
            </footer>
        </Fragment>
    )
}
}

export default TimerPage;