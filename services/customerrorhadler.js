class customserrorhandler{
    constructor(Status,msg){

        this.status=Status;
        this.message=msg;
    }

static alreadyexist(err)
{
    return new customserrorhandler(409, err);
}
static wrongcredentials(err="Username or password not found")
{
    return new customserrorhandler(409, err);
}
static unAuthorized(err="unAuthorized")
{
    return new customserrorhandler(401, err);
}
static notfound(err="404 not found")
{
    return new customserrorhandler(404, err);
}
}

export default customserrorhandler;