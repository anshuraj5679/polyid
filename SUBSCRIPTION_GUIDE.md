# University Subscription Guide

## 🎯 How Universities Buy Subscriptions

### Overview
Universities need an active subscription to issue credentials. The subscription system uses **Stripe** for payment processing and **Supabase** for subscription management.

---

## 📋 Subscription Flow

### Step 1: Login
```
1. Go to Login page
2. Enter your university credentials
3. Click "Login"
```

### Step 2: Check Subscription Status
After login, you'll see a badge in the header:
- **Green "✓ Subscribed"** - You have an active subscription
- **Yellow "⚠ No Subscription"** - You need to subscribe

### Step 3: Navigate to Billing Page
```
Option A: Click the subscription status badge in header
Option B: Click "Billing" in the navigation menu
```

### Step 4: View Available Plans
On the Billing page, you'll see:
- Current subscription status
- Available monthly plans
- Plan features and pricing
- Payment options

### Step 5: Subscribe to a Plan
```
1. Review plan details
2. Click "Subscribe Monthly" button
3. Redirected to Stripe Checkout
4. Enter payment information
5. Complete payment
6. Redirected back to application
7. Subscription status updates to "Active"
```

---

## 💳 Payment Process (Stripe)

### What Happens During Checkout:

1. **Redirect to Stripe**
   - Secure Stripe-hosted checkout page
   - SSL encrypted payment processing
   - PCI compliant

2. **Enter Payment Details**
   - Credit/Debit card information
   - Billing address
   - Email for receipts

3. **Payment Methods Accepted**
   - Visa
   - Mastercard
   - American Express
   - Discover
   - And more (depending on Stripe configuration)

4. **Confirmation**
   - Payment processed
   - Subscription activated
   - Receipt sent via email
   - Redirected back to PolyID

---

## 🔧 Technical Setup (For Developers)

### Prerequisites

#### 1. Stripe Account
```
1. Sign up at https://stripe.com
2. Get API keys from Dashboard
3. Add to backend .env:
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 2. Supabase Account
```
1. Sign up at https://supabase.com
2. Create new project
3. Create subscriptions table
4. Add to backend .env:
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_KEY=eyJhbGc...
```

#### 3. Create Subscriptions Table in Supabase

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issuer_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  plan_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_subscriptions_issuer_id ON subscriptions(issuer_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
```

#### 4. Create Stripe Products and Prices

In Stripe Dashboard:
```
1. Go to Products
2. Click "Add Product"
3. Name: "PolyID Monthly Plan"
4. Price: $29/month (or your pricing)
5. Recurring: Monthly
6. Copy Price ID (price_xxx)
7. Add to backend code
```

---

## 🎨 Frontend Flow

### Billing Page Components

#### 1. Subscription Status Display
```jsx
<div className="subscription-status">
  <strong>Status:</strong> {status.active ? "Active" : "Inactive"}
  {status.subscription?.current_period_end && (
    <span>Renews on {formatDate(status.subscription.current_period_end)}</span>
  )}
</div>
```

#### 2. Plan Cards
```jsx
<div className="plan-card">
  <h3>{plan.name}</h3>
  <div className="price">${plan.priceUsd}/{plan.interval}</div>
  <ul className="features">
    {plan.features.map(feature => (
      <li key={feature}>{feature}</li>
    ))}
  </ul>
  <button onClick={() => handleSubscribe(plan.id)}>
    Subscribe Monthly
  </button>
</div>
```

#### 3. Manage Subscription Button
```jsx
{status?.active && (
  <button onClick={openPortal}>
    Manage billing details
  </button>
)}
```

---

## 🔄 Backend API Endpoints

### 1. Get Subscription Status
```
GET /api/billing/status
Headers: { Authorization: Bearer <jwt_token> }

Response:
{
  "active": true,
  "subscription": {
    "status": "active",
    "current_period_end": "2024-12-19T00:00:00Z",
    "plan_id": "price_xxx"
  }
}
```

### 2. Get Available Plans
```
GET /api/billing/plans

Response:
{
  "plans": [
    {
      "id": "price_xxx",
      "name": "Monthly Plan",
      "priceUsd": 29,
      "interval": "month",
      "features": [
        "Unlimited credential issuance",
        "IPFS storage included",
        "Email support"
      ]
    }
  ]
}
```

### 3. Create Checkout Session
```
POST /api/billing/checkout
Headers: { Authorization: Bearer <jwt_token> }
Body: { "planId": "price_xxx" }

Response:
{
  "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### 4. Open Customer Portal
```
POST /api/billing/portal
Headers: { Authorization: Bearer <jwt_token> }

Response:
{
  "portalUrl": "https://billing.stripe.com/p/session/..."
}
```

### 5. Stripe Webhook (Internal)
```
POST /api/billing/webhook
Headers: { stripe-signature: ... }
Body: Stripe event data

