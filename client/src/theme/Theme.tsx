import React, { ReactChild } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { theme } from '.'

interface ITheme {
  children: ReactChild
}

const Theme: React.FC<ITheme> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
    </ThemeProvider>
  )
}
export default Theme
