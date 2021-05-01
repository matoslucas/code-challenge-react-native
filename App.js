import * as React from 'react';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light as theme} from '@eva-design/eva';

import FormPrincipal from './com/FormPrincipal';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <FormPrincipal />
    </ApplicationProvider>
  </>
);
