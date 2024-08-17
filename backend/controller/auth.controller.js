const pool = require("../database/index")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const authController = {
    
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body
            const [user,] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })


            const hash = await bcrypt.hash(password, 10)

            const sql = "insert into users (email, password, name) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [email, hash, name])

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

    logout: async (req, res) => {
        try {
            // For stateless JWT, the client can just remove the token.
            // If you're using cookies to store the token, you can clear it like this:
            res.clearCookie('token');  // If using cookies
            return res.json({ message: "Logged out successfully." });

            // Optionally: Implement token blacklisting by saving the token in a blacklist table in the database
            // const token = req.header('Authorization').replace('Bearer ', '');
            // await pool.query("INSERT INTO token_blacklist (token) VALUES (?)", [token]);

        } catch (error) {
            console.log(error);
            res.json({ error: error.message });
        }
    },
}

module.exports = authController