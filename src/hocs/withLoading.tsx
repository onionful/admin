import { ClassNames } from '@emotion/core';
import { Spin } from 'antd';
import { WithLoadingProps } from 'hocs/types';
import React, { ComponentType, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'reducers';
import { isSomeLoading } from 'reducers/loading';

export default (type: string | string[], showSpinner = true) => <P extends {}>(
  WrappedComponent: ComponentType<P & WithLoadingProps>,
) => {
  const WithLoading: FunctionComponent<P> = props => {
    const isLoading = useSelector((state: ApplicationState) =>
      isSomeLoading(state, ([] as string[]).concat(type)),
    );

    return showSpinner ? (
      <ClassNames>
        {({ css }) => (
          <Spin
            spinning={isLoading}
            wrapperClassName={css`
              width: 100%;
            `}
          >
            <WrappedComponent {...(props as P)} isLoading={isLoading} />
          </Spin>
        )}
      </ClassNames>
    ) : (
      <WrappedComponent {...(props as P)} isLoading={isLoading} />
    );
  };

  return WithLoading;
};
