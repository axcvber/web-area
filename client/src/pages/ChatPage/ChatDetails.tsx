import React from 'react'
import { styled } from '@mui/material/styles'
import { AiOutlineClose } from 'react-icons/ai'
import { Avatar, Button, Drawer, IconButton, Typography } from '@mui/material'
import Accordion from '../../components/Accordion'

interface IChatInfo {
  isOpenDrawer: boolean
  onClose: () => void
}

const ChatInfo: React.FC<IChatInfo> = ({ isOpenDrawer, onClose }) => {
  const drawerWidth = 400

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: '#1D1D41',
            height: '100%',
            padding: '15px',
          },
        }}
        variant='persistent'
        anchor='right'
        open={isOpenDrawer}
      >
        <Header>
          <Typography variant='h5'>Chat Details</Typography>
          <IconButton color='primary' component='span' onClick={onClose}>
            <AiOutlineClose />
          </IconButton>
        </Header>
        <div>
          <Avatar sx={{ width: 200, height: 200 }} alt='Trevor Henderson' src='/js.png' />
          <Typography variant='h5'>Java Script</Typography>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Accordion title='Members'>
            <>
              <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                <Avatar sx={{ width: 25, height: 25, marginRight: '10px' }} alt='avatar' src='/js.png' />
                <Typography variant='body1'>Thomas Hayes</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                <Avatar sx={{ width: 25, height: 25, marginRight: '10px' }} alt='avatar' src='/js.png' />
                <Typography variant='body1'>Thomas Hayes</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                <Avatar sx={{ width: 25, height: 25, marginRight: '10px' }} alt='avatar' src='/js.png' />
                <Typography variant='body1'>Thomas Hayes</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                <Avatar sx={{ width: 25, height: 25, marginRight: '10px' }} alt='avatar' src='/js.png' />
                <Typography variant='body1'>Thomas Hayes</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                <Avatar sx={{ width: 25, height: 25, marginRight: '10px' }} alt='avatar' src='/js.png' />
                <Typography variant='body1'>Thomas Hayes</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                <Avatar sx={{ width: 25, height: 25, marginRight: '10px' }} alt='avatar' src='/js.png' />
                <Typography variant='body1'>Thomas Hayes</Typography>
              </div>
            </>
          </Accordion>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography variant='h5' sx={{ marginRight: '5px' }}>
            Media
          </Typography>
          <Typography variant='body2'>148 Images</Typography>
        </div>

        <Button variant='outlined' color='error'>
          Leave from chat
        </Button>
      </Drawer>
    </>
  )
}

export default ChatInfo

const Header = styled('header')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const Wrapper = styled('div')({
  background: '#1D1D41',
  height: '100%',
  padding: '15px',
})
