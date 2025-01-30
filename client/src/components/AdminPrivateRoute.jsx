import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export function AdminPrivateRoute() {
    const { currentUser } = useSelector(state => state.user);

    // Check if currentUser is available and if they are an admin
    if (!currentUser) {
        return <Navigate to='/adminSignIn' />;
    }

    return currentUser.isAdmin ? <Outlet /> : <Navigate to='/adminSignIn' />;
}

export function IsAdminLogout() {
    const { currentUser } = useSelector(state => state.user);

    // Check if currentUser exists and ensure they are not an admin
    if (!currentUser) {
        return <Outlet />;
    }

    return !currentUser.isAdmin ? <Outlet /> : <Navigate to='/dashboard' />;
}