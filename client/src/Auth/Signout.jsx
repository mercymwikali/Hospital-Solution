import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import useAuth from '../hooks/useAuth';
import { MdLogout } from 'react-icons/md';
import { GiRamProfile } from 'react-icons/gi';

const Signout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useAuth();

  const handleMenuClick = (e) => {
    if (e.key === 'signout') {
      dispatch(logout(userDetails.user.id));
      navigate('/login');
    } else if (e.key === 'view-profile') {
      const rolePath = {
        Admin: '/Admin/user-profile',
        Doctor: '/Doctor/view-profile',
        Nurse: '/Nurse/view-profile',
        Reception: '/Reception/view-profile',

      };
      navigate(rolePath[userDetails.user.role] || '/');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="view-profile" icon={<GiRamProfile />}>
        View Profile
      </Menu.Item>
      <Menu.Item key="signout" icon={<MdLogout />} danger>
        Sign Out
      </Menu.Item>
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
      <div className="d-flex justify-content-end align-items-center py-3">
        <Avatar icon={<FaUserAlt />} style={{ fontSize: 22, color: '#fff', marginRight: '10px' }} />
        <h6 className="text-white">{getSalutation()}</h6>
      </div>
    </Dropdown>
  );
};

export default Signout;
