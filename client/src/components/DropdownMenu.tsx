import React, { ReactChild } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import { FiMoreVertical } from 'react-icons/fi'
import { Box, IconButton, ListItemIcon, Typography } from '@mui/material'
import { RiProfileLine } from 'react-icons/ri'

interface IDropdowMenu {
  children?: ReactChild
  variant?: 'primary' | 'secondary'
  mt?: number
  menuItems?: any
}

const DropdownMenu: React.FC<IDropdowMenu> = ({ children, variant = 'primary', mt, menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <IconButton
        aria-label='menu'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FiMoreVertical fontSize={20} color='#fff' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: mt || 1,
            bgcolor: variant === 'primary' ? 'background.default' : 'background.paper',
            '& li': {
              fontSize: '15px',

              'svg': {
                marginRight: '10px',
                fontSize: '18px',
              },
            },
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: variant === 'primary' ? 'background.default' : 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* {children} */}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        {menuItems.map((item: any) => (
          <MenuItem key={item.label} onClick={item.callback}>
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default DropdownMenu

// const DropdownMenu: React.FC<IDropdowMenu> = ({ onLogout }) => {
//   const [anchorEl, setAnchorEl] = React.useState(null)
//   const open = Boolean(anchorEl)
//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget)
//   }
//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <div>
//       <IconButton
//         aria-label='menu'
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup='true'
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         <FiMoreVertical onClick={handleClick} color='#fff' />
//       </IconButton>
//       <StyledMenu
//         id='basic-menu'
//         variant='menu'
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={onLogout}>Logout</MenuItem>
//       </StyledMenu>
//     </div>
//   )
// }

// const StyledMenu = styled(Menu)({
//   '.MuiList-root': {
//     background: '#141332',
//   },
//   '.MuiMenuItem-root': {
//     color: '#fff',
//   },
// })
