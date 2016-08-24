var MyApp = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="header">
          Stephen's JukeBox
        </h1>
        <Controls soundCloudKey={ SOUND_CLOUD_KEY }/>
      </div>
    )
  }
});

React.render(<MyApp />, document.getElementById('app'));