Handles:
- checkout.session.completed
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed
```

---

## 💰 Pricing Plans Example

### Basic Plan
```
Name: Basic Monthly
Price: $29/month
Features:
- Unlimited credential issuance
- IPFS storage included
- Email support
- Blockchain verification
- Revocation management
```

### Professional Plan
```
Name: Professional Monthly
Price: $99/month
Features:
- Everything in Basic
- Priority support
- Custom branding
- API access
- Analytics dashboard
- Bulk issuance tools
```

### Enterprise Plan
```
Name: Enterprise
Price: Custom
Features:
- Everything in Professional
- Dedicated support
- SLA guarantee
- Custom integrations
- White-label solution
- On-premise deployment option
```

---

## 🔐 Security & Compliance

### Payment Security
- ✅ PCI DSS compliant (via Stripe)
- ✅ SSL/TLS encryption
- ✅ No card data stored on our servers
- ✅ Stripe handles all payment processing
- ✅ 3D Secure authentication supported

### Data Privacy
- ✅ GDPR compliant
- ✅ Subscription data encrypted
- ✅ Secure webhook verification
- ✅ Access control via JWT tokens

---

## 🧪 Testing Subscriptions

### Development Mode (No Stripe)

When Stripe is not configured:
```
✅ Subscription check bypassed
✅ All universities can issue credentials
✅ No payment required
⚠️  For development/testing only
```

### Stripe Test Mode

Use Stripe test cards:
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## 📊 Subscription Management

### For Universities

#### View Current Subscription
```
1. Login to PolyID
2. Go to Billing page
3. See current status and renewal date
```

#### Update Payment Method
```
1. Go to Billing page
2. Click "Manage billing details"
3. Opens Stripe Customer Portal
4. Update payment method
5. View invoices
6. Download receipts
```

#### Cancel Subscription
```
1. Go to Billing page
2. Click "Manage billing details"
3. Click "Cancel subscription"
4. Confirm cancellation
5. Access until end of billing period
```

#### Reactivate Subscription
```
1. Go to Billing page
2. Click "Subscribe Monthly"
3. Complete payment
4. Subscription reactivated
```

---

## 🚨 Subscription States

### Active
```
Status: "active"
Can issue credentials: ✅ Yes
Billing: Auto-renews monthly
Badge: Green "✓ Subscribed"
```

### Inactive
```
Status: "inactive"
Can issue credentials: ❌ No
Billing: No active subscription
Badge: Yellow "⚠ No Subscription"
Action: Subscribe to activate
```

### Past Due
```
Status: "past_due"
Can issue credentials: ⚠️  Limited
Billing: Payment failed, retrying
Badge: Yellow "⚠ Payment Issue"
Action: Update payment method
```

### Canceled
```
Status: "canceled"
Can issue credentials: ❌ No
Billing: Subscription ended
Badge: Yellow "⚠ No Subscription"
Action: Resubscribe
```

### Trialing (Optional)
```
Status: "trialing"
Can issue credentials: ✅ Yes
Billing: Free trial period
Badge: Blue "🎁 Trial Active"
Action: Will auto-charge after trial
```

---

## 🔔 Notifications

### Email Notifications (via Stripe)

Universities receive emails for:
- ✅ Subscription activated
- ✅ Payment successful
- ✅ Payment failed
- ✅ Subscription canceled
- ✅ Subscription renewed
- ✅ Trial ending soon
- ✅ Invoice available

---

## 💡 Best Practices

### For Universities
1. **Keep payment method updated** - Avoid service interruption
2. **Monitor renewal dates** - Plan budget accordingly
3. **Download invoices** - For accounting records
4. **Contact support** - For billing questions

### For Developers
1. **Use Stripe test mode** - During development
2. **Set up webhooks** - For real-time updates
3. **Handle failed payments** - Grace period logic
4. **Log all transactions** - For debugging
5. **Test edge cases** - Cancellation, reactivation, etc.

---

## 🐛 Troubleshooting

### "Failed to verify subscription status"

**Cause:** Supabase not configured or connection failed

**Solution:**
```
Development: Subscription check bypassed automatically
Production: Configure Supabase credentials in .env
```

### "Active subscription required"

**Cause:** No active subscription

**Solution:**
```
1. Go to Billing page
2. Subscribe to a plan
3. Complete payment
4. Try issuing credential again
```

### Payment Failed

**Cause:** Card declined or insufficient funds

**Solution:**
```
1. Check card details
2. Ensure sufficient funds
3. Try different payment method
4. Contact bank if issue persists
```

### Subscription Not Activating

**Cause:** Webhook not received or processed

**Solution:**
```
1. Check Stripe webhook logs
2. Verify webhook endpoint configured
3. Check backend logs for errors
4. Manually trigger webhook in Stripe Dashboard
```

---

## 📚 Related Documentation

- **Stripe Documentation:** https://stripe.com/docs
- **Supabase Documentation:** https://supabase.com/docs
- **Webhook Testing:** https://stripe.com/docs/webhooks/test
- **Customer Portal:** https://stripe.com/docs/billing/subscriptions/customer-portal

---

## 🎯 Quick Start Checklist

### For Production Deployment

- [ ] Create Stripe account
- [ ] Get Stripe API keys
- [ ] Create products and prices in Stripe
- [ ] Set up Stripe webhooks
- [ ] Create Supabase project
- [ ] Create subscriptions table
- [ ] Configure environment variables
- [ ] Test with Stripe test cards
- [ ] Set up email notifications
- [ ] Configure customer portal
- [ ] Test full subscription flow
- [ ] Monitor webhook events
- [ ] Set up error alerting

---

**Universities can subscribe through the Billing page with just a few clicks!** 💳
