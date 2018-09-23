import { Col, Row } from 'antd';
import { colors } from 'utils';
import { glamorous, PropTypes, React } from 'utils/create';

const Header = glamorous.h1({
  margin: 0,
});

const Description = glamorous.p({
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
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.node,
};

SectionHeader.defaultProps = {
  action: [],
};

export default SectionHeader;
