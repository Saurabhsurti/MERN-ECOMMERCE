//  add to wishlist
export const addToWishlist = (data) => async(dispatch, getState) => {
    dispatch({
        type: "addTowishlist",
        payload: data,
    });

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
}


// remove from wishlist
export const removeFromWishlist = (data) => async(dispatch, getState) => {
    dispatch({
        type: "removeFromwishlist",
        payload: data._id,
    });
    localStorage.setItem("wishlistItems",JSON.stringify(getState().wishlist.wishlist));
    return data;
};

