import { Icon } from 'react-fa';
import { colors } from 'utils/index';
import { glamorous, PropTypes, React } from 'utils/create';
import { types } from 'config';

const Wrapper = glamorous.span(({ type }) => ({
  backgroundColor: types[type].color,
  borderRadius: '3px',
  padding: '.5rem',
  fontSize: '1rem',
  width: '2rem',
  textAlign: 'center',
  color: colors.white,
}));

const ContentTypeIcon = ({ type }) => (
  <Wrapper type={type}>
    <Icon name={types[type].icon} />
  </Wrapper>
);

ContentTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ContentTypeIcon;
