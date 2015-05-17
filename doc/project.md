## project

### create `POST /client/project`

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


### delete `DELETE /client/project/54cf386b9604c4560f4a42d2`


### update `PUT /client/project/54cf386b9604c4560f4a42d2`

#### Parameters

    {
        name : 'name'
    }
    
#### Response

    {
        _id : '54cf386b9604c4560f4a42d2',
        userID : 'userID',
        name : 'name',
        token : 'token'
    }


### get `GET /client/project`

#### response

    [
        {
            _id : '54cf386b9604c4560f4a42d2',
            userID : 'userID',
            name : 'berwin',
            token : 'token'
        }
    ]

### query `GET /client/project/54cf386b9604c4560f4a42d2`

#### response

    {
        _id : '54cf386b9604c4560f4a42d2',
        userID : 'userID',
        name : 'berwin',
        token : 'token'
    }

