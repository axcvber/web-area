import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

function useGoogleAuth() {
  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('accessToken' in response) {
      const accessToken = response.accessToken

      fetch(`http://localhost:5000/api/auth/google-auth`, {
        method: 'POST',
        body: JSON.stringify({
          token: accessToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
        })
    }
  }

  return {
    handleSuccess,
  }
}

export default useGoogleAuth
