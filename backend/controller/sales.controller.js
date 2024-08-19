const pool = require("../database/index")

const purchasesController = {
    // INSERT customer IN TO DATABASE
    create: async (req, res) => {
        try {
            const { customer_id, item_id, volume, total_amount } = req.body
            const sql = "INSERT INTO sales ( customer_id, item_id, volume, total_amount) values (?, ?, ?,?)"
            const [rows, fields] = await pool.query(sql, [customer_id, item_id, volume, total_amount])
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
            const [rows, fields] = await pool.query("SELECT * FROM sales ORDER BY sale_id DESC")
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

    // Today sales
    todaySales: async (req, res) => {
        try {
            const [rows] = await pool.query(
                'SELECT SUM(volume) AS total_sales_today FROM sales WHERE DATE(sale_date) = CURDATE()'
            );

            const totalSalesToday = rows[0].total_sales_today || 0;
            res.json({ total_sales_today: totalSalesToday });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve today\'s sales' });
        }
    },

    // Remain 
    remaining_Volume: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT (SELECT SUM(volume) FROM items) - (SELECT SUM(volume) FROM sales) AS remaining_volume;")
            const remainVolume = rows[0].remaining_volume || 0;
            res.json({ remaining_volume: remainVolume })
            // res.json({data:rows})
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },

    // Sales Money based on Today

    salesToday: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT SUM(total_amount) AS sales_today FROM sales WHERE DATE(sale_date) = CURDATE()")
            const remainVolume = rows[0].sales_today || 0;
            res.json({ sales_today: remainVolume })
            // res.json({data:rows})
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },

}

module.exports = purchasesController