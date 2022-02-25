import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { styled } from '@mui/material/styles'

const Search = () => {
  return (
    <SearchField
      label='Search for anything'
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <FiSearch />
          </InputAdornment>
        ),
      }}
      variant='outlined'
      size='small'
    />
  )
}

const SearchField = styled(TextField)({
  '.MuiOutlinedInput-root': {
    background: '#141332',
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
  },
  '.MuiInputLabel-root': {
    color: '#55575F',
    lineHeight: 1.3,
  },
  '.MuiOutlinedInput-input': {
    color: '#fff',
    paddingRight: '10px',
  },
  '.MuiOutlinedInput-notchedOutline': {
    color: '#fff',
    borderColor: 'transparent',
    borderWidth: '2px',
  },
  '.MuiInputAdornment-root': {
    'svg': {
      color: '#55575F',
      cursor: 'pointer',
      fontSize: '18px',
    },
  },
  '.Mui-focused': {
    '&.MuiOutlinedInput-root': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#524EED',
      },
    },
    '&.MuiInputLabel-root': {
      color: '#524EED',
    },
    '.MuiInputAdornment-root': {
      'svg': {
        color: '#524EED',
      },
    },
  },
})

export default Search
