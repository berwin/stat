## project

### create project `POST /client/project`

#### Parameters

    {
        name : 'berwin'
    }

#### response

    {
        _id : '54cf386b9604c4560f4a42d2',
        userID : 'userID',
        name : 'berwin',
        token : 'token'
    }


### delete project `DELETE /client/project`

#### Parameters

    {
        id : '54cf386b9604c4560f4a42d2'
    }


### get project `GET /client/project`

#### response

    [
        {
            _id : '54cf386b9604c4560f4a42d2',
            userID : 'userID',
            name : 'berwin',
            token : 'token'
        }
    ]

### get project `GET /client/project?id=54cf386b9604c4560f4a42d2`

#### response

    {
        _id : '54cf386b9604c4560f4a42d2',
        userID : 'userID',
        name : 'berwin',
        token : 'token'
    }
