# Fixify v2 — real version

Marketplace for home services with unified auth, bookings, chat, mock payments, reviews.

## Run

Backend:
```
cd server
cp .env.example .env   # fill MONGODB_URI + JWT_SECRET_KEY
npm install
npm start              # :5000
```

Frontend:
```
cd client
npm install
npm run dev            # :5173
```

Set `VITE_APP_URI_API=https://your-api` in `client/src/.env` for production.

## New API (v2)

- `POST /api/v2/auth/register` {name,email,phone,password,role,aadhar?,jobType?}
- `POST /api/v2/auth/login`
- `GET /api/v2/auth/me`
- `POST /api/bookings` (auth, customer)
- `GET /api/bookings/mine`
- `PATCH /api/bookings/:id/status` {accepted|in_progress|completed|cancelled}
- `GET/POST /api/messages/:bookingId`
- `POST /api/reviews`
- `GET /api/reviews/provider/:id`
- `GET /api/health`

Legacy `/api/auth/*` routes still work for old accounts.

## OTP / Google (next)

Auth is ready for it: `User` model has single `role` field. Add:
1. `POST /api/v2/auth/otp/request` + verify (Twilio/MSG91), or
2. Google OAuth via `passport-google-oauth20`, linking by email.

## Payments (next)

`BookingDetail` has a mock pay button. Plug Razorpay/Stripe:
1. Create order server-side, 2. verify webhook, 3. set `paymentStatus=paid`.
