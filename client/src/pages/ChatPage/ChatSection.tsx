import React from 'react'
import { styled } from '@mui/material/styles'
import MessageField from './components/MessageField'
import ChatHeader from './components/ChatHeader'
import ChatDetails from './ChatDetails'
import MessageItem from './components/MessageItem'

const drawerWidth = 400

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  position: 'relative',
  flexGrow: 1,
  maxWidth: '100%',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}))

const ChatSection = () => {
  const [isOpenDrawer, setDrawerOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setDrawerOpen(!isOpenDrawer)
  }

  return (
    <Wrapper>
      <Main open={isOpenDrawer}>
        <ChatHeader isOpenDrawer={isOpenDrawer} handleDrawerToggle={handleDrawerToggle} />
        <Messages>
          <MessageItem />
          <MessageItem isOwn />
        </Messages>
        <FieldContainer>
          <MessageField />
        </FieldContainer>
      </Main>
      <ChatDetails isOpenDrawer={isOpenDrawer} onClose={() => setDrawerOpen(false)} />
    </Wrapper>
  )
}

const Messages = styled('div')({
  width: '100%',

  // display: 'inline-block',
  padding: '15px',
})

const FieldContainer = styled('div')({
  width: '100%',
  position: 'absolute',
  bottom: 20,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
})

const Wrapper = styled('div')({
  width: '100%',
  height: '100%',
  border: '1px solid #141332',
  position: 'relative',
  display: 'flex',
})

export default ChatSection
