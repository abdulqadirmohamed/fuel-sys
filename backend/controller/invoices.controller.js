const pool = require("../database/index")

const invoicesController = {
    // INSERT customer IN TO DATABASE
    create: async (req, res) => {
        try {
            const { purchase_id, total_amount, paid_amount, due_amount, invoice_date  } = req.body
            const sql = "INSERT INTO invoices (purchase_id, total_amount, paid_amount, due_amount, invoice_date ) values (?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [purchase_id, total_amount, paid_amount, due_amount, invoice_date ])
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
            const [rows, fields] = await pool.query("SELECT * FROM invoices ORDER BY id DESC")
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

module.exports = invoicesController