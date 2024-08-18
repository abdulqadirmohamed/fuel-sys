const pool = require("../database/index")

const purchasesController = {
    // INSERT customer IN TO DATABASE
    create: async (req, res) => {
        try {
            const { item_id, customer_id, purchase_date } = req.body
            const sql = "INSERT INTO purchases (item_id, customer_id, purchase_date) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [item_id, customer_id, purchase_date])
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

      // Gell all purchases
      getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM purchases ORDER BY id DESC")
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

module.exports = purchasesController