## content

### create content `POST /api/v1/content`

#### Parameters

    {
        groupID : '5558736b7f0de78abf34bc62',
        sourceID : '55574b08aadd8bd9bc74f511',
        token: '55574b08aadd8bd9bc74f510'
        data : {
            code: '1',
            value: 'html'
        }
    }

 - groupID : groupID
 - sourceID: sourceID
 - token : 为了验证身份用，token在主面板信息中查看。
 - data : 统计的关键数据
    - `code`: key为蓝色块里面设置的key1，value 根据需求填写
    ... 这里可能有N多个Key
    - `value`: `value`为固定key(随意填写将无法统计) 值根据蓝色块里面设置的value列表中选一个


#### response

    {
        "_id": "55694a31b7a6d40b65b0f753",
        "sourceID": "55574b08aadd8bd9bc74f511",
        "groupID": "5558736b7f0de78abf34bc62",
        "data": {
            "code": "1",
            "value": "html"
        },
        "time": 1432963633506
    }


### delete content `DELETE /client/:sourceID/group/:groupID/content/:id`

