// ! Cart Product Example:
// {
//   id: 1,
//   slug: "product-1",
//   name: "product 1",
//   color: "color-name",
//   price: 10,
//   quantity: 2,
//   accessories: [
//       {id:1, slug: "accessory-1", price: 5, quantity: 1},
//       {id:1, slug: "accessory-1", price: 5, quantity: 1},
//   ],
// }

export const cartActions = {
  loadCart: "LOAD_CART",
  addToCart: "ADD_TO_CART",
  increaseQuantity: "INCREASE_QUANTITY",
  decreaseQuantity: "DECREASE_QUANTITY",
  removeFromCart: "REMOVE_FROM_CART",
  addProductAccessories: "ADD_PRODUCT_ACCESSORIES",
  updateProductAccessoryQuantity: "UPDATE_PRODUCT_ACCESSORY_QUANTITY",
  removeProductAccessories: "REMOVE_PRODUCT_ACCESSORIES",
  clearCart: "CLEAR_CART",
};

export default function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.loadCart: {
      return [...action.payload];
    }

    case cartActions.addToCart: {
      const existingItem = state.find(
        (item) =>
          item.id === action.payload.id && item.color === action.payload.color,
      );

      let nextState;

      if (existingItem?.id) {
        nextState = state.map((item) =>
          item.id === action.payload.id && item.color === action.payload.color
            ? {
                ...item,
                quantity: item.quantity + (action.payload?.quantity || 1),
                accessories: [...action.payload?.accessories],
              }
            : item,
        );
      } else {
        nextState = [...state, { ...action.payload }];
      }

      localStorage.setItem("cart", JSON.stringify(nextState));
      return nextState;
    }

    case cartActions.increaseQuantity: {
      const nextState = state.map((item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? {
              ...item,
              quantity: item.quantity + (action.payload?.quantity || 1),
            }
          : item,
      );

      localStorage.setItem("cart", JSON.stringify(nextState));
      return nextState;
    }

    case cartActions.decreaseQuantity: {
      const nextState = state.map((item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? {
              ...item,
              quantity: item.quantity - (action.payload?.quantity || 1),
            }
          : item,
      );

      localStorage.setItem("cart", JSON.stringify(nextState));
      return nextState;
    }

    case cartActions.removeFromCart: {
      const nextState = state.filter((item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? false
          : true,
      );

      localStorage.setItem("cart", JSON.stringify(nextState));
      return nextState;
    }

    case cartActions.addProductAccessories: {
      const nextState = state.map((item) =>
        item.id === action.payload.productId
          ? {
              ...item,
              accessories: [
                ...item.accessories,
                { ...action.payload.accessory, quantity: 1 },
              ],
            }
          : item,
      );

      localStorage.setItem("cart", JSON.stringify(nextState));
      return nextState;
    }

    case cartActions.updateProductAccessoryQuantity: {
      const nextState = state.map((item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? {
              ...item,
              accessories: item.accessories.map((accessory) =>
                accessory.slug === action.payload.slug
                  ? { ...accessory, quantity: action.payload.quantity }
                  : accessory,
              ),
            }
          : item,
      );

      localStorage.setItem("cart", JSON.stringify(nextState));
      return nextState;
    }

    case cartActions.removeProductAccessories: {
      const nextState = state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              accessories: item.accessories.filter(
                (accessory) => accessory.slug !== action.payload.slug,
              ),
            }
          : item,
      );

      localStorage.setItem("cart", JSON.stringify(nextState));
      return nextState;
    }

    case cartActions.clearCart: {
      localStorage.setItem("cart", []);
      return [];
    }

    default: {
      return state;
    }
  }
}
