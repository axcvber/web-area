import React from 'react'
import { styled } from '@mui/material/styles'

export const Logo = () => {
  return (
    <Wrapper>
      <img width={70} height={70} src={'/web.png'} alt='logo' />
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
})
