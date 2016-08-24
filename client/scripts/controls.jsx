var Controls = React.createClass({
  //set initial properties for state
  getInitialState: function() {
    return {
      tracksToChoose: [],
      tracksToPlay: [],
      currentSong: null
    };
  },

  //initialize soundcloud and send get request for data
  componentWillMount: function() {
    SC.initialize({
      client_id: this.props.soundCloudKey
    });
    //reminder to invoke search function here
    this.searchSoundcloud();

  },

  //capture what we type, and run it through search function
  searchHandler: function(event) {
    this.searchSoundcloud(event.target.value);
  },

  //function to search soundcloud for tracks in search bar/input box
  searchSoundcloud: _.debounce(
    function(searchTerm) {
      SC.get("/tracks", { q: searchTerm })
        .then(function(tracks) {
          this.setState({ 'tracksToChoose': tracks });
          // console.log(this.state.tracksToChoose);
        }.bind(this));
    }, 600),

  //function to add song to playlist (tracksToPlay)
  addTrack: function(track) {
    var tracksToPlay = this.state.tracksToPlay.slice();
    tracksToPlay.push(track);
    var newCurrentSong = this.state.currentSong || track;
    this.setState({
      tracksToPlay: tracksToPlay,
      currentSong: newCurrentSong
    });
  },

  removeTrack: function(track, key) {
    var tracksToPlay = this.state.tracksToPlay.slice();
    //var indexOfRemovedTrack = tracksToPlay.indexOf(track);
    tracksToPlay.splice(key, 1);
    this.setState({
      tracksToPlay: tracksToPlay
    });
  },

  skipSong: function() {
    var tracksToPlay = this.state.tracksToPlay;
    var track = null;
    if(tracksToPlay.length > 0) {
      tracksToPlay = tracksToPlay.slice(1);
      track = tracksToPlay[0];
    }
    this.setState({
      tracksToPlay: tracksToPlay,
      currentSong: track
    });
  },

  render: function() {
    var nextTracks = this.state.tracksToPlay.slice(1);

    return (
      <div className="container-fluid form-group">
        <div className="form-group col-lg-12">
          <input className="form-control searchBar" onChange={ this.searchHandler } placeholder='Search for music already!'/>
        </div>
        <div className="col-sm-12">
          <SongPlayer
            skipSong = { this.skipSong }
            song = { this.state.currentSong }
          />
        </div>
        <div className="col-sm-12">
          <label>Next</label>
        </div>
        <div className="next col-lg-12">
            <TrackList
              clickTrack = { this.removeTrack }
              queue = { nextTracks }
            />
        </div>
        <div className="playlist">
          <TrackList
            clickTrack = { this.addTrack }
            queue = { this.state.tracksToChoose }
          />
        </div>
      </div>
    );
  }
});
