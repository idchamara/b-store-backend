import Order from "../models/order.js";

// create order - only user and admin===================================================================
export function creatrOrder(req, res) {
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
        (lastBills) => {
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