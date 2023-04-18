import { Buffer } from 'buffer'
import axios from 'axios'

const tokenName = 'CRATE-TOKEN'

export const getPayload = () => {
  const token = localStorage.getItem(tokenName)
  if (!token) return
  const splitToken = token.split('.')
  const payLoadString = splitToken[1]
  return JSON.parse(Buffer.from(payLoadString, 'base64'))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Date.now() / 1000
  return currentTime < payload.exp

}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

export const getToken = () => {
  localStorage.getItem(tokenName)
}

export const authenticated = axios.create()
authenticated.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = `Bearer ${getToken()}`
  } else {
    config.headers['Authorization'] = null
  }
  return config
}, (error) => {
  console.log('ERROR', error)
})

export const userIsOwner = (record) => {
  const payload = getPayload()
  if (!payload) return
  if (record && record.owner) {
    return payload.sub === record.owner.id
  }
}