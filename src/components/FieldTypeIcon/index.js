import { types } from 'config';
import { Icon } from 'react-fa';
import { PropTypes, React, styled } from 'utils/create';
import { colors } from 'utils/index';

const Wrapper = styled.span(({ type }) => ({
  backgroundColor: types[type].color,
  borderRadius: '3px',
  padding: '.5rem',
  fontSize: '1rem',
  width: '2rem',
  textAlign: 'center',
  color: colors.white,
}));

const FieldTypeIcon = ({ type }) => (
  <Wrapper type={type}>
    <Icon name={types[type].icon} />
  </Wrapper>
);

FieldTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FieldTypeIcon;
