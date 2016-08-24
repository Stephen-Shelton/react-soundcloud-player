var TrackList = React.createClass({

  render: function() {
    // console.log('test for queue', this.props.queue);
    var keyID = 0;

    var songList = this.props.queue.map( function(track) {
      // console.log('test in tracklist.js', track);
      return (
        <Track
          clickTrack = { this.props.clickTrack }
          track = { track }
          key = { track.id + '?' + keyID++ }
          keyID = { keyID }
        />
      );
    }.bind(this));

    // console.log('test for songlist', songList);

    return (
      <div className="col-md-12">
        { songList }
      </div>
    );
  }
});
