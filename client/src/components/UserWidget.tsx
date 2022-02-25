import React from 'react'
import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchLogout, selectUserState } from '../store/ducks/user/user-slice'
import { Avatar, Badge, MenuItem, Typography } from '@mui/material'
import DropdownMenu from './DropdownMenu'
import { RiProfileLine } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

const UserWidget = () => {
  const { data } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    dispatch(fetchLogout())
  }

  const toProfile = () => {
    navigate('/profile')
  }
  // referrerPolicy="no-referrer"

  const menuItems = [
    {
      label: 'Profile',
      icon: <RiProfileLine />,
      callback: toProfile,
    },
    {
      label: 'Status',
      icon: <HiOutlineStatusOnline />,
      callback: () => {},
    },
    {
      label: 'Logout',
      icon: <FiLogOut />,
      callback: onLogout,
    },
  ]
  return (
    <Widget>
      {/* <Avatar>
        <img width={80} height={80} src={data?.avatar || '/avatar2.png'} alt='avatar' />
      </Avatar> */}
      <Link to='profile'>
        <Badge
          color='success'
          // overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          sx={{
            'span': {
              minWidth: '12px',
              height: '12px',
              borderRadius: '50%',
            },
          }}
        >
          <Avatar
            variant='rounded'
            sx={{ width: 70, height: 70 }}
            alt='Remy Sharp'
            src={data?.avatar || '/avatar2.png'}
          />
        </Badge>
      </Link>

      <div style={{ marginLeft: '15px' }}>
        <Typography variant='h6'>{data?.fullName}</Typography>
        <Typography variant='body2'>@{data?.username}</Typography>
      </div>
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <DropdownMenu variant='secondary' menuItems={menuItems} />
        {/* <MenuItem sx={{ color: 'error.main' }} onClick={onLogout}>
            <FiLogOut />
            Logout
          </MenuItem> */}
      </div>
    </Widget>
  )
}
// const Avatar = styled('div')({
//   position: 'relative',
//   width: '50px',
//   height: '50px',
//   marginRight: '15px',
//   borderRadius: '10px',
//   overflow: 'hidden',
//   'img': {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//   },
// })

const Widget = styled('div')(({ theme }) => ({
  padding: '15px',
  backgroundColor: '#524EED',
  borderRadius: '10px',
  display: 'flex',
  position: 'relative',
  boxShadow: '8px 8px 12px -2px rgba(0, 0, 0, 0.23)',
  margin: '15px 0',
}))

export default UserWidget
