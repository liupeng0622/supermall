import { request } from "./request"

export function getHomeMultidata() {
  // getHomeMultidata函数把request函数的返回值返回了
  // request函数的返回值是promise
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}