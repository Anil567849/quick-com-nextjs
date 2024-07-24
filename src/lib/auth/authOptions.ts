import GoogleProvider from 'next-auth/providers/google';
import { db } from '../db/db';
import { users } from '../db/schema';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile, token: any) { // it will call after the user sign in
                // console.log('profile', profile);
                // console.log('tokens', token);

                const data = {
                    fname: profile.given_name,
                    lname: profile.family_name,
                    email: profile.email,
                    provider: 'GOOGLE',
                    externalId: profile.sub,
                    image: profile.picture,
                };

                try {
                    const user = await db
                        .insert(users)
                        .values(data)
                        .onConflictDoUpdate({ target: users.email, set: data }) // if email exists then update data only rather than creating
                        .returning(); // return user after creating a user | Return an array

                    return {
                        ...data,
                        name: data.fname,
                        id: String(user[0].id),
                        role: user[0].role,
                    };
                } catch (err) {
                    console.log(err);
                    return {
                        id: '',
                    };
                }
            },
        }),
    ],
    // after user sign in it will run a callback 
    callbacks: {
        session(data: any) { // session data
            return data;
        },
        // This way we can access JWT's data
        jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                // adding jwt't token some extra properties
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
    },
};