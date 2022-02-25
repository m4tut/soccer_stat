import { FC } from 'react';

// Styles
import cl from 'classnames';
import styles from './CommandsItem.module.scss';

interface CommandsItemProps {
  className?: string;
  name: string;
  logo: string;
  onClick: () => void;
}

export const CommandsItem: FC<CommandsItemProps> = ({ className, name, logo, onClick }) => {
  return (
    <div className={cl(className, styles['commands-item'])} onClick={() => onClick()}>
      <div className={cl(styles['commands-item__name'])}>{name}</div>
      <img className={cl(styles['commands-item__img'])} src={logo} alt='commands-logo' />
    </div>
  );
};
