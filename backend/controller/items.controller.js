const pool = require("../database/index")

const itemsController = {
    // Gell all items
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM items ORDER BY id DESC")
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
    // Get single item
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

    // INSERT ITEM IN TO DATABASE
    create: async (req, res) => {
        try {
            const { name, description, open_meter, close_meter, volume, rate, qty, tank } = req.body
            const sql = "insert into items (name, description, open_meter, close_meter, volume, rate, qty, tank) values (?, ?, ?, ?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [name, description, open_meter, close_meter, volume, rate, qty, tank])
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
            const { name, description, open_meter, close_meter, volume, rate, qty, tank } = req.body
            const { id } = req.params
            const sql = "update items set title = ?, content = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [name, description, open_meter, close_meter, volume, rate, qty, tank, id])
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