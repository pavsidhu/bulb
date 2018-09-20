export default class Lifx {
  constructor(token) {
    this.token = token
    this.baseUrl = 'https://api.lifx.com/v1'
  }

  api(url, options = {}) {
    return fetch(this.baseUrl + url, {
      method: options.method || 'GET',
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options.body)
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
