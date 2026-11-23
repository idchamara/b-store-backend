import Order from "../models/order.js";
import Product from "../models/product.js";

// create order - only user and admin===================================================================
export async function creatrOrder(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first!"
        })
        return;
    }
    const body = req.body;
    const orderData = {
        orderId: "",
        email: req.user.email,
        name: body.name,
        address: body.address,
        phoneNumber: body.phoneNumber,
        billItems: [],
        total: 0
    }
    // order ID creting================================
    // load the last bills for lastBills variable======
    Order.find().sort({
        date: -1 //sort to last order to top by date
    }).limit(1).then(
        async (lastBills) => {
            if (lastBills.length == 0) {
                orderData.orderId = "BSORD-00001";
            } else {
                // load last bill for lastBill variable==========
                const lastBill = lastBills[0];
                const lastOrderId = lastBill.orderId;
                const lastOrderNumer = lastOrderId.replace("BSORD-", ""); //00001 - type is string
                // convertin to number==========
                const lastOrderNumberInt = parseInt(lastOrderNumer); //1
                const newOrderNumberInt = lastOrderNumberInt + 1; //2
                const newOrderNumberStr = newOrderNumberInt.toString().padStart(5, "0"); //00002 - type is string
                orderData.orderId = "BSORD-" + newOrderNumberStr;
            }

            for (let i = 0; i<body.billItems.length; i++){
                const product = await Product.findOne({productId : body.billItems[i].productId})
                if (product == null){
                    res.status(404).json({
                        message : "Product with product id "+ body.billItems[i].productId + " not found"
                    })
                    return;
                }
                orderData.billItems[i] = {
                    productId : product.productId, //taken from backend for security 
                    productName : product.productName,
                    image : product.images[0],
                    quantity : body.billItems[i].quantity, //taken from frontend
                    price : product.price
                };
                orderData.total = orderData.total + product.price * body.billItems[i].quantity
            }

            const order = new Order(orderData);

            order.save().then(
                () => {
                    res.json({
                        message: "Your order has been placed!"
                    })
                }
            ).catch(
                () => {
                    res.status(500).json({
                        message: "Your order not saved!"
                    })
                }
            )
        }
    )
}
// get order - only user and admin serparate===================================================================
export function getOrders(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first!"
        })
        return;
    }
    if (req.user.role == "admin") { // for admin
        Order.find().then(
            (allOrders) => {
                res.json(allOrders)
            }
        ).catch(
            () => {
                res.status(500).json({
                    message: "Orders not found!"
                })
            }
        )
    } else { // for customers
        Order.find(
            {
                email: req.user.email // add filter
            }
        ).then(
            (allOrders) => {
                res.json(allOrders)
            }
        ).catch(
            () => {
                res.status(500).json({
                    message: "Orders not found!"
                })
            }
        )
    }
}

export async function updateOrders(req, res) {
    try{
        if (req.user == null) {
            res.status(403).json({
                message : "You need to login first!"
            })
            return;
        }
        if (req.user.role != "admin") {
            res.status(403).json({
                message : "You are not authorized to update an order"
            })
            return;
        }
        const orderId = req.params.orderId
        const order = await Order.findOneAndUpdate({orderId : orderId},req.body)

        res.json({
            message : "Order update successfully"
        })
    }catch(err){
        res.status(500).json({
            message : "Order not updated"
        })
    }
}