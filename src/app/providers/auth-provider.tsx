'use client';

// we have our session data in server side but need to access on client side to know it user auth or not - to get session data on client we need to wrap children with session provider

import React from 'react';
import { SessionProvider } from 'next-auth/react';

// todo: add proper session type
const AuthProvider = ({ children, session }: { children: React.ReactNode; session: any }) => {
    //just pass session data - we get it from parent component which has session availble gloablly
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;