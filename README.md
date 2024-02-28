# Grocery Management System API

This Node.js application provides a RESTful API for managing grocery items and orders. It uses Express.js for routing and interacts with a database for data persistence.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Radhika1698/qp-assessment.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the database:
   
   - Ensure you have a MySQL database running.
   - Update the database configuration in `common/db.js` if necessary.

4. Start the server:

    ```bash
    npx ts-node endpoints.ts
    ```

## Endpoints

### Admin Endpoints

#### Add a new grocery item
- **URL:** `/admin/grocery-items`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "name": "Item Name",
        "price": 10.99,
        "inventory": 100
    }
    ```
- **Response:**
    - `201 Created` on success, returns the ID of the newly added item.
    ```json
    {
        "message": "Grocery item added successfully",
        "id": 1
    }
    ```

#### View all grocery items
- **URL:** `/admin/grocery-items`
- **Method:** `GET`
- **Response:** 
    - `200 OK` on success, returns an array of all grocery items.

#### Delete a grocery item
- **URL:** `/admin/grocery-items/:id`
- **Method:** `DELETE`
- **Response:** 
    - `204 No Content` on success.

#### Update a grocery item
- **URL:** `/admin/grocery-items/:id`
- **Method:** `PUT`
- **Request Body:**
    ```json
    {
        "name": "New Item Name",
        "price": 15.99,
        "inventory": 120
    }
    ```
- **Response:** 
    - `204 No Content` on success.

#### Increase inventory of a grocery item
- **URL:** `/admin/grocery-items/:id/increase-inventory`
- **Method:** `PUT`
- **Request Body:**
    ```json
    {
        "quantity": 50
    }
    ```
- **Response:** 
    - `204 No Content` on success.

### User Endpoints

#### View available grocery items
- **URL:** `/user/grocery-items`
- **Method:** `GET`
- **Response:** 
    - `200 OK` on success, returns an array of available grocery items.

#### Book multiple grocery items in a single order
- **URL:** `/user/book-order`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "items": [
            { "id": 1, "quantity": 2, "price": 10.99 },
            { "id": 2, "quantity": 1, "price": 5.99 }
        ]
    }
    ```
- **Response:** 
    - `201 Created` on success, returns the ID of the newly created order.
    ```json
    {
        "message": "Order booked successfully",
        "orderId": 123
    }
    ```
