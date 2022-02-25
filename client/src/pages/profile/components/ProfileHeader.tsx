import { Avatar, Box, IconButton } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdAddPhotoAlternate, MdOutlineAddAPhoto } from 'react-icons/md'
import { styled } from '@mui/material/styles'
import { RiDeleteBin2Line, RiDeleteBin5Line } from 'react-icons/ri'
import { FiDelete } from 'react-icons/fi'

import { useUploadViewModal } from '../../../hooks/modal-hook'
import { useAppDispatch } from '../../../store/hooks'
import { showModal } from '../../../store/ducks/modal/modal-slice'

interface IProfileHeader {
  avatarUrl: string | undefined
  headerImageUrl: string | undefined
}

const ProfileHeader: React.FC<IProfileHeader> = ({ avatarUrl, headerImageUrl }) => {
  const dispatch = useAppDispatch()

  const onSendAvatar = (data: string) => {
    alert('suka')
  }

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log('selected')
      const file = e.target.files[0]
      dispatch(
        showModal({
          title: 'UploadViewModal',
          type: 'upload-image',
          file: file,
          onButtonClick: onSendAvatar,
        })
      )
    }
  }

  return (
    <Box
      sx={{
        backgroundImage: 'url("https://www.99images.com/download-image/883614/1920x1080")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '250px',
        position: 'relative',
        marginBottom: '30px',
      }}
    >
      <CustomAvatar>
        <label htmlFor='contained-button-file'>
          <input
            style={{ display: 'none' }}
            onChange={onSelectFile}
            accept='image/*'
            id='contained-button-file'
            type='file'
          />
          <IconButton
            component='span'
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              'svg': { fontSize: 22 },
            }}
          >
            <MdOutlineAddAPhoto className='upload-avatar' />
          </IconButton>
        </label>
        <Avatar
          sx={{
            width: '100%',
            height: '100%',
          }}
          alt='avatar'
          src={avatarUrl || '/avatar2.png'}
        />
        <span style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <RiDeleteBin2Line color='#F44336' fontSize={18} />
        </span>
      </CustomAvatar>
    </Box>
  )
}

const CustomAvatar = styled('div')({
  position: 'absolute',
  bottom: -50,
  left: 30,
  backgroundColor: '#000',
  width: 100,
  height: 100,
  borderRadius: '50px',
  border: '4px solid #141332',
  // overflow: 'hidden',
  'img': {
    minWidth: '100%',
    height: '100%',
    display: 'block',
    opacity: '0.4',
  },
})

export default ProfileHeader
