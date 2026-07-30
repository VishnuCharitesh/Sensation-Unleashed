# Sensation Unleashed

Full-stack e-commerce demo for the Sensation Unleashed Nellore flagship store. It includes a Vite + React storefront and a Spring Boot REST API with JWT security, H2 development storage, seeded products, subscriptions, orders, and support tickets.

## Run locally

Start the API in one terminal:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Start the storefront in a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the address printed by Vite (normally `http://localhost:5173`). The API runs at `http://localhost:8080`; Swagger UI is at `http://localhost:8080/swagger-ui/index.html` and the development H2 console is at `http://localhost:8080/h2-console`.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@sensation.com` | `admin123` |
| VIP subscriber | `subscriber@sensation.com` | `sub123` |
| Customer | `customer@sensation.com` | `cust123` |

The storefront supports an offline demonstration mode: its cart, checkout, membership, support tickets, and role picker work in the browser using local storage and seeded catalog data. The Spring API is ready for connecting these flows to persistent data.

## Verify

```powershell
cd frontend; npm run build
cd ..\backend; .\mvnw.cmd test
```
