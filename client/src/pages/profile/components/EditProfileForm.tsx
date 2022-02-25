import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthField } from '../../AuthPage/components/AuthField'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchEditProfile, selectUserState } from '../../../store/ducks/user/user-slice'
import { Button } from '@mui/material'
import ModalButtons from '../../../components/ModalButtons'

const EditProfileSchema = yup
  .object({
    fullName: yup.string().required(),
    username: yup.string().required(),
    bio: yup.string().required(),
    location: yup.string().required(),
    website: yup.string().required(),
  })
  .required()

export interface IEditProfileForm {
  fullName: string
  username: string
  bio: string
  location: string
  website: string
}

const EditProfileForm = () => {
  const { data } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { submitCount },
  } = useForm<IEditProfileForm>({
    resolver: yupResolver(EditProfileSchema),
  })

  const onSubmit: SubmitHandler<IEditProfileForm> = (formData) => {
    console.log('edit profile data', formData)
    dispatch(fetchEditProfile(formData))
  }

  return (
    <form style={{ maxWidth: '300px' }} id='edit-profile-form' onSubmit={handleSubmit(onSubmit)}>
      <AuthField value={data?.fullName} color='secondary' control={control} name='fullName' label='Full Name' />
      <AuthField value={data?.username} color='secondary' control={control} name='username' label='Username' />
      {/* @ts-ignore */}
      <AuthField value={data?.bio} color='secondary' control={control} name='bio' label='Bio' />
      {/* @ts-ignore */}

      <AuthField value={data?.location} color='secondary' control={control} name='location' label='Location' />
      {/* @ts-ignore */}

      <AuthField value={data?.website} color='secondary' control={control} name='website' label='Website' />

      <ModalButtons />
    </form>
  )
}

export default EditProfileForm
