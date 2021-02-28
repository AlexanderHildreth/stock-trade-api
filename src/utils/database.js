module.exports = {
    getDbConn(req) {
        return req.app.get('db');
    },
    format(res) {
        const { user_id, user_name, ...rest } = res;
        
        rest.user = {
            id: user_id,
            name: user_name
        };
        return rest;
    }
};