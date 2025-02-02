import { withAuth } from "next-auth/middleware";

// `withAuth` augments your `Request` with the user's token.
export default withAuth({
    // Callbacks are asynchronous functions you can use to control what happens when an action is performed.
    callbacks: {
        authorized: ({ token, req }) => {
            console.log('token', token);

            if (req.nextUrl.pathname.startsWith('/admin')) {
                return token?.role === 'admin'; // true = auth || false = not auth
            } else if (req.nextUrl.pathname.startsWith('/account')) {
                return token?.role === 'customer'; // true = auth || false = not auth
            } else {
                return false;
            }
        },
    },
}); 

// export default withAuth({}); // if empty {} means whole application is protected

export const config = {
    matcher: ['/admin(/.*)?', '/account(/.*)?'], // /admin is protected and ? will handle admin/*
};