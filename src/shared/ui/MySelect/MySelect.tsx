import { FC } from 'react';

// Config
import { IOptions } from './types';

// Components
import { Select } from 'antd';

// Styles
import cl from 'classnames';

interface MySelectProps {
  className?: string;
  options: IOptions[];
  defaultValue?: string;
  onChange: (option: string) => void;
}

export const MySelect: FC<MySelectProps> = ({ className, options, defaultValue, onChange }) => {
  return (
    <Select className={cl(className)} defaultValue={defaultValue} onChange={option => onChange(option)}>
      {options.map(option => (
        <Select.Option key={option.value} value={option.value}>
          {option.text}
        </Select.Option>
      ))}
    </Select>
  );
};
