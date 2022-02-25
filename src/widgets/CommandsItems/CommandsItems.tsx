import { FC } from 'react';
import { useNavigate } from 'react-router';

// Config
import { ICommandsData } from '~pages/commands/model/types';

// Styles
import cl from 'classnames';
import styles from './CommandsItems.module.scss';
import { CommandsItem } from '~entities/CommandsItem';

// Components

interface CommandsItemsProps {
  data: ICommandsData[];
  className?: string;
}

export const CommandsItems: FC<CommandsItemsProps> = ({ data, className }) => {
  const navigate = useNavigate();
  console.log(data);

  return (
    <div className={cl(className, styles['commands-items'])}>
      {data.map(item => (
        <CommandsItem key={item.id} name={item.name} logo={item.crestUrl} onClick={() => navigate('/commands/' + item.id)} />
      ))}
    </div>
  );
};
