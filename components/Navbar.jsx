import { useSession } from 'next-auth/react';
import UserInfo from './navbar/userInfo';
import SignInButton from './Buttons/signInButton';
import SignOutButton from './Buttons/signOutButton';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className='nav'>
      <a href='/' className='main-logo'>
        Home
      </a>
      {!session && (
        <div className='nav-content'>
          <SignInButton />
        </div>
      )}
      {session && (
        <div className='nav-content'>
          <SignOutButton />
          <UserInfo />
        </div>
      )}
    </div>
  );
}
