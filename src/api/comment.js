import request from '@/utils/request'

// 获取帖子所有留言
export function fetchCommentsByTopicId(topic_Id) {
    return request({
        url: '/comment/get_comments',
        method: 'get',
        params: {
            topicid: topic_Id
        }
    })
}

export function pushComment(data) {
    return request({
        url: '/comment/add_comment',
        method: 'post',
        data: data
    })
}
