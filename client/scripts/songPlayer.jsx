var SongPlayer = React.createClass({
  getInitialState:function(){
    return {};
  },

  componentDidUpdate:function(prevProps, prevState) {
      if(this.props.song && !(this.state.player && this.props.song === prevProps.song)){
        this.start();
      }
  },

  start:function(){
    SC.stream('/tracks/'+ this.props.song.id).then(
      function(player){
        this.setUpPlayer(player);
      }.bind(this)).catch(function(error) {
        console.log(error);
        this.skip();
      });
  },

  setUpPlayer:function(player){
    player.seek(0);
        this.setState({player:player, isPlaying:true});

        player.play();
        console.log('setting up');

        player.on('time', function(){
          if(this.state.player){
            this.setState({currentTime:player.currentTime()});
          }
        }.bind(this));
        player.on('finish', this.skip);
  },

  pausePlay:function(){
    if(this.state.isPlaying){
      this.pause();
      this.setState({isPlaying:false});
    }
    else{
      this.play();
      this.setState({isPlaying:true});
    }
  },

  pause:function(){
    if(this.state.player){
      this.state.player.pause();
    }
  },

  play:function(){
    if(this.state.player){
      this.state.player.play();
    }
  },

  skip:function(){
    console.log(this.props.song);
    this.pause();
    this.setState({player:null, currentTime:0, isPlaying:false});
    this.props.skipSong();
  },

  getFormattedSongTime:function(){
    var min = (this.state.currentTime/1000/60) << 0;
    min = min < 10 ? '0' + min : min;

    var sec = Math.floor((this.state.currentTime/1000) % 60);
    sec = sec < 10 ? '0' + sec : sec;

    return min + ":" + sec;
  },

  render:function(){

    var time = this.getFormattedSongTime();

    var playerHtml = "";
    if(this.state.currentTime && this.state.player){

      var progress = (this.state.currentTime / this.props.song.duration) * 100;
      playerHtml =
        <div style={{float:'right', marginTop:'5em'}}>
          <button className='fl control-button' onClick={this.pausePlay}>
            {this.state.isPlaying ? 'Pause' : 'Play'}
          </button>

          <div className='fl' >
            <ProgressBar
              progress = {progress}
              className="progress-bar"
              style="width: 60%;"
            />
            <label>{time}</label>
          </div>
          <button className='fl control-button' onClick={this.skip}>
            Next
          </button>
        </div>;

    }


    return (
      <div style={{width:'50em'}}>
        {
          (this.props.song) ?
            <Track
              clickTrack = {this.skip}
              track={this.props.song}
              key={this.props.song.id}
              style={{transform:'scale(.8)'}}/>
          : <p>No song</p>
        }

        {playerHtml}
      </div>);

  }
});
