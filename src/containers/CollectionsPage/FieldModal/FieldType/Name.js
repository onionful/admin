import { InputWithId } from 'components/Form';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Name = ({ _, type, form }) => (
  <InputWithId
    idKey="id"
    idLabel={_('collections.attributes.id')}
    valueKey={type}
    valueLabel={_(`collections.attributes.${type}`)}
    form={form}
  />
);

Name.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};

export default compose(withTranslate)(Name);
