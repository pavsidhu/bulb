export default class Lifx {
  constructor(token) {
    this.token = token
    this.baseUrl = 'https://api.lifx.com/v1'
  }

  async setState(options) {
    console.log(`${this.baseUrl}/lights/all/state`)
    console.log({
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })
    const response = await fetch(`${this.baseUrl}/lights/all/state`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })

    return response.status === 202
  }
}
