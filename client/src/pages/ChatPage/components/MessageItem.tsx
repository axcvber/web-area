import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Avatar, Typography } from '@mui/material'

interface IMessageItem {
  isOwn?: boolean
}

const MessageItem: React.FC<IMessageItem> = ({ isOwn }) => {
  // const handleRightMouseClick = useCallback(
  //   (e: any) => {
  //     e.preventDefault()
  //     setAnchorPoint({ x: e.pageX, y: e.pageY })
  //     setShow(true)
  //     console.log('clicked')
  //   },
  //   [setAnchorPoint, setShow]
  // )

  return (
    <Wrapper isOwn={isOwn}>
      <Avatar
        sx={{ width: 40, height: 40 }}
        alt={'avatar'}
        src={'https://lh3.googleusercontent.com/a-/AOh14GhtlIzCnVnm__8ca6Ny_uecM3yYrjfPp6a1uLLa=s96-c'}
      />
      <Message className='message'>
        <MessageHeader>
          <Typography>Richard Wu</Typography>
        </MessageHeader>
        <MessageBody>
          <span>I don't know, it's looks fine for me1</span>
          <span>I don't know, it's looks fine for me2</span>
          <span>I don't know, it's looks fine for me3</span>
        </MessageBody>
        <Typography variant='caption' sx={{ color: '#55575F', float: isOwn ? 'left' : 'right' }}>
          08:32 AM
        </Typography>
      </Message>
    </Wrapper>
  )
}

const MessageHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: '10px 0',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
}))

const MessageBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  'span': {
    padding: '10px',
    background: theme.palette.primary.main,
    borderRadius: '10px',
    margin: '5px 0',
    '&:first-child': {
      borderTopLeftRadius: 0,
    },
  },
}))

const Message = styled('div')(({ theme }) => ({
  // display: 'flex',
  marginLeft: '10px',
}))

const Wrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn?: boolean }>(({ theme, isOwn }) => ({
  width: '100%',
  display: 'flex',

  ...(isOwn && {
    justifyContent: 'flex-end',

    '.message': {
      // display: 'none !important',
    },
  }),
}))

export default MessageItem
