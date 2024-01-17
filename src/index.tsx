import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

import './index.less';

const root = document.getElementById('root') as HTMLDivElement;
createRoot(root).render(<App />);
