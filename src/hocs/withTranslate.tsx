import { IWithTranslate } from 'hocs';
import { noop } from 'lodash';
import React, { ComponentClass, FunctionComponent } from 'react';
import { getTranslate, withLocalize } from 'react-localize-redux';
import { ApplicationState } from 'reducers';
import { compose, connect, getDisplayName } from 'utils/create';

export default (WrappedComponent: ComponentClass) => {
  const WithTranslate: FunctionComponent<IWithTranslate> = props => <WrappedComponent {...props} />;

  WithTranslate.displayName = `WithTranslate(${getDisplayName(WrappedComponent)})`;

  WithTranslate.defaultProps = {
    _: noop,
  };

  const mapStateToProps = (state: ApplicationState) => ({
    _: getTranslate(state.localize),
  });

  return compose(
    connect<IWithTranslate, any, any, ApplicationState>(
      mapStateToProps,
      null,
      null,
      { forwardRef: true },
    ),
    withLocalize,
  )(WithTranslate);
};
