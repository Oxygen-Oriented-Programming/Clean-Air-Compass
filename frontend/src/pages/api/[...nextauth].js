import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

var user_credential = [];
export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: 'Github client ID',
      clientSecret: 'Github Secret',
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      var user_token = token.token.account;

      return token;
    },
    async session({ session, token, user }) {
      user_credential = {
        provider: 'github',
      };
      if (token.token.account.access_token) {
        user_credential['auth_token'] = token.token.account.access_token;
      }
      if (token.token.account.id_token) {
        user_credential['auth_token'] = token.token.account.id_token;
      }

      return user_credential;
    },
  },
});
