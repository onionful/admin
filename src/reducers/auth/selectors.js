export const getProfile = state => state.getIn(['auth', 'profile']);

export const getId = state => state.getIn(['auth', 'profile', 'user_id']);

export const isAllowed = (state, permission) => {
  const permissions = getProfile(state).get('permissions');
  return !permission || (permissions && permissions.contains(permission));
};
