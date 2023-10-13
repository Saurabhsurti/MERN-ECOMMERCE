//  Create Token and saving that in cookies 
const sendShopToken = (seller, statusCode, res) => {
    const token = seller.getJwtToken();

    // Option for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 *60 *60 *1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie("seller_token", token, options).json({
        success: true,
        seller,
        token,
    });
};
// console.log(sendShopToken)
module.exports = sendShopToken;