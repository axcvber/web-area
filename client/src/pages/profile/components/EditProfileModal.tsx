import React from 'react'
import Modal from '../../../components/Modal'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthField } from '../../AuthPage/components/AuthField'
import { useAppSelector } from '../../../store/hooks'
import { selectUserState } from '../../../store/ducks/user/user-slice'
import { Button } from '@mui/material'

const EditProfileSchema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email('Please enter a valid email address.').required('Please enter a email address.'),
    username: yup.string().required(),
    bio: yup.string().required(),
    location: yup.string().required(),
    website: yup.string().required(),
  })
  .required()

interface IEditProfileForm {
  fullName: string
  email: string
  username: string
  bio: string
  location: string
  website: string
}

const EditProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { data } = useAppSelector(selectUserState)

  const {
    control,
    handleSubmit,
    formState: { submitCount },
  } = useForm<IEditProfileForm>({
    resolver: yupResolver(EditProfileSchema),
  })

  const onSubmit: SubmitHandler<IEditProfileForm> = (formData) => {
    console.log('edit profile data', formData)
  }

  return (
    <Modal title='Edit profile' open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthField value={data?.fullName} color='secondary' control={control} name='fullName' label='Full Name' />
        <AuthField value={data?.email} color='secondary' control={control} name='email' label='Email' type='email' />
        <AuthField value={data?.username} color='secondary' control={control} name='username' label='Username' />
        <AuthField color='secondary' control={control} name='bio' label='Bio' />
        <AuthField color='secondary' control={control} name='location' label='Location' />
        <AuthField color='secondary' control={control} name='website' label='Website' />
        <Button
          type='submit'
          variant='contained'
          // onClick={onClose}
          sx={{ textTransform: 'inherit', fontWeight: 400 }}
        >
          Save
        </Button>
        <Button variant='outlined' color='error' onClick={onClose} sx={{ textTransform: 'inherit', fontWeight: 400 }}>
          Close
        </Button>
      </form>
    </Modal>
  )
}

export default EditProfileModal
