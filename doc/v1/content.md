## content

### create content `POST /api/v1/content`

#### Parameters

    {
        groupID : '54cf559a7bb318e6104d53cd',
        projectID : '1234567',
        type : 'default'
    }

#### response

    {
        _id : '54d076b033081e2616f1085d',
        groupID : '54cf559a7bb318e6104d53cd'
        projectID : '54ccb965c8eb932ca2eda801',
        type : 'default',
        time : 1422948016926
    }


### delete content `DELETE /api/v1/content`

#### Parameters

    {
        id : '54d076b033081e2616f1085d'
    }


### get content `GET /api/v1/content`

#### Parameters

    {
        groupID : '54cf559a7bb318e6104d53cd',
        type : 'html'
    }

    or
    
    {
        groupID : '54cf559a7bb318e6104d53cd'
    }

    or

    {
        groupID : '54cf559a7bb318e6104d53cd',
        firstTime : '2015-2-9-00:00:00',
        lastTime : '2015-2-9-23:59:59'
    }

#### response

    [
        {
            _id : '54d076b033081e2616f1085d',
            groupID : '54cf559a7bb318e6104d53cd'
            projectID : '54ccb965c8eb932ca2eda801',
            type : 'html',
            time : 1422948016926
        }
    ]