async function UpdateProductController(req, res) {
    try {
        const { name, description, summary, price, category, stock, imageUrl, manufacturarName, productId, shipping,processor, memory, display, storage, color } = req.body;

        const payLoad = {
            ...(name && {name}),
            ...(description && {description}),
            ...(summary && {summary}),
            ...(price && {price}),
            ...(category && {category}),
            ...(stock && {stock}),
            ...(name && {name}),
            ...(name && {name}),
            ...(name && {name}),
            ...(name && {name}),
            ...(name && {name}),
            ...(name && {name}),
        }
    } catch (error) {
        res.status(500).json({
            message : "ERROR",
            success: false,
            error: true
        })
    }
}