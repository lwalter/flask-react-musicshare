import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Alert } from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import { removeError } from '../actions/ActionCreators.jsx';

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  removeError() {
    this.props.actions.removeError();
  }

  render() {
    return (
      <Alert bsStyle="danger">
        <h4>Uh oh, something went wrong...</h4>
        <p>{this.props.errorMsg}</p>
        <Button onClick={this.removeError.bind(this)}>Dismiss</Button>
      </Alert>
    )
  }
}

Error.propTypes = {
  errorMsg: React.PropTypes.string.isRequired,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errorMsg: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ removeError }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);