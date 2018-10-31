import { InputWithId } from 'components/Form';
import { withTranslate } from 'helpers';
import { camelCase } from 'lodash';
import { compose, PropTypes, React } from 'utils/create';

const Name = ({ _, type, form }) => (
  <InputWithId
    idKey="id"
    idLabel={_('collections.attributes.id')}
    normalize={camelCase}
    valueKey={type}
    valueLabel={_(`collections.attributes.${type}`)}
    form={form}
  />
);

Name.propTypes = {
  _: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

export default compose(withTranslate)(Name);
