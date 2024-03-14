import express from "express";
import cors from "cors";


// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken:'APP_USR-8752286212457812-020911-bc46b85552fbc9673e1ecde4275494ef-1673730667'});


const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

// API
app.get("/", (req, res) => {
    res.send("Sou eu!");
});

app.post("/preference", async (req, res) => {
    try {
        console.log('Datos recibidos en el servidor:', req.body);
        const body = {
            items: [
                {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.unit_price),
                currency_id: req.body.currency_id,
            
            },
        ],

            back_urls: {
                success: 'https://www.danirivero.com',
                failure: 'http://www.danirivero.com',
                pending: 'http://www.danirivero.com',
              },
              auto_return: 'approved',
             // notification_url: 'https://mercadobacktest.onrender.com/webhook'
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        console.log('Respuesta del servidor:', result);
        res.json({
            id: result.id,
        })

    } catch (err) {
        res.status(500).send("preference" + err);
    }
});

/*
app.post('/webhook', async function (req, res){
    const payment = req.query;
    console.log({ payment });

    const paymentId = req.query.id;

    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        });

        if(response.ok){
            const data = await response.json();
            console.log(data);
        }

        res.sendStatus(200);

    } catch (error) {
        console.error('Error', error);
        res.sendStatus(500);
    }
})
*/

app.listen(port, () => {
    console.log("listening on port " + port);
});