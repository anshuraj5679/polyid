# How to Subscribe - Step by Step

## 🎯 For Universities: How to Buy a Subscription

### Quick Overview
1. Login to PolyID
2. Go to Billing page
3. Choose a plan
4. Complete payment via Stripe
5. Start issuing credentials!

---

## 📝 Detailed Steps

### Step 1: Login to Your Account

```
1. Go to PolyID website
2. Click "Login" in navigation
3. Enter your email and password
4. Click "Login" button
```

**After login, you'll see:**
- ✅ "Logout" button in header
- ✅ Subscription status badge (Yellow "⚠ No Subscription")

---

### Step 2: Navigate to Billing Page

**Option A: Click the Status Badge**
```
1. Look at top-right corner
2. See yellow badge "⚠ No Subscription"
3. Click on it
4. Opens Billing page
```

**Option B: Use Navigation Menu**
```
1. Look at navigation bar
2. Click "Billing"
3. Opens Billing page
```

---

### Step 3: Review Available Plans

On the Billing page, you'll see:

```
┌─────────────────────────────────────┐
│  Monthly Plan                       │
│                                     │
│  Status: Inactive                   │
│  ⚠ No Subscription                  │
│                                     │
│  Available Plans:                   │
│  ┌──────────────┐ ┌──────────────┐ │
│  │ Basic Plan   │ │ Pro Plan     │ │
│  │ $29/month    │ │ $99/month    │ │
│  │              │ │              │ │
│  │ Features:    │ │ Features:    │ │
│  │ • Unlimited  │ │ • Everything │ │
│  │ • IPFS       │ │   in Basic   │ │
│  │ • Support    │ │ • Priority   │ │
│  │              │ │ • Analytics  │ │
│  │ [Subscribe]  │ │ [Subscribe]  │ │
│  └──────────────┘ └──────────────┘ │
└─────────────────────────────────────┘
```

---

### Step 4: Choose Your Plan

**Compare Plans:**

| Feature | Basic ($29/mo) | Professional ($99/mo) |
|---------|----------------|----------------------|
| Credential Issuance | Unlimited | Unlimited |
| IPFS Storage | ✅ Included | ✅ Included |
| Blockchain Verification | ✅ Yes | ✅ Yes |
| Email Support | ✅ Yes | ✅ Priority |
| API Access | ❌ No | ✅ Yes |
| Analytics Dashboard | ❌ No | ✅ Yes |
| Custom Branding | ❌ No | ✅ Yes |

**Click "Subscribe Monthly" on your chosen plan**

---

### Step 5: Stripe Checkout

You'll be redirected to Stripe's secure checkout page:

```
┌─────────────────────────────────────┐
│  🔒 Secure Checkout - Stripe        │
│                                     │
│  PolyID Monthly Plan                │
│  $29.00 / month                     │
│                                     │
│  Email: admin@university.edu        │
│                                     │
│  Card Information:                  │
│  ┌─────────────────────────────┐   │
│  │ 4242 4242 4242 4242         │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌──────────┐ ┌──────┐ ┌──────┐   │
│  │ MM / YY  │ │ CVC  │ │ ZIP  │   │
│  └──────────┘ └──────┘ └──────┘   │
│                                     │
│  Billing Address:                   │
│  ┌─────────────────────────────┐   │
│  │ Street Address              │   │
│  │ City, State, ZIP            │   │
│  │ Country                     │   │
│  └─────────────────────────────┘   │
│                                     │
│  [ Subscribe ]                      │
│                                     │
│  🔒 Powered by Stripe               │
└─────────────────────────────────────┘
```

---

### Step 6: Enter Payment Information

**Card Details:**
```
Card Number: 4242 4242 4242 4242 (for testing)
Expiry: 12/25 (any future date)
CVC: 123 (any 3 digits)
ZIP: 12345 (any 5 digits)
```

**Billing Address:**
```
Street: 123 University Ave
City: Cambridge
State: MA
ZIP: 02138
Country: United States
```

**Click "Subscribe" button**

---

### Step 7: Payment Processing

```
Processing payment...
⏳ Please wait...

✅ Payment Successful!
✅ Subscription Activated!

Redirecting back to PolyID...
```

---

### Step 8: Confirmation

Back on PolyID, you'll see:

```
┌─────────────────────────────────────┐
│  ✅ Payment successful!              │
│  Your subscription will activate    │
│  within a few seconds.              │
└─────────────────────────────────────┘

Status: Active ✓
Renews on: December 19, 2024

[ Manage billing details ]
```

**Header badge changes to:**
```
Green badge: "✓ Subscribed"
```

---

### Step 9: Start Issuing Credentials!

```
1. Go to "Issue" page
2. Fill in credential details
3. Click "Issue"
4. ✅ Success! No subscription error
```

---

## 🎉 You're All Set!

### What You Can Do Now:

✅ **Issue unlimited credentials**
- No more subscription errors
- Full access to all features

✅ **Manage your subscription**
- Update payment method
- View invoices
- Download receipts
- Cancel anytime

✅ **Monitor usage**
- Track credentials issued
- View subscription status
- Check renewal date

---

## 💳 Payment Methods Accepted

### Credit/Debit Cards:
- ✅ Visa
- ✅ Mastercard
- ✅ American Express
- ✅ Discover
- ✅ Diners Club
- ✅ JCB

### Digital Wallets (if enabled):
- ✅ Apple Pay
- ✅ Google Pay
- ✅ Link (Stripe)

---

## 🔄 Managing Your Subscription

### Update Payment Method

```
1. Go to Billing page
2. Click "Manage billing details"
3. Opens Stripe Customer Portal
4. Click "Update payment method"
5. Enter new card details
6. Click "Save"
```

### View Invoices

```
1. Go to Billing page
2. Click "Manage billing details"
3. See list of all invoices
4. Click "Download" for PDF
5. Use for accounting/records
```

### Cancel Subscription

```
1. Go to Billing page
2. Click "Manage billing details"
3. Click "Cancel subscription"
4. Confirm cancellation
5. Access until end of billing period
```

---

## 🧪 Testing (Development Mode)

### For Developers/Testing:

**Without Stripe configured:**
```
✅ Subscription check bypassed
✅ Can issue credentials freely
✅ No payment required
⚠️  Development mode only
```

**With Stripe Test Mode:**
```
Use test card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits

✅ Test full payment flow
✅ No real charges
✅ Safe for testing
```

---

## 📧 Email Notifications

After subscribing, you'll receive emails for:

### Immediate:
- ✅ Payment receipt
- ✅ Subscription confirmation
- ✅ Welcome email

### Ongoing:
- ✅ Monthly renewal receipts
- ✅ Payment failure alerts
- ✅ Subscription updates
- ✅ Cancellation confirmation

---

## 💰 Pricing & Billing

### Monthly Billing Cycle

```
Subscribe: November 19, 2024
First Charge: $29.00 (immediate)
Next Charge: December 19, 2024
Renewal: Automatic monthly
```

### What's Included:

**Basic Plan ($29/month):**
- Unlimited credential issuance
- IPFS storage for documents
- Blockchain verification
- Email support
- Revocation management
- Standard features

**Professional Plan ($99/month):**
- Everything in Basic
- Priority support
- API access
- Analytics dashboard
- Custom branding
- Bulk issuance tools
- Advanced features

---

## 🔐 Security & Privacy

### Payment Security:
- 🔒 SSL/TLS encryption
- 🔒 PCI DSS compliant
- 🔒 Stripe handles all card data
- 🔒 No card info stored on our servers
- 🔒 3D Secure authentication

### Data Privacy:
- 🔒 GDPR compliant
- 🔒 Encrypted database
- 🔒 Secure API endpoints
- 🔒 Access control via JWT
- 🔒 Regular security audits

---

## ❓ Common Questions

### Q: When will I be charged?
**A:** Immediately upon subscription, then monthly on the same date.

### Q: Can I cancel anytime?
**A:** Yes! Cancel anytime. Access until end of billing period.

### Q: What if payment fails?
**A:** We'll retry automatically. Update payment method to avoid interruption.

### Q: Do you offer refunds?
**A:** Pro-rated refunds available. Contact support.

### Q: Can I change plans?
**A:** Yes! Upgrade/downgrade anytime. Pro-rated billing applies.

### Q: Is there a free trial?
**A:** Contact sales for trial options.

### Q: What happens if I cancel?
**A:** Access until end of billing period, then subscription ends.

### Q: Can I get an invoice?
**A:** Yes! Automatic invoices sent via email. Download from portal.

---

## 🆘 Need Help?

### Billing Support:
- 📧 Email: billing@polyid.com
- 💬 Chat: Available in dashboard
- 📞 Phone: +1 (555) 123-4567
- 🕐 Hours: Mon-Fri 9am-5pm EST

### Technical Support:
- 📧 Email: support@polyid.com
- 📚 Docs: docs.polyid.com
- 💬 Community: community.polyid.com

---

## ✅ Success Checklist

After subscribing, verify:

- [ ] Green "✓ Subscribed" badge in header
- [ ] Billing page shows "Active" status
- [ ] Renewal date displayed
- [ ] Can issue credentials without errors
- [ ] Received confirmation email
- [ ] Invoice available in portal

---

**Ready to subscribe? Login and go to the Billing page!** 💳
