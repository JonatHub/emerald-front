export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    endpoints: {
      products: '/api/v1/emeralds',
      orders: '/api/v1/orders',
    },
  },
  paypal: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  },
} as const; 