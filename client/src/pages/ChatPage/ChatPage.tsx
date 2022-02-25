import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Search from '../../components/Search'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import UserWidget from '../../components/UserWidget'
import { FiSettings, FiUsers } from 'react-icons/fi'
import SimpleAccordion from '../../components/Accordion'
import Accordion from '../../components/Accordion'
import Modal from '../../components/Modal'
import { AiOutlinePlus } from 'react-icons/ai'
import { Grid } from '@mui/material'
import ChatSection from './ChatSection'
import ChatInfo from './ChatDetails'
import { Outlet, Link } from 'react-router-dom'

const ChatPage = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setOpen] = useState(false)

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={2.5}>
          <LeftBar>
            <Search />
            <UserWidget />
            <LeftBarList>
              <LeftBarListItem onClick={() => setOpen(true)}>
                <FiUsers />
                <span>Contacts</span>
              </LeftBarListItem>
              <LeftBarListItem>
                <Link to={'settings'}>
                  <FiSettings />
                  <span>Settings</span>
                </Link>
              </LeftBarListItem>
            </LeftBarList>
            <Accordion title='Channels'>
              <>
                <LeftBarListItem>
                  <img width={20} height={20} src='/chat.png' alt='chat' />
                  <span style={{ marginLeft: '15px' }}>General Chat</span>
                </LeftBarListItem>
                <LeftBarListItem>
                  <img width={18} height={18} src='/js.png' alt='js' />
                  <span style={{ marginLeft: '15px' }}>Java Script</span>
                </LeftBarListItem>
                <LeftBarListItem>
                  <img width={18} height={18} src='/typescript.png' alt='js' />
                  <span style={{ marginLeft: '15px' }}>Type Script</span>
                </LeftBarListItem>
                <LeftBarListItem>
                  <img width={18} height={18} src='/nodejs.png' alt='js' />
                  <span style={{ marginLeft: '15px' }}>NodeJS</span>
                </LeftBarListItem>
                <LeftBarListItem>
                  <img width={20} height={20} src='/react.png' alt='js' />
                  <span style={{ marginLeft: '15px' }}>React</span>
                </LeftBarListItem>
                <LeftBarListItem>
                  <AiOutlinePlus />
                  <span>Add Channel</span>
                </LeftBarListItem>
              </>
            </Accordion>

            <Accordion title='Messages'>
              <>
                <LeftBarListItem>
                  <span style={{ marginLeft: '15px' }}>Admin</span>
                </LeftBarListItem>

                <LeftBarListItem>
                  <AiOutlinePlus />
                  <span>Add Users</span>
                </LeftBarListItem>
              </>
            </Accordion>
          </LeftBar>
        </Grid>
        <Grid item xs={9.5}>
          {/* <Route path='/chat/profile' element={<div>profile</div>} />
            <Route index element={<div>index</div>} /> */}

          {/* <Route index element={<div>chat</div>} />
            <Route path={`/chat/profile`} element={<div>chat</div>} /> */}

          {/* <Routes>
            <Route path='profile' element={<div>profile</div>} />
            <Route path='settings' element={<div>settings</div>} />
          </Routes> */}
          <Outlet />
        </Grid>
        {/* <Grid item xs={3}>
          <ChatInfo />
        </Grid> */}
      </Grid>

      {/* <Modal open={isOpen} onClose={() => setOpen(false)} /> */}
    </Wrapper>
  )
}

const LeftBarListItem = styled('li')({
  margin: '5px 0',
  borderRadius: '5px',
  cursor: 'pointer',
  padding: '15px',

  'a': {
    color: '#fff',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    // padding: '15px',
  },
  'svg': {
    marginRight: '15px',
    fontSize: '18px',
  },
  '&:hover': {
    background: '#524EED',
  },
})

const LeftBarList = styled('ul')({})

const LeftBar = styled('div')({
  // width: '400px',
  height: '100vh',
  background: '#1D1D41',
  padding: '20px',
})

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  color: '#fff',
  background: '#141332',
})

export default ChatPage
