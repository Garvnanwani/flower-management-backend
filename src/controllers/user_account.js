export const handleMyAcc = (req, res, db) => {
    const { user_id } = req.body

    const sql = `select * from user where user_id=${user_id}`

    db.query(sql, (err, users) => {
        if (err) {
            res.json('no such user exist')
            return
        }
        res.json(users[0])
        // console.log(user)
    })
}
