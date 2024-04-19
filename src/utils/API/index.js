import axios from 'axios'

export const setHeaderAuth = token => axios.defaults.headers.common['Authorization'] = token

export const getMessageOk = async (inputLeadhitId) => {
  return await axios.get( 'https://track-api.leadhit.io/client/test_auth', {
    headers: {
      'Api-Key': `${inputLeadhitId}:eEZn8u05G3bzRpdL7RiHCvrYAYo`,
      'Leadhit-Site-Id': `${inputLeadhitId}`
    }
  })
}
