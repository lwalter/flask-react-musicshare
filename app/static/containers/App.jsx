import { connect } from 'react-redux';
import App from '../components/App.jsx';

function mapStateToProps(state) {
  return {
    errorMsg: state.error
  }
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
