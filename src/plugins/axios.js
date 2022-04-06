import axios from 'axios'
import KolaWalletAPI from '@/api/KolaWalletAPI'

export default function () {
  const api = axios.create({
    timeout: 1000 * 30
  })

  KolaWalletAPI.$api = api
}
