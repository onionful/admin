import { React, Component, PropTypes, compose, connect } from 'utils/create';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { withPermissions } from 'utils';
import { fetchSpaces } from 'reducers/spaces/actions';

class SpacesPage extends Component {
  componentDidMount() {
    const { handleFetchSpaces } = this.props;
    handleFetchSpaces();
  }

  render() {
    const { data, isLoading } = this.props;
    console.log('data', data);
    console.log('isLoading', isLoading);

    return (
      <div>
        <h1>Spaces</h1>
      </div>
    );
  }
}

SpacesPage.propTypes = {
  handleFetchSpaces: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.map,
};

SpacesPage.defaultProps = {
  handleFetchSpaces: noop,
  isLoading: false,
  data: Map(),
};

const mapStateToProps = state => ({
  data: state.getIn(['spaces', 'data']),
  isLoading: state.getIn(['spaces', 'isLoading']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchSpaces: params => dispatch(fetchSpaces(params)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(),
)(SpacesPage);
