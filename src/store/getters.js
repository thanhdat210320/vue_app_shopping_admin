export const orderTotalPrice = (state) =>{
    let total = 0;
    state.viewOders.forEach((item) => (
        total +=item.price * item.quantity
    ));
    return total;
}
export const toTalProducts = () => {
  return 10000;
};