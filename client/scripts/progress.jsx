var ProgressBar = React.createClass({

  render:function(){

    var containerStyles = {
      width:'20em',
      height:'2em',
    };

    var backgroundStyles = {
      width: this.props.progress ? ((this.props.progress/100)*20) +'em' : 'inherit',
      height:'inherit'
    }

    return (
      <div className='progress-container' style={containerStyles}>
        <div className='progress-background2' style={containerStyles}></div>
        <div className='progress-background' style={backgroundStyles}></div>
      </div>);
  }
});
