import { types } from 'config';
import React from 'react';
import { Icon } from 'react-fa';
import { PropTypes, styled } from 'utils/create';
import { colors } from 'utils/index';

const Wrapper = styled.span`
  background-color: ${({ type }) => types[type].color};
  border-radius: 3px;
  padding: 0.5rem;
  font-size: 1rem;
  width: 2rem;
  text-align: center;
  color: ${colors.white};
`;

const FieldTypeIcon = ({ type }) => (
  <Wrapper type={type}>
    <Icon name={types[type].icon} />
  </Wrapper>
);

FieldTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FieldTypeIcon;
