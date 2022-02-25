import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Avatar, Button, Divider, Grid, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchRemoveProfile, selectUserState } from '../store/ducks/user/user-slice'
import { Box } from '@mui/system'
import { AiOutlineEdit } from 'react-icons/ai'
import Modal from './Modal'
import EditProfileModal from '../pages/profile/components/EditProfileModal'
import ChangePassModal from '../pages/profile/components/ChangePassModal'
import { useChangePassModal, useEditProfileModal } from '../hooks/modal-hook'
import { MdAddPhotoAlternate } from 'react-icons/md'
import ProfileHeader from '../pages/profile/components/ProfileHeader'
const Profile = () => {
  const { data } = useAppSelector(selectUserState)
  const [isOpen, setOpen] = useState<'edit-profile' | 'change-pass' | null>(null)
  const openModal = useEditProfileModal()
  const onChangePassModal = useChangePassModal()
  const dispatch = useAppDispatch()
  // https://wallpapercave.com/wp/wp2123032.jpg
  return (
    <Box sx={{ width: '100%' }}>
      <ProfileHeader
        avatarUrl={data?.avatar}
        headerImageUrl='https://www.99images.com/download-image/883614/1920x1080'
      />

      <Box sx={{ padding: 5 }}>
        <Grid container rowSpacing={5}>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <Typography variant='h4' sx={{ marginRight: 4 }}>
                    My Profile
                  </Typography>
                  <Button
                    onClick={openModal}
                    variant='contained'
                    size='small'
                    sx={{
                      textTransform: 'inherit',
                      fontSize: 16,
                      fontWeight: 400,
                      'svg': {
                        mr: 1,
                      },
                    }}
                  >
                    <AiOutlineEdit fontSize={18} />
                    Edit profile
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div style={{ margin: '15px 0' }}>
                  <Typography sx={{ fontWeight: 600 }} variant='subtitle1' color='primary'>
                    Full Name
                  </Typography>
                  <Typography variant='body1'>{data?.fullName}</Typography>
                </div>
                <div style={{ margin: '15px 0' }}>
                  <Typography sx={{ fontWeight: 600 }} variant='subtitle1' color='primary'>
                    Email
                  </Typography>
                  <Typography variant='body1'>{data?.email}</Typography>
                </div>

                <div style={{ margin: '15px 0' }}>
                  <Typography sx={{ fontWeight: 600 }} variant='subtitle1' color='primary'>
                    Username
                  </Typography>
                  <Typography variant='body1'>@{data?.username}</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: '15px 0' }}>
                  <Typography sx={{ fontWeight: 600 }} variant='subtitle1' color='primary'>
                    Bio
                  </Typography>
                  <Typography variant='body1'>none</Typography>
                </div>

                <div style={{ margin: '15px 0' }}>
                  <Typography sx={{ fontWeight: 600 }} variant='subtitle1' color='primary'>
                    Location
                  </Typography>
                  <Typography variant='body1'>none</Typography>
                </div>

                <div style={{ margin: '15px 0' }}>
                  <Typography sx={{ fontWeight: 600 }} variant='subtitle1' color='primary'>
                    Website
                  </Typography>
                  <Typography variant='body1'>none</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <div>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Password and Authentication
              </Typography>
              <Button
                onClick={onChangePassModal}
                variant='outlined'
                sx={{ textTransform: 'inherit', fontSize: 16, fontWeight: 400 }}
              >
                Change Password
              </Button>
            </div>
            <div style={{ marginTop: '30px' }}>
              <Typography variant='h6'>Two-factor authentication</Typography>
              <Typography sx={{ mt: 1, mb: 2 }} variant='body2'>
                Protect your account with an extra layer of security. Once configured, you'll be required to enter both
                your password and an authentication code from your mobile phone in order to sign in.
              </Typography>

              <Button variant='outlined' sx={{ textTransform: 'inherit', fontSize: 16, fontWeight: 400 }}>
                Enable Two-Factor Auth
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Typography variant='h6' sx={{ my: 2 }}>
                Account Removal
              </Typography>
              <Button
                onClick={() => dispatch(fetchRemoveProfile())}
                variant='outlined'
                color='error'
                sx={{ textTransform: 'inherit', fontSize: 16, fontWeight: 400 }}
              >
                Delete Account
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Profile
