import { Col, Row } from 'antd';
import { colors } from 'utils';
import { PropTypes, React, styled } from 'utils/create';

const Header = styled.h1({
  margin: 0,
});

const Description = styled.p({
  fontStyle: 'italic',
  color: colors.gray,
});

const SectionHeader = ({ title, description, action }) => (
  <Row align="middle" type="flex">
    <Col span={action ? 12 : 24}>
      <Header>{title}</Header>
      <Description>{description}</Description>
    </Col>
    {action && (
      <Col align="right" span={12}>
        {action}
      </Col>
    )}
  </Row>
);

SectionHeader.propTypes = {
  description: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  action: PropTypes.node,
};

SectionHeader.defaultProps = {
  action: [],
};

export default SectionHeader;
