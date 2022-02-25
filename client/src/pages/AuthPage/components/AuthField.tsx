import React from 'react'
import { Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface IAuthField {
  control: any
  name: string
  label: string
  type?: string
  color?: 'primary' | 'secondary'
  value?: string
}

export const AuthField: React.FC<IAuthField> = ({ control, name, label, type = 'text', color = 'primary', value }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  if (type === 'password') {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field, fieldState: { invalid, isTouched, isDirty, error } }) => (
          <Input
            color={color}
            size='small'
            label={label}
            variant='outlined'
            helperText={error?.message}
            fullWidth
            error={!!error?.message}
            type={showPassword ? 'text' : 'password'}
            {...field}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowPassword((prev) => !prev)
                  }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    )
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || ''}
      render={({ field, fieldState: { invalid, isTouched, isDirty, error } }) => (
        <Input
          color={color}
          size='small'
          label={label}
          variant='outlined'
          helperText={error?.message}
          fullWidth
          error={!!error?.message}
          type={type}
          {...field}
        />
      )}
    />
  )
}

const Input = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ color?: 'primary' | 'secondary' }>(({ theme, color }) => ({
  margin: '8px 0',

  '.MuiOutlinedInput-root': {
    background: color === 'secondary' ? theme.palette.background.paper : '#1D1D41',
    position: 'relative',
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
  },

  '.Mui-error': {
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.main,
      },
    },
    '&.Mui-focused': {
      '&.MuiOutlinedInput-root': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.error.main,
        },
      },
      '&.MuiInputLabel-root': {
        color: theme.palette.error.main,
      },
    },
  },

  '.MuiInputLabel-root': {
    color: '#7A7C88',
    lineHeight: 1.3,
  },

  '.MuiOutlinedInput-input': {
    color: '#fff',
    fontSize: '15px',

    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #2A2A5F inset',
    },
  },

  '.MuiOutlinedInput-notchedOutline': {
    color: '#fff',
    borderColor: 'transparent',
    borderWidth: '1px',
  },

  '.MuiInputAdornment-root': {
    'svg': {
      color: '#7A7C88',
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

    // '.MuiInputAdornment-root': {
    //   'svg': {
    //     color: '#524EED',
    //   },
    // },
  },

  '.MuiFormHelperText-root': {
    marginLeft: '5px',
  },

  // ...(color === 'secondary' && {
  //   '.MuiOutlinedInput-root': {
  //     background: theme.palette.background.paper,
  //   },
  // }),
}))
