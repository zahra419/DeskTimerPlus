function Buttons({start,pause,reset, on,}) {
    return ( 
        <div className="btn_box">
        {!on ? <img title="play_button"  onClick={start} src="playButton.png"  /> :
         <img title="pause_button" onClick={pause} src="pauseButton.png"/>
        }
        <img title="reset_button" onClick={reset} src="replayButton.png"/> 
        <img title="save_button" src="save.png" />
        </div>
     );
}

export default Buttons;