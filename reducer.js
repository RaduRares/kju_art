// reducer.js
export const initialState = {
    basket: [],
  };
  
  export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);
  
  const basketReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_BASKET':
        // Check if the item is already in the basket
       
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.item.id
        );
        
        let newBasket = [...state.basket];
        
        if (index >= 0) {
          // Item exists in basket, update the quantity
          newBasket[index].quantity += action.item.quantity;
        } else {
          // Item is new, set quantity to 1
          newBasket.push(action.item);    
            }
        
        return {
          ...state,
          basket: newBasket,
        };
      
        case 'INCREMENT_QUANTITY':
            const updatedBasket = state.basket.map((item) => {
                if (item.id === action.id) {
                  return { ...item, quantity: item.quantity + action.quantity }; // Add the passed quantity
                } else {
                  return item;
                }
              });
              return {
                ...state,
                basket: updatedBasket,
              };
          
  
      // ... handle other actions
  
      default:
        return state;
    }
  };
  
  export default basketReducer;
  