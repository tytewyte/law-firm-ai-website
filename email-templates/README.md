# Velocity Leads Email Templates

Professional HTML email templates matching your website's neon/futuristic design aesthetic.

---

## 📧 Available Templates

### 1. **welcome-email.html**
**Purpose:** Sent immediately after a new user signs up  
**Variables to replace:**
- `[CLIENT_NAME]` - Client's first name
- `[BOOKING_LINK]` - Link to booking page

**Use case:** Onboarding new clients, setting expectations, encouraging demo booking

---

### 2. **demo-confirmation.html**
**Purpose:** Confirms scheduled demo appointment  
**Variables to replace:**
- `[CLIENT_NAME]` - Client's first name
- `[DEMO_DATE]` - Full date (e.g., "Monday, January 15, 2026")
- `[DEMO_TIME]` - Time (e.g., "2:00 PM")
- `[TIMEZONE]` - Timezone (e.g., "CST")
- `[MEETING_LINK]` - Zoom/Teams meeting URL
- `[CALENDAR_LINK]` - Add to calendar link (.ics file or Google Calendar)

**Use case:** Appointment confirmation, reducing no-shows, setting expectations

---

### 3. **lead-notification.html**
**Purpose:** Alerts you when AI agent captures a new lead  
**Variables to replace:**
- `[LEAD_NAME]` - Lead's full name
- `[LEAD_PHONE]` - Lead's phone number
- `[LEAD_EMAIL]` - Lead's email address
- `[CASE_TYPE]` - Type of case (e.g., "Personal Injury")
- `[TIMESTAMP]` - When lead was captured (e.g., "Dec 24, 2025 at 3:15 PM CST")
- `[CASE_DESCRIPTION]` - Brief description of their case
- `[LEAD_SCORE]` - AI score 0-100
- `[SCORE_LABEL]` - Label (e.g., "High Priority", "Qualified", "Follow Up")
- `[CRM_LINK]` - Link to full conversation in your CRM
- `[RESPONSE_TIME]` - How fast AI responded (e.g., "0.3s")
- `[MESSAGES_COUNT]` - Number of messages exchanged
- `[DURATION]` - Length of conversation (e.g., "4m 23s")

**Use case:** Real-time lead notifications, quick response enablement

---

### 4. **follow-up-email.html**
**Purpose:** Re-engage prospects who haven't booked a demo  
**Variables to replace:**
- `[CLIENT_NAME]` - Client's first name
- `[BOOKING_LINK]` - Link to booking page
- `[UNSUBSCRIBE_LINK]` - Unsubscribe URL

**Use case:** Nurture sequence, converting cold leads, urgency messaging

---

## 🎨 Design Features

All templates include:
- **Neon cyan (#22D3EE) and purple (#8B5CF6) color scheme**
- **Dark mode design** matching your website
- **Responsive layout** (works on mobile and desktop)
- **Inline CSS** (required for email clients)
- **Professional typography** using Inter font stack
- **Glowing effects** and shadows for futuristic feel
- **Clear CTAs** with gradient buttons
- **Structured information boxes**

---

## 🚀 How to Use

### Option 1: Manual Replacement
1. Open the template file
2. Find and replace all `[VARIABLE]` placeholders
3. Send via your email client

### Option 2: Email Service Integration
Use with services like:
- **Mailchimp** - Import HTML, use merge tags
- **SendGrid** - Use dynamic templates
- **Postmark** - Use template variables
- **Custom SMTP** - Use string replacement in your code

### Option 3: Code Integration
```javascript
// Example: Node.js with Nodemailer
const fs = require('fs');
const nodemailer = require('nodemailer');

// Read template
let template = fs.readFileSync('./email-templates/welcome-email.html', 'utf8');

// Replace variables
template = template.replace('[CLIENT_NAME]', 'John Doe');
template = template.replace('[BOOKING_LINK]', 'https://avantaisolutions.netlify.app/booking.html');

// Send email
const transporter = nodemailer.createTransport({...});
await transporter.sendMail({
  from: 'contactavantaisolutions@protonmail.com',
  to: 'client@example.com',
  subject: 'Welcome to Velocity Leads!',
  html: template
});
```

---

## ✅ Testing Checklist

Before sending:
1. ✅ Replace ALL `[VARIABLE]` placeholders
2. ✅ Test in Gmail, Outlook, Apple Mail
3. ✅ Check mobile rendering
4. ✅ Verify all links work
5. ✅ Test unsubscribe link (if applicable)
6. ✅ Check spam score (use Mail Tester)

---

## 📱 Mobile Optimization

All templates are responsive and tested on:
- iPhone (iOS Mail)
- Android (Gmail app)
- Outlook mobile
- Desktop clients

---

## 🎯 Best Practices

**Subject Lines:**
- Welcome: "Welcome to Velocity Leads - Let's Get Started! 🚀"
- Demo Confirmation: "Your Velocity Leads Demo is Confirmed ✅"
- Lead Notification: "🎯 New Lead: [LEAD_NAME] - [CASE_TYPE]"
- Follow-up: "Still losing leads? Here's what you're missing..."

**Sending Tips:**
- Send welcome emails immediately (within 1 minute)
- Send demo confirmations instantly + 24hr reminder
- Send lead notifications in real-time
- Send follow-ups 3 days, 7 days, 14 days after signup

**Personalization:**
- Always use first name
- Reference their practice area if known
- Include specific pain points they mentioned
- Add local timezone for appointments

---

## 🔧 Customization

To match your branding:
1. Update colors in inline styles
2. Change logo/company name in header
3. Modify footer contact information
4. Adjust CTA button text
5. Add your logo image (host on CDN)

---

## 📊 Tracking

Add UTM parameters to links:
```
[BOOKING_LINK]?utm_source=email&utm_medium=welcome&utm_campaign=onboarding
```

Track:
- Open rates
- Click-through rates
- Conversion rates
- Unsubscribe rates

---

## 🆘 Support

Questions about the templates?
- Email: contactavantaisolutions@protonmail.com
- Phone: 337-660-7184

---

**Created for Velocity Leads**  
**© 2025 - All templates match avantaisolutions.netlify.app design**
