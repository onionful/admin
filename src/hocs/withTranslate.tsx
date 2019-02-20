import { IWithTranslate } from 'hocs';
import { fromJS } from 'immutable';
import { noop } from 'lodash';
import React, { ComponentClass, FunctionComponent } from 'react';
import { getTranslate, withLocalize } from 'react-localize-redux';
import { compose, connect, getDisplayName } from 'utils/create';

export default (WrappedComponent: ComponentClass) => {
  const WithTranslate: FunctionComponent<IWithTranslate> = props => <WrappedComponent {...props} />;

  WithTranslate.displayName = `WithTranslate(${getDisplayName(WrappedComponent)})`;

  WithTranslate.defaultProps = {
    _: noop,
  };

  const mapStateToProps = (state: any): IWithTranslate => ({
    _: (id, data, options) =>
      getTranslate(state.get('localize'))(id, fromJS(data || {}).toJS(), options),
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
