const db = require('../database/index');

const reportController = {
    getReport: async (req, res) => {
        const query = `
        SELECT 
            customers.name AS customer_name,
            customers.phone,
            customers.address,
            sales.sale_date,
            items.item_name,
            sales.volume,
            sales.total_amount,
            (SELECT SUM(volume) FROM sales WHERE customer_id = customers.id) AS total_volume_purchased,
            (SELECT SUM(total_amount) FROM sales WHERE customer_id = customers.id) AS total_amount_spent
        FROM 
            customers
        JOIN 
            sales ON customers.id = sales.customer_id
        JOIN 
            items ON sales.item_id = items.id
        WHERE 
            customers.id = ?;
    `;
        try {
            const { customerId } = req.params
            const [rows, fields] = await db.query(query, [customerId])
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
module.exports = reportController