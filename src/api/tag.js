import request from '@/utils/request'

// 获取某标签下的全部文章
export function getTopicsByTag(paramMap) {
    return request({
        url: '/tag/' + paramMap.name,
        method: 'get',
        params: {
            page: paramMap.page,
            size: paramMap.size
        }
    })
}
