const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const generateWhatsAppLink = (product, quantity, size) => {
  const message = `Hello, I'd like to order:
- Product: ${product.name}
- Quantity: ${quantity}
- Size: ${size}
- Price: ₹${product.price}
Total: ₹${product.price * quantity}

My shipping address is: [Your Address Here]
`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};