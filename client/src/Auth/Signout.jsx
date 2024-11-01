import React from 'react';
import { Menu, Dropdown, Avatar, Badge } from 'antd';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import useAuth from '../hooks/useAuth';
import { MdLogout } from 'react-icons/md';
import { GiRamProfile } from 'react-icons/gi';
import { TbBellFilled } from 'react-icons/tb';

const Signout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useAuth();

  const handleMenuClick = (e) => {
    if (e.key === '/signout') {
      dispatch(logout(userDetails.user.id));
      navigate('/login');
    } else if (e.key === '/user-profile') {
      const rolePath = {
        'Admin': '/Admin/user-profile',
        'Doctor': '/Doc/user-profile',
        'Nurse': '/Nurse/user-profile'
      };
      navigate(rolePath[userDetails.user.role] || '/');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="/user-profile" icon={<GiRamProfile />}>View Profile</Menu.Item>
      <Menu.Item key="/signout" icon={<MdLogout />} danger>Sign Out</Menu.Item>
    </Menu>
  );

  const getSalutation = () => {
    if (userDetails.user.role === 'Doctor') {
      return `Hi Doctor ${userDetails.user.fname}`;
    } else if (userDetails.user.role === 'Nurse') {
      return `Hi Nurse ${userDetails.user.fname}`;
    }
    return `Hi ${userDetails.user.fname}`;
  };

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        {/* <Badge count={20}>
          <TbBellFilled style={{ fontSize: 22, color:'#fff' }} />
        </Badge> */}
        <Avatar icon={<FaUserAlt />} style={{ fontSize: 22, color: '#fff', marginLeft: '10px' }} />
        <h6 className='text-white px-2'>{getSalutation()}</h6>
      </div>
    </Dropdown>
  );
};

export default Signout;
