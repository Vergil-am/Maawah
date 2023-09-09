import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";


const options: NextAuthOptions = {
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: "Maawah",
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'hello@email.com'
        },
        password: {
          label: "password",
          type: "text",
          placeholder: "*****"
        }
      },
      async authorize(credentials, req) {
        //TODO: send api call
        const res = await axios.post("http://localhost:5000/auth/signin", {
          email: credentials?.email,
          password: credentials?.password
        });

        if (res.data) {
          return res.data
        } else {
          return null
        }

      }
    })
  ]
}

const handler = NextAuth(options)
export { handler as GET, handler as POST }
