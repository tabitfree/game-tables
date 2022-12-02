import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { data: session } = useSession();
  return (
    <a className='pic-wrap' href='/profile'>
      <img className='profile-pic' src={session.user.image} alt='' />
    </a>
  );
}
