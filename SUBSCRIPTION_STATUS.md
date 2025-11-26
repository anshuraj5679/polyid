# Subscription Status Display

## Overview
The application now displays the subscription status of logged-in universities in the header, making it easy to see at a glance whether they have an active subscription.

## Features

### 1. Real-time Status Badge
When a university admin is logged in, a status badge appears in the header showing:

- **✓ Subscribed** (Green badge) - University has an active subscription
- **⚠ No Subscription** (Yellow badge) - University needs to subscribe

### 2. Quick Access to Billing
- Click on the status badge to navigate directly to the Billing page
- Hover over the badge to see a tooltip with more information

### 3. Auto-refresh
- Subscription status is checked automatically every 30 seconds
- Ensures the status is always up-to-date
- Updates immediately after login

## How to Check Subscription Status

### Method 1: Header Badge (Quick View)
1. Login as a university admin
2. Look at the top-right corner of the header
3. You'll see either:
   - Green badge: "✓ Subscribed" - You can issue credentials
   - Yellow badge: "⚠ No Subscription" - You need to subscribe first

### Method 2: Billing Page (Detailed View)
1. Click on "Billing" in the navigation menu
2. Or click on the subscription status badge
3. View detailed information including:
   - Subscription status (Active/Inactive)
   - Renewal date
   - Plan details
   - Payment management options

## Visual Indicators

```
Header Layout:
┌─────────────────────────────────────────────────────────────┐
│ PolyID  [Nav Items...]  [✓ Subscribed] [Logout] [Connect]  │
└─────────────────────────────────────────────────────────────┘
                              ↑
                    Subscription Status Badge
```

### Badge Colors:
- **Green** = Active subscription ✓
- **Yellow** = No subscription ⚠
- **No badge** = Not logged in

## For Developers

### API Endpoint Used
```
GET /api/billing/status
Headers: { Authorization: Bearer <jwt_token> }
```

### Response Format
```json
{
  "active": true,
  "subscription": {
    "current_period_end": "2025-12-19T00:00:00Z"
  }
}
```

### Implementation Details
- Status is fetched when user logs in
- Auto-refreshes every 30 seconds
- Clears when user logs out
- Stored in React state (not persisted)

## Benefits

1. **Immediate Visibility**: Admins know their subscription status at a glance
2. **Prevents Errors**: Clear warning before attempting to issue credentials
3. **Easy Access**: One click to manage subscription
4. **Always Current**: Auto-refresh ensures accuracy
5. **User-Friendly**: Color-coded for quick recognition
