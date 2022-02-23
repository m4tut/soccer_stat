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
}

export const Viewer: FC<ViewerProps> = ({ className, children, onChange, totalCountElem, defaultPageSize }) => {
  return (
    <div className={cl(className, styles['viewer'])}>
      <div className={cl(styles['viewer__content'])}>{children}</div>

      <div className={cl(styles['viewer__pagination'])}>
        <Pagination
          onChange={num => onChange(num - 1)}
          defaultCurrent={1}
          showSizeChanger={false}
          defaultPageSize={defaultPageSize}
          total={totalCountElem}
        />
      </div>
    </div>
  );
};
