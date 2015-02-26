## group

### create group `POST /api/v1/group`

#### Parameters

    {
        name : 'berwin',
        projectID : '1234567'
    }

    or

    {
        name : 'berwin',
        projectID : '1234567',
        types : ['html', 'js']
    }

#### response

    {
        _id : "54cf559a7bb318e6104d53cd",
        name : "berwin",
        projectID :"1234567",
        types : ['html', 'js']
    }


### delete group `DELETE /api/v1/group`

#### Parameters

    {
        id : '54cf559a7bb318e6104d53cd'
    }


### update group `PUT /api/v1/group`

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


### get group `GET /api/v1/group`

#### Parameters

    {
        id : '54cf559a7bb318e6104d53cd'
    }

    or
    
    {
        projectID : '1234567'
    }

#### response

    {
        _id : "54cf559a7bb318e6104d53cd",
        name : "berwin1",
        projectID : "1234567"
    }

    or

    [
        {
            _id : "54cf559a7bb318e6104d53cd",
            name : "berwin1",
            projectID : "1234567"
        }
    ]
