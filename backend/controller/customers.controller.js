const pool = require("../database/index")

const customersController = {
    // Gell all customers
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from customers")
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
            const [rows, fields] = await pool.query("select * from customers where id = ?", [id])
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
            const { name, phone, address } = req.body
            const sql = "INSERT INTO customers (name, phone, address) VALUES (?,?,?)"
            const [rows, fields] = await pool.query(sql, [name, phone, address])
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
            const { name, phone, address } = req.body
            const { id } = req.params
            const sql = "update customers set name = ?, phone = ?, address = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [name, phone, address, id])
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
            const [rows, fields] = await pool.query("delete from customers where id = ?", [id])
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

module.exports = customersController