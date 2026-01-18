# Backend API Specification

## مشخصات API برای پروژه چشمان

---

## Base URL
```
http://localhost:3000/api
```

---

## Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "علی محمدی",
    "email": "user@example.com"
  }
}
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "علی محمدی",
  "email": "user@example.com",
  "password": "password123",
  "phone": "09121234567"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

---

## Products

### Get All Products
```http
GET /products?category=sunglasses&page=1&limit=12
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "عینک آفتابی مدل A",
      "price": 450000,
      "category": "sunglasses",
      "image": "url_to_image",
      "description": "توضیحات محصول",
      "stock": 50
    }
  ],
  "total": 100
}
```

### Get Single Product
```http
GET /products/{id}
```

### Create Product (Admin)
```http
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "عینک جدید",
  "price": 500000,
  "category": "optical",
  "description": "توضیحات",
  "stock": 100,
  "image": "image_url"
}
```

### Update Product (Admin)
```http
PUT /products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 480000,
  "stock": 95
}
```

### Delete Product (Admin)
```http
DELETE /products/{id}
Authorization: Bearer {token}
```

---

## Orders

### Get All Orders
```http
GET /orders
Authorization: Bearer {token}
```

### Create Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 450000
    }
  ],
  "totalAmount": 900000,
  "shippingAddress": "آدرس تحویل",
  "paymentMethod": "card"
}

Response:
{
  "id": "ORD-1001",
  "status": "pending",
  "createdAt": "2023-12-15T10:30:00Z"
}
```

### Get Order Details
```http
GET /orders/{id}
Authorization: Bearer {token}
```

### Update Order Status (Admin)
```http
PUT /orders/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped"  // pending, processing, shipped, delivered, cancelled
}
```

---

## Inventory

### Get Inventory
```http
GET /inventory
Authorization: Bearer {token}
```

### Add to Inventory
```http
POST /inventory
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "1",
  "quantity": 50,
  "nosebridge": "18mm",
  "templeLength": "140mm",
  "lensWidth": "58mm",
  "lensType": "عادی",
  "prescriptionDegree": "+2.50",
  "axis": "180"
}
```

### Update Inventory
```http
PUT /inventory/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 40
}
```

---

## Users

### Get User Profile
```http
GET /users/{id}
Authorization: Bearer {token}
```

### Update User Profile
```http
PUT /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "نام جدید",
  "phone": "09121234567",
  "address": "آدرس جدید"
}
```

---

## Invoices

### Get Invoices
```http
GET /invoices?status=paid&dateFrom=2023-01-01&dateTo=2023-12-31
Authorization: Bearer {token}
```

### Create Invoice
```http
POST /invoices
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "ORD-1001",
  "items": [...],
  "totalAmount": 900000,
  "tax": 90000,
  "discount": 0,
  "notes": "یادداشت‌های فاکتور"
}
```

### Get Invoice PDF
```http
GET /invoices/{id}/pdf
Authorization: Bearer {token}
```

---

## Analytics

### Get Dashboard Analytics
```http
GET /analytics?period=week
Authorization: Bearer {token}

Response:
{
  "totalSales": 50000000,
  "totalOrders": 125,
  "totalCustomers": 89,
  "averageOrderValue": 400000,
  "topProducts": [...],
  "sales": [
    { "date": "2023-12-10", "amount": 5000000 },
    ...
  ]
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "درخواست نامعتبر است",
    "details": {...}
  }
}
```

### Common Error Codes
- `INVALID_REQUEST`: درخواست نامعتبر
- `UNAUTHORIZED`: عدم احراز هویت
- `FORBIDDEN`: دسترسی رد شد
- `NOT_FOUND`: منبع پیدا نشد
- `INTERNAL_ERROR`: خطای داخلی سرور

---

## Rate Limiting

- تعداد درخواست‌ها: 100 درخواست در دقیقه
- Headers:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1703001960
  ```

---

## Data Models

### Product
```
{
  id: string,
  name: string,
  price: number,
  category: string,
  description: string,
  image: string,
  stock: number,
  rating: number,
  reviews: number,
  createdAt: date,
  updatedAt: date
}
```

### Order
```
{
  id: string,
  userId: string,
  items: array,
  totalAmount: number,
  status: string,
  shippingAddress: string,
  paymentMethod: string,
  createdAt: date,
  updatedAt: date
}
```

### User
```
{
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  role: string,
  createdAt: date,
  updatedAt: date
}
```

---

## CORS
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Best Practices

1. **Authentication**: همیشه JWT token را در Authorization header ارسال کنید
2. **Pagination**: برای لیست‌ها از pagination استفاده کنید
3. **Caching**: GET requests را می‌تواند cache کرد
4. **Validation**: تمام input‌ها را validate کنید
5. **Error Handling**: خطاها را صحیح handle کنید

---

**آخرین بروزرسانی**: 1402/10/17
