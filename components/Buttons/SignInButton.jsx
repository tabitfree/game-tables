import { useSession, signIn } from 'next-auth/react'

export default function SignInButton() {
  const { data: session } = useSession()

  return (
    <div className='btn' onClick={() => signIn()}>
      Sign In
    </div>
  )
}

export async function getServerSideProps(ctx) {}
