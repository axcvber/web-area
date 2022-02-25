import React from 'react'
import { styled } from '@mui/material/styles'
import { Avatar, Badge, Button, IconButton, MenuItem, Typography } from '@mui/material'
import { BsReverseLayoutSidebarReverse } from 'react-icons/bs'
import { FiLogOut, FiMoreVertical, FiSearch } from 'react-icons/fi'
import DropdownMenu from '../../../components/DropdownMenu'
import { GoMute } from 'react-icons/go'

interface IChatHeader {
  isOpenDrawer: boolean
  handleDrawerToggle: () => void
}

const onlineUsers = [
  {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c',
    alt: 'Remy Sharp',
  },
  {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c',
    alt: 'Remy Sharp',
  },
  {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c',
    alt: 'Remy Sharp',
  },
  {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c',
    alt: 'Remy Sharp',
  },
  {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c',
    alt: 'Remy Sharp',
  },
  {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c',
    alt: 'Remy Sharp',
  },
  {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c',
    alt: 'Remy Sharp',
  },
]

const ChatHeader: React.FC<IChatHeader> = ({ isOpenDrawer, handleDrawerToggle }) => {
  const onlineLimit = 4

  return (
    <Header>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
          <img style={{ marginRight: '10px' }} width={20} height={20} src='/chat.png' alt='chat' />

          <span>General Chat - 1256 members</span>
        </div>

        <CustomAvatarGroup>
          {onlineUsers.slice(0, onlineLimit).map((item, key: number) => (
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant='dot'>
              <Avatar key={key} sx={{ width: 30, height: 30 }} alt={item.alt} src={item.avatarUrl} />
            </StyledBadge>
          ))}
          {onlineUsers.length > onlineLimit && (
            <Typography sx={{ marginLeft: '5px', color: '#6DBAAA', fontWeight: 600 }} variant='body2'>
              +{onlineUsers.length - onlineLimit} Online
            </Typography>
          )}
        </CustomAvatarGroup>
      </div>
      <HeaderIcons>
        <IconButton component='span'>
          <FiSearch />
        </IconButton>

        <IconButton color={isOpenDrawer ? 'primary' : 'default'} component='span' onClick={handleDrawerToggle}>
          <BsReverseLayoutSidebarReverse />
        </IconButton>

        <DropdownMenu mt={2}>
          <>
            <MenuItem sx={{ color: 'primary.light' }}>
              <GoMute />
              Mute
            </MenuItem>
            <MenuItem sx={{ color: 'error.main' }}>
              <FiLogOut />
              Leave
            </MenuItem>
          </>
        </DropdownMenu>
      </HeaderIcons>
    </Header>
  )
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

const CustomAvatarGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '.MuiAvatar-root': {
    border: '2px solid #1D1D41',
    boxSizing: 'content-box',
    marginLeft: '-8px',
  },
})

const HeaderIcons = styled('div')({
  display: 'flex',
  'svg': {
    fontSize: 18,
  },
})

const Header = styled('header')({
  width: '100%',
  height: '50px',
  background: '#1D1D41',
  display: 'flex',
  alignItems: 'center',
  padding: '0 15px',
  justifyContent: 'space-between',
  '.MuiAvatar-colorDefault': {
    background: 'red',
    width: 50,
    height: 50,
  },
  '.MuiAvatarGroup-avatar': {
    width: 30,
    height: 30,
    // background: 'red',
  },
})

export default ChatHeader
