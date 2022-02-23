import { FC, FormEvent, ReactNode } from 'react';

// Components
import { Input } from 'antd';

// Styles
import cl from 'classnames';
import styles from './PageSearch.module.scss';
import Search from 'antd/lib/input/Search';

interface PageSearchProps {
  className?: string;
  children?: ReactNode;
  value?: string;
  placeholder?: string;
  onSearch: (str: string) => void;
}

export const PageSearch: FC<PageSearchProps> = ({ className, children, value, onSearch, placeholder }) => {
  return (
    <Input.Group compact className={cl(className, styles['input-group'])}>
      {children}
      <Search value={value} placeholder={placeholder} onSearch={(str) => onSearch(str.toLowerCase())} enterButton />
    </Input.Group>
  );
};
