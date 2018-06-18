import { Col, Row } from 'antd';
import { PropTypes, React, glamorous } from 'utils/create';

const Header = glamorous.h1({
  margin: 0,
});

export const SectionHeader = ({ title, description, action }) => (
  <Row type="flex" align="middle">
    <Col span={action ? 12 : 24}>
      <Header>{title}</Header>
      <p>{description}</p>
    </Col>
    {action && (
      <Col span={12} align="right">
        {action}
      </Col>
    )}
  </Row>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.node,
};

SectionHeader.defaultProps = {
  action: [],
};

export default SectionHeader;
