import { Identifier } from 'components/Form';
import { withTranslate } from 'helpers';
import { Fields } from 'redux-form/immutable';
import { compose, PropTypes, React } from 'utils/create';

const Name = ({ type }) => <Fields component={Identifier} names={[type, 'id']} />;

Name.propTypes = {
  type: PropTypes.string.isRequired,
};

export default compose(withTranslate)(Name);
