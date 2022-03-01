import { FC, ReactNode } from 'react';

// Components
import { Pagination } from 'antd';

// Styles
import cl from 'classnames';
import styles from './Viewer.module.scss';

interface ViewerProps {
  className?: string;
  children: ReactNode;
  onChange: (num: number) => void;
  defaultPageSize: number;
  totalCountElem: number;
  defaultCurrent?: number;
  current?: number;
}

export const Viewer: FC<ViewerProps> = ({
  className,
  children,
  onChange,
  totalCountElem,
  defaultPageSize,
  defaultCurrent = 1,
  current,
}) => {
  return (
    <div className={cl(className, styles['viewer'])}>
      <div className={cl(styles['viewer__content'])}>{children}</div>

      {totalCountElem > defaultPageSize ? (
        <div className={cl(styles['viewer__pagination'])}>
          <Pagination
            responsive={true}
            onChange={num => onChange(num - 1)}
            defaultCurrent={defaultCurrent}
            showSizeChanger={false}
            defaultPageSize={defaultPageSize}
            total={totalCountElem}
            current={current}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
