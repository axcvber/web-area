import React from 'react'
import { styled } from '@mui/material/styles'
import { AppBar, Toolbar } from '@mui/material'

export const Navbar = () => {
  return (
    <NavBarWrapper>
      <NavBar>Navbar</NavBar>
    </NavBarWrapper>
  )
}

const NavBar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
}))

const NavBarWrapper = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none !important',
}))
