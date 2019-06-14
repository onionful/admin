import { WithTranslateProps } from 'hocs';
import React, { ComponentClass, ComponentType } from 'react';
import { getTranslate, withLocalize } from 'react-localize-redux';
import { ApplicationState } from 'reducers';
import { compose, connect, getDisplayName } from 'utils/create';

export default <P extends {}>(WrappedComponent: ComponentClass) => {
  const WithTranslate: ComponentType<WithTranslateProps> = props => <WrappedComponent {...props} />;

  WithTranslate.displayName = `WithTranslate(${getDisplayName(WrappedComponent)})`;

  const mapStateToProps = (state: ApplicationState): WithTranslateProps => ({
    _: getTranslate(state.localize),
  });

  return compose(
    connect(
      mapStateToProps,
      null,
      null,
      { forwardRef: true },
    ),
    withLocalize,
  )(WithTranslate);
};
