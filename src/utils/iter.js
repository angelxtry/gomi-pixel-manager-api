export const each = (fn, iter) => {
  for (let i = 0; i < iter.length; i++) {
    fn(iter[i], i, iter);
  }
  return iter;
};

export const map = (fn, iter) => {
  const res = [];
  each((a, i) => res.push(fn(a, i, iter)), iter);
  return res;
};

export const filter = (fn, iter) => {
  const res = [];
  each((a, i) => {
    if (fn(a, i, iter)) res.push(a);
  }, iter);
  return res;
};

export const reduce = (fn, acc, iter) => {
  
}
