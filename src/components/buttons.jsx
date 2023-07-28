function Buttons({start,pause,reset, on,}) {
    return ( 
        <div className="btn_box">
        {!on ? <img  alt="play_button" className="actionButton" onClick={start} src="playButton.svg"  /> :
         <img alt="pause_button" className="actionButton" onClick={pause} src="pauseButton.svg"/>
        }
        <img alt="reset_button" className="actionButton" onClick={reset} src="replayButton.svg"/> 
        </div>
     );
}

export default Buttons;