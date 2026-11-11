import Product from "../models/product.js";

// add new product - only admin===================================================================
export async function addProduct(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not authorizes to add product"
        })
        return;
    }

    const product = new Product(req.body);

    try {
        await product.save()
        res.json(
            {
                message: "Product saved successfully!"
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                message: "Product not saved!"
            }
        )
    }
};
// Get product - All users===================================================================
export function getProduct(req, res) {
    Product.find().then(
        (products) => {
            res.json(products)
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "Products not found"
            })
        }
    )
};
// update product - only admin=================================================================== 
export function updateProduct(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }
    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not authorizes to add product"
        })
        return;
    }

    Product.findOneAndUpdate({
        productId: req.params.productId
    }, req.body).then(
        () => {
            res.json({
                message: "Product updated successfully"
            });
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "Product not updated"
            });
        }
    );
};
// delete product - only admin===================================================================
export function deleteProduct(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }
    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not authorizes to add product"
        })
        return;
    }
    Product.findOneAndDelete({
        productId: req.params.productId
    }).then(
        () => {
            res.json({
                message: "Product deleted successfully"
            })
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "Product not deleted"
            })
        }
    )
};
