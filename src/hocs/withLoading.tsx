import { ClassNames } from '@emotion/core';
import { Spin } from 'antd';
import { WithLoadingProps } from 'hocs/types';
import React, { ComponentType, FunctionComponent } from 'react';
import { ApplicationState } from 'reducers';
import { isSomeLoading } from 'reducers/loading';
import { connect } from 'utils/create';

export default <P extends {}>(type: string | string[], showSpinner = true) => (
  WrappedComponent: ComponentType<P & WithLoadingProps>,
) => {
  const WithLoading: FunctionComponent<WithLoadingProps> = ({ isLoading, ...props }) =>
    showSpinner ? (
      <ClassNames>
        {({ css }) => (
          <Spin
            spinning={isLoading}
            wrapperClassName={css`
              width: 100%;
            `}
          >
            <WrappedComponent {...props as P} isLoading={isLoading} />
          </Spin>
        )}
      </ClassNames>
    ) : (
      <WrappedComponent {...props as P} isLoading={isLoading} />
    );

  const mapStateToProps = (state: ApplicationState): WithLoadingProps => ({
    isLoading: isSomeLoading(state, ([] as string[]).concat(type)),
  });

  return connect(mapStateToProps)(WithLoading);
};
