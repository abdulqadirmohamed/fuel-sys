const pool = require("../database/index")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const authController = {

    register: async (req, res) => {
        try {
            const { email, password, name, role } = req.body
            const [user,] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })


            const hash = await bcrypt.hash(password, 10)

            const sql = "insert into users (email, password, name, role) values (?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [email, hash, name, role])

            if (rows.affectedRows) {
                return res.json({ message: "Ok" })
            } else {
                return res.json({ error: "Error" })
            }

        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },

    login: async (req, res) => {

        try {
            const { email, password } = req.body
            const [user,] = await pool.query("select * from users where email = ?", [email])
            if (!user[0]) return res.json({ error: "Invalid email!" })

            const { password: hash, id, name } = user[0]

            const check = await bcrypt.compare(password, hash)

            if (check) {
                const accessToken = jwt.sign({ userId: id }, '3812932sjad34&*@', { expiresIn: '1h' });
                return res.json({
                    accessToken,
                    data: {
                        name,
                        email
                    }
                })

            }

            return res.json({ error: "Wrong password!" })

        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },

    // Get All users
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from users")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
}

module.exports = authController