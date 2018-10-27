import { Col, Row } from 'antd';
import { colors } from 'utils';
import { styled, PropTypes, React } from 'utils/create';

const Header = styled.h1({
  margin: 0,
});

const Description = styled.p({
  fontStyle: 'italic',
  color: colors.gray,
});

const SectionHeader = ({ title, description, action }) => (
  <Row type="flex" align="middle">
    <Col span={action ? 12 : 24}>
      <Header>{title}</Header>
      <Description>{description}</Description>
    </Col>
    {action && (
      <Col span={12} align="right">
        {action}
      </Col>
    )}
  </Row>
);

SectionHeader.propTypes = {
  action: PropTypes.node,
  description: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

SectionHeader.defaultProps = {
  action: [],
};

export default SectionHeader;
