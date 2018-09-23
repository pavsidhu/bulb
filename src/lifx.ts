export interface LifxState {
  power?: string
  color?: string
  brightness?: number
  duration?: number
}

export default class Lifx {
  private token: string
  private baseUrl = 'https://api.lifx.com/v1'

  constructor(token: string) {
    this.token = token
  }

  api(url: string, options: { method?: string; body?: object } = {}) {
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

  async setState(body: LifxState) {
    const response = await this.api('/lights/all/state', {
      method: 'PUT',
      body: {
        ...body,
        fast: true
      }
    })
    return response.status === 202
  }

  async getState() {
    const response = await this.api('/lights/all')
    return response
  }
}
