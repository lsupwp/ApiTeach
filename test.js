const product = {
  id: 1,
  name: 'Laptop',
  price: 1000
};

// สร้าง Object ใหม่โดยการคัดลอก product เดิมทั้งหมด และแก้ไขแค่ price
const updatedProduct = { ...product, x: 1200 };

console.log('Original Product:', product);
console.log('Updated Product:', updatedProduct);