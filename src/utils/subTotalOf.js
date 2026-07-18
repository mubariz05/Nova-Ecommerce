function subtotalOf(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}
export default subtotalOf;