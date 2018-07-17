import { Icon } from 'antd';
import { glamorous, PropTypes, React } from 'utils/create';

const Lock = glamorous(({ locked, onLock, ...props }) => (
  <Icon {...props} type={locked ? 'lock' : 'unlock'} onClick={onLock} />
))({ cursor: 'pointer' });

Lock.propTypes = {
  locked: PropTypes.bool.isRequired,
  onLock: PropTypes.func.isRequired,
};

export default Lock;
