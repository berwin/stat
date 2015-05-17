## group

### create group `POST /client/:sourceID/group`

#### Parameters

    {
        name : 'berwin',
        sourceID : '1234567',
        keys : [{
            key : 'key',
            name : 'xx',
            count : 0
        }],
        values : [{
            key : 'key',
            name : 'yy',
            count : 0
        }]
    }

#### response

    {
        _id : "54cf559a7bb318e6104d53cd",
        name : "berwin",
        sourceID :"1234567",
        keys : [{
            key : 'key',
            name : 'xx',
            count : 0
        }],
        values : [{
            key : 'key',
            name : 'yy',
            count : 0
        }]
    }


### delete group `DELETE /client/:sourceID/group/:id`

#### Parameters

    {
        id : '54cf559a7bb318e6104d53cd'
    }


### update group `PUT /client/:sourceID/group/:id`

#### Parameters

    {
        id : '54cf559a7bb318e6104d53cd',
        name : 'berwin1'
    }

#### response

    {
        _id : "54cf559a7bb318e6104d53cd",
        name : "berwin1",
        projectID :"1234567"
    }


### get `GET /client/:sourceID/group/:id`

#### response

    {
        _id : "54cf559a7bb318e6104d53cd",
        name : "berwin1",
        projectID : "1234567"
    }

### query `GET /client/:sourceID/group`

#### response

    [
        {
            _id : "54cf559a7bb318e6104d53cd",
            name : "berwin1",
            projectID : "1234567"
        }
    ]
