import React, { FC } from 'react';

// Components
import { Container } from '~widgets/Container';
import { getLayout } from '~widgets/MainLayout';

const Commands: FC = () => {
  return getLayout(
    <Container>
      commands
    </Container>
   );
}

export default Commands;