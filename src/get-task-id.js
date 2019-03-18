export const getId = {
  id: 0,
  increase() {
    return this.id++;
  },
  reset() {
    this.id = 0;
    return this.id;
  }
};
