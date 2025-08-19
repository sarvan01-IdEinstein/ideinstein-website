import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { zohoCRM } from '@/lib/zoho/index'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 NextAuth authorize called with:', {
          email: credentials?.email,
          hasPassword: !!credentials?.password
        })

        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing email or password')
          return null
        }

        // Demo credentials for testing
        if (credentials.email === 'demo@ideinstein.com' && credentials.password === 'demo123') {
          console.log('✅ Demo user login')
          return {
            id: 'demo-user',
            email: 'demo@ideinstein.com',
            name: 'Demo User',
            image: null
          }
        }

        // In a real implementation, you would:
        // 1. Hash the password and compare with stored hash
        // 2. Validate against your user database
        // 3. Check user status and permissions
        
        // For now, we'll allow login if the contact exists in Zoho CRM
        // In production, you'd implement proper password verification
        try {
          console.log('🔍 Looking for contact in Zoho CRM...')
          const contact = await zohoCRM.findContactByEmail(credentials.email)
          
          if (contact) {
            console.log('✅ Contact found in Zoho:', {
              id: contact.id,
              name: `${contact.first_name} ${contact.last_name}`,
              email: contact.email
            })
            
            // TODO: In production, verify password here
            // For now, we'll accept any password for existing contacts
            console.log('✅ Password accepted (demo mode)')
            
            return {
              id: contact.id,
              email: contact.email,
              name: `${contact.first_name} ${contact.last_name}`,
              image: null
            }
          } else {
            console.log('❌ No contact found in Zoho CRM for:', credentials.email)
          }
        } catch (error) {
          console.error('❌ Error checking Zoho contact:', error)
        }

        console.log('❌ Authorization failed for:', credentials.email)
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if contact exists in Zoho CRM
          let contact = await zohoCRM.findContactByEmail(user.email!)
          
          if (!contact) {
            // Create new contact in Zoho CRM
            const [firstName, ...lastNameParts] = user.name?.split(' ') || ['User']
            const lastName = lastNameParts.join(' ') || ''
            
            contact = await zohoCRM.createContact({
              email: user.email!,
              first_name: firstName,
              last_name: lastName
            })
          }
          
          // Update user ID with Zoho contact ID
          user.id = contact.id
          return true
        } catch (error) {
          console.error('Error creating/finding Zoho contact:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }