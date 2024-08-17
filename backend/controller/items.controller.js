const pool = require("../database/index")

const itemsController = {
    // Gell all posts
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from items")
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
    // Get single post
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from items where id = ?", [id])
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

    // INSERT POST IN TO DATABASE
    create: async (req, res) => {
        try {
            const { name, description, open_meter, close_meter, volume, rate, Qty, tank } = req.body
            const sql = "insert into items (name, description, open_meter, close_meter, volume, rate, Qty, tank) values (?, ?, ?, ?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [name, description, open_meter, close_meter, volume, rate, Qty, tank])
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

    // Update data
    update: async (req, res) => {
        try {
            const { name, description, open_meter, close_meter, volume, rate, Qty, tank } = req.body
            const { id } = req.params
            const sql = "update items set title = ?, content = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [name, description, open_meter, close_meter, volume, rate, Qty, tank, id])
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

    // Delete record
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from items where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = itemsController