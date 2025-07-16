import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const ShortenUrl = lazy(() => import("./ShortenUrl/Create"));

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/shorten-url" />} />
                <Route path="/shorten-url" element={<ShortenUrl />} />
            </Routes>
</Router>
    );
};

    export default AppRoutes;