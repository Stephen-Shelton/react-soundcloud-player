var Track = React.createClass({

  clickTrack: function() {
    if(this.props.clickTrack) {
      this.props.clickTrack(this.props.track, this.props.keyID);
    }
  },

  render: function() {
    var track = this.props.track;
    // console.log('log for track', track);
    var snoop = "http://www.soulbounce.com/soul/wp-content/uploads/blog_images_12_12/snoop-lion-literally.jpg";

    var artworkUrl = track.artwork_url || snoop ;
    return (
      <div className="track clickable" onClick={ this.clickTrack }>
        <div>
          <label className="title">
            { track.title }
          </label>
          <br/>
          <label>
            { track.album }
          </label>
        </div>
        <img className="artwork img-circle" src={ artworkUrl } />
      </div>
    );
  }
});
