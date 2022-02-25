import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { RiSendPlaneFill } from 'react-icons/ri'
import { BsEmojiSmile } from 'react-icons/bs'
import { FiPaperclip } from 'react-icons/fi'
import { Avatar, IconButton } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'
import { selectUserState } from '../../../store/ducks/user/user-slice'

const MessageField = () => {
  const { data } = useAppSelector(selectUserState)

  const [file, setFile] = useState<any>(undefined)
  console.log('file', file)

  const handleCapture = ({ target }: any) => {
    if (target && target.files && target.files.length) setFile({ ...file, imageFile: target.files[0] })
  }

  return (
    <Wrapper>
      {/* {file && <img src={file.imageFile && URL.createObjectURL(file.imageFile)} alt='imag' />} */}
      <Avatar
        sx={{ width: 35, height: 35, marginRight: '10px' }}
        alt='Agnes Walker'
        src={data?.avatar || '/avatar2.png'}
      />
      <MessageInput placeholder='Message...' />
      <Icons>
        <IconButton component='span'>
          <BsEmojiSmile color='#55575F' />
        </IconButton>
        <label htmlFor='icon-button-file'>
          <input
            onChange={handleCapture}
            style={{ display: 'none' }}
            accept='image/*'
            id='icon-button-file'
            type='file'
            multiple
          />
          <IconButton aria-label='upload picture' component='span'>
            <FiPaperclip color='#55575F' />
          </IconButton>
        </label>

        <RiSendPlaneFill className='sendIcon' />
      </Icons>
    </Wrapper>
  )
}

const Icons = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  'svg': {
    fontSize: 19,
    // marginLeft: '10px',
  },
  '.sendIcon': {
    fontSize: 26,
    marginLeft: '10px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    // color: theme.palette.primary.main,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

const Wrapper = styled('div')({
  width: '700px',
  position: 'relative',
  background: '#1D1D41',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 15px',
  borderRadius: '10px',
  boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.17)',
})

const MessageInput = styled('input')({
  width: '100%',
  height: '100%',
  border: 0,
  outline: 0,
  background: 'transparent',
  color: '#fff',
  fontSize: '16px',
  fontFamily: '"Ubuntu", sans-serif',
})

export default MessageField
