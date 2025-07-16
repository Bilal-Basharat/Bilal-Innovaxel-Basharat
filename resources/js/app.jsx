import React, { StrictMode } from 'react';
import './bootstrap';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Pages/AppRoutes';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('app')).render(
    <StrictMode>
        <ToastContainer />
        <AppRoutes />
    </StrictMode>
)