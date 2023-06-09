function Buttons({start,pause,reset, on,}) {
    return ( 
        <div className="btn_box">
        {!on ? <img title="play_button"  onClick={start} src="playButton.svg"  /> :
         <img title="pause_button" onClick={pause} src="pauseButton.svg"/>
        }
        <img title="reset_button" onClick={reset} src="replayButton.svg"/> 
        </div>
     );
}

export default Buttons;