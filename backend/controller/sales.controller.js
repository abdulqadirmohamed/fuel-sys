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
    // remaining_Volume: async (req, res) => {
    //     try {
    //         const [rows] = await pool.query(
    //             'SELECT MINUS (volume) AS total_sales_today FROM sales WHERE DATE(sale_date) = CURDATE()'
    //         );

    //         const totalSalesToday = rows[0].total_sales_today || 0;
    //         res.json({ total_sales_today: totalSalesToday });
    //     } catch (error) {
    //         res.status(500).json({ error: 'Failed to retrieve today\'s sales' });
    //     }
    // },

    // Endpoint to get remaining volume
    remaining_Volume: async (req, res) => {
        try {
            // Query to get the total sales volume today
            const [salesRows] = await pool.query(
                'SELECT SUM(volume) AS total_sales_today FROM sales WHERE DATE(sale_date) = CURDATE()'
            );
            const totalSalesToday = salesRows[0].total_sales_today || 0;

            // Query to get the total recorded volume today
            const [recordedRows] = await pool.query(
                'SELECT SUM(volume) AS total_recorded_volume_today FROM fuel_management WHERE DATE(entry_date) = CURDATE()'
            );
            const totalRecordedVolumeToday = recordedRows[0].total_recorded_volume_today || 0;

            // Calculate the remaining volume
            const totalRemainingVolume = totalRecordedVolumeToday - totalSalesToday;

            res.json({
                total_sales_today: totalSalesToday,
                total_remaining_volume: totalRemainingVolume
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve volume data' });
        }
    },




}

module.exports = purchasesController