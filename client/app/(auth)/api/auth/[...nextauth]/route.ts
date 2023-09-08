import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";


const options: NextAuthOptions = {
  // pages: {
  //   signIn: '/signin'
  // },
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
      async authorize(credentials) {
        //TODO: send api call
        console.log(credentials)
        const res = await axios.post("http://localhost:5000/auth/signin", credentials);
        console.log(res)
        // const user = {
        //   id: '2132',
        //   name: "test",
        //   email: "test@email.com",
        //   password: "test123"
        // }
        if (res.data) {
          console.log(res.data)
          return res.data
        } else {
          console.log('failed')
          return null
        }

      }
    })
  ]
}

const handler = NextAuth(options)
export { handler as GET, handler as POST }
