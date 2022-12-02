import { useSession, signOut } from 'next-auth/react';

export default function SignOutButton() {
  const { data: session } = useSession();

  return (
    <div className='btn' onClick={() => signOut()}>
      Sign out
    </div>
  );
}
