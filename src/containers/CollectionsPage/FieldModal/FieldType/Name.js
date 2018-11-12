import { InputWithId } from 'components/Form';
import { withTranslate } from 'helpers';
import { camelCase } from 'lodash';
import { compose, PropTypes, React } from 'utils/create';

const Name = ({ _, type, form }) => (
  <InputWithId
    form={form}
    idKey="id"
    idLabel={_('collections.attributes.id')}
    normalize={camelCase}
    valueKey={type}
    valueLabel={_(`collections.attributes.${type}`)}
  />
);

Name.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

export default compose(withTranslate)(Name);
