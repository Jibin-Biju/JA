import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';

function Authenticator({ role, Auth }) {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.profile);
  const { pathname } = useLocation();
  useEffect(() => {
    if (profile?.email === 'systemdesign202305@gmail.com') {
      if (!pathname.includes('dashboard')) navigate('/dashboard');
    }
    if (role === 'user') {
      if (Auth && profile?._id) {
        navigate('/');
      } else if (!profile?._id) {
        if (
          !pathname.includes('login') &&
          !pathname.includes('forgot') &&
          !pathname.includes('signup')
        )
          navigate('/login');
      }
    }

    if (role === 'admin') {
      if (profile?._id) {
        if (!pathname.includes('dashboard')) navigate('/dashboard');
      } else if (!profile?.id) {
        if (!pathname.includes('login') && !pathname.includes('forgot'))
          navigate('/login');
      }
    }
  }, [
    pathname,
    role,
    navigate,
    profile?._id,
    Auth,
    profile?.id,
    profile?.email,
  ]);
  return <Outlet />;
}

export default Authenticator;
