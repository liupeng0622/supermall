import { request } from "./request"

export function getHomeMultidata() {
  // getHomeMultidata函数把request函数的返回值返回了
  // request函数的返回值是promise
  return request({
    url: '/home/multidata'
  })
}