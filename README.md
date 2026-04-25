# SAF Mobiles – Product Management Module
### Deliverable 2: Complete CRUD Module

---

## 📦 Project Structure

```
safmobiles/
│
├── index.html              ← Homepage
├── login.html              ← Login page
├── admin.html              ← ★ CRUD Admin Dashboard (main module)
├── products.html           ← Public product listing
├── product-detail.html     ← Single product view
├── cart.html               ← Shopping cart
├── compare.html            ← Device comparison
├── sell.html               ← Sell your phone
├── chat.html               ← Support chat
│
├── styles.css              ← Global stylesheet
├── data.js                 ← Static product data (JS fallback)
├── app.js                  ← Shared JS logic
│
├── database.sql            ← ★ Full DB schema + seed data
│
└── api/                    ← PHP Backend (runs on MAMP)
    ├── db.php              ← DB connection + CORS headers
    ├── check_auth.php      ← Session authentication check
    ├── login.php           ← Login endpoint
    ├── logout.php          ← Logout endpoint
    ├── products_read.php   ← ★ READ  – GET all or single product
    ├── products_create.php ← ★ CREATE – POST new product
    ├── products_update.php ← ★ UPDATE – POST edit product
    └── products_delete.php ← ★ DELETE – POST remove product
```

---

## ✅ CRUD Module: Product Management

| Operation | Endpoint | Method | Description |
|-----------|----------|--------|-------------|
| **Create** | `api/products_create.php` | POST | Add a new product to inventory |
| **Read**   | `api/products_read.php`   | GET  | List all products or fetch by `?id=N` |
| **Update** | `api/products_update.php` | POST | Edit an existing product by ID |
| **Delete** | `api/products_delete.php` | POST | Remove a product permanently |

---

## 🚀 Deployment Guide

### Step 1 – Import the Database (MAMP)

1. Open **MAMP** → Start Servers
2. Go to `http://localhost:8888/phpMyAdmin`
3. Click **Import** → choose `database.sql` → click **Go**
4. Database `safmobiles_db` will be created with sample products

### Step 2 – Set up the PHP API (MAMP)

1. Copy the entire `safmobiles/` folder into MAMP's web root:
   - **Mac MAMP:** `/Applications/MAMP/htdocs/safmobiles/`
   - **Windows MAMP:** `C:\MAMP\htdocs\safmobiles\`
2. Verify the API works by visiting:
   `http://localhost:8888/safmobiles/api/products_read.php`
   *(You'll see a 401 – that's correct; you need to be logged in)*

> **XAMPP users:** Change port to `80` and update `db.php` password to `''` (empty string)

### Step 3 – Configure API Base URL

In **`admin.html`**, find this line (near the bottom `<script>`):

```javascript
const API_BASE = 'http://localhost:8888/safmobiles/api';
```

Change it to match your MAMP path. If using XAMPP:
```javascript
const API_BASE = 'http://localhost/safmobiles/api';
```

Also update the same line in `login.html`, `index.html`, and any page that calls the API.

### Step 4 – Host Frontend on GitHub Pages

1. Create a new GitHub repository (e.g. `safmobiles`)
2. Push **only the frontend files** (NOT the `api/` folder):
   ```
   index.html, login.html, admin.html, products.html,
   product-detail.html, cart.html, compare.html, sell.html,
   chat.html, styles.css, data.js, app.js, assets/
   ```
3. In GitHub → Settings → Pages → set source to `main` branch → Save
4. Your site will be live at: `https://YOUR_USERNAME.github.io/safmobiles/`

### Step 5 – Connect GitHub Pages → MAMP API

Since GitHub Pages is static, the PHP API must run on MAMP (or another PHP host).

**Option A – Local network (for demo/presentation):**
- Keep MAMP running on your laptop
- Both GitHub Pages and MAMP must be on the same network
- API_BASE stays as `http://localhost:8888/safmobiles/api`
- ⚠️ This only works when presenting from your own machine

**Option B – Free PHP hosting (for full online access):**
Recommended free hosts that support PHP + MySQL:
- **InfinityFree** → https://www.infinityfree.com
- **000WebHost** → https://www.000webhost.com
- **Freehostia** → https://www.freehostia.com

Steps:
1. Sign up for free PHP hosting
2. Upload the `api/` folder via their File Manager or FTP
3. Import `database.sql` via their phpMyAdmin
4. Update `API_BASE` in `admin.html` to your new host URL
5. Update CORS in `api/db.php`:
   ```php
   // Replace the wildcard with your GitHub Pages URL:
   header("Access-Control-Allow-Origin: https://YOUR_USERNAME.github.io");
   ```

---

## 🔐 Login Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `password123` |

---

## ⚙️ Technical Requirements Checklist

- ✅ **Functional HTML pages** — `admin.html` with full product management UI
- ✅ **PHP APIs** — 4 separate endpoints for each CRUD operation
- ✅ **AJAX (fetch + FormData)** — All operations use `fetch()` with `FormData`
- ✅ **Database interaction** — MySQL via PDO with prepared statements
- ✅ **Session handling** — Login required for all API endpoints (`check_auth.php`)
- ✅ **User-friendly UI** — Modals, toast notifications, search/filter, KPI cards, image thumbnails, loading states, skeleton screens

---

## 🔧 db.php Settings Reference

```php
$host     = 'localhost';
$db_name  = 'safmobiles_db';
$username = 'root';
$password = 'root';    // MAMP default
// XAMPP default password is '' (empty string)
```

MAMP default port is **8888**. If you changed it, update `API_BASE` accordingly.
