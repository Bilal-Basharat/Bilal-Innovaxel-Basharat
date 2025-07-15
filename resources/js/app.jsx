import React, { StrictMode } from 'react';
import './bootstrap';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Pages/AppRoutes';

ReactDOM.createRoot(document.getElementById('app')).render(
    <StrictMode>
        <AppRoutes />
    </StrictMode>
)