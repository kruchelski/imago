const marker = '/marker';
const draw = '/draw';

export const ENDPOINTS = {


  getMarkers: {
    url: marker,
    method: 'get',
    body: false,
    params: [],
    header: null
  },

  getOneMarker: {
    url: `${marker}/?`,
    method: 'get',
    body: false,
    params: ['id'],
    header: null
  },

  createMarker: {
    url: marker,
    method: 'post',
    body: true,
    params: [],
    header: {
      'Content-Type': 'application/json'
    }
  },

  editMarker: {
    url: `${marker}/?`,
    method: 'put',
    body: true,
    params: ['id'],
    header: {
      'Content-Type': 'application/json'
    }
  },

  deleteMarker: {
    url: `${marker}/?`,
    method: 'delete',
    body: false,
    params: ['id'],
    header: null
  },

  getDraws: {
    url: draw,
    method: 'get',
    body: false,
    params: [],
    header: null,
  },

  getOneDraw: {
    url: `${draw}/id`,
    method: 'get',
    body: false,
    params: ['id'],
    header: null
  },

  createDraw: {
    url: draw,
    method: 'post',
    body: true,
    params: 0,
    header: {
      'Content-Type': 'application/json'
    }
  },

  editDraw: {
    url: `${draw}/?`,
    method: 'put',
    body: true,
    params: ['id'],
    header: {
      'Content-Type': 'application/json'
    }
  },

  deleteDraw: {
    url: draw,
    method: 'delete',
    body: false,
    params: ['id'],
    header: null
  }
}