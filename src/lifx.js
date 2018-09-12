export default class Lifx {
  constructor(token) {
    this.token = token
    this.baseUrl = 'https://api.lifx.com/v1'
  }

  api(url, { method = 'GET', body = {} }) {
    return fetch(this.baseUrl + url, {
      method,
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  async setState(body) {
    const response = await this.api('/lights/all/state', {
      method: 'PUT',
      body
    })
    return response.status === 202
  }

  async getState() {
    const response = await this.api('/lights/all')
    return response
  }
}
