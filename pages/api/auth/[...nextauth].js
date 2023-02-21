import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

var user_credential = []

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: '1005718204366-tbjlqqhbjor349kpshags3kedmhomul9.apps.googleusercontent.com',
            clientSecret: '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',
        }),
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            var user_token = token.token.account
            return token;
        },
        async session({ session, token, user }) {
            user_credential = {
                "provider": token.token.account.provider,
            }
            if (token.token.account.access_token) {
                user_credential["auth_token"] = token.token.account.access_token
            }
            if (token.token.account.id_token) {
                user_credential["auth_token"] = token.token.account.id_token
            }
            return user_credential
        }
    },
    // secret: "G98di5p1KYGycZRa9wOhULNe0uwEv9JwPOv1Nw+wWZI=",
    // jwt: {
    //     secret: "G98di5p1KYGycZRa9wOhULNe0uwEv9JwPOv1Nw+wWZI=",
    //     encryption: true,
    // },
});