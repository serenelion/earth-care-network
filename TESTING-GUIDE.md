# Testing Guide - UX Optimization
**Date:** February 8, 2026

## ✅ Quick Verification Checklist

### Backend Status
```bash
cd ~/Projects/earth-care-network/backend
source venv/bin/activate
python manage.py check
```

**Expected**: System check identified no issues (0 silenced).

### Frontend Status
```bash
cd ~/Projects/earth-care-network/frontend
npm run dev
```

**Expected**: Vite dev server running on http://localhost:5173

---

## 🧪 Feature Testing

### 1. Mobile Navigation
**Test Steps:**
1. Open http://localhost:5173 on mobile or resize browser to < 768px
2. Click hamburger menu (☰) in top right
3. Verify side drawer slides in from right
4. Click any navigation link
5. Verify menu auto-closes

**Expected Results:**
- ✅ Smooth slide-in animation
- ✅ Menu covers 80% width (max 300px)
- ✅ All links visible and accessible
- ✅ Menu closes on link click
- ✅ Menu closes when clicking outside (on backdrop)

### 2. Desktop Navigation
**Test Steps:**
1. Open http://localhost:5173 on desktop (> 768px)
2. Verify horizontal navigation bar
3. Hover over nav links
4. Click through all pages

**Expected Results:**
- ✅ No hamburger menu visible
- ✅ Horizontal layout with proper spacing
- ✅ Hover states work
- ✅ Active link highlighted
- ✅ Submit button prominently styled

### 3. Directory Listing Pages
**Test Each: Projects, Services, Capital**

**Test Steps:**
1. Navigate to /projects (or /services, /capital)
2. Verify page header with icon
3. Test search functionality
4. Test category filter
5. Click on a card to view details

**Expected Results:**
- ✅ Page loads with proper header
- ✅ Search works in real-time
- ✅ Clear search button appears when typing
- ✅ Category filter works
- ✅ Cards display properly in responsive grid
- ✅ Featured badges visible on featured entries
- ✅ Click navigates to detail page

### 4. Enterprise Profile Pages
**Test Each: Project Detail, Service Detail, Capital Detail**

**Test Steps:**
1. From directory page, click any card
2. Verify breadcrumb navigation
3. Check all profile sections load
4. Test contact links
5. Click "Back to [Projects/Services/Capital]" button

**Expected Results:**
- ✅ Breadcrumb shows: Home › [Type] › [Name]
- ✅ Profile header with icon and title
- ✅ Two-column layout on desktop
- ✅ Stacked layout on mobile
- ✅ All contact info clickable
- ✅ Tags display properly
- ✅ Featured badge shows if applicable
- ✅ Verified badge shows if verified
- ✅ Back button returns to listing

### 5. Responsive Design
**Breakpoints to Test:**

#### Mobile (< 640px)
**Expected:**
- ✅ Single column layout
- ✅ Hamburger menu
- ✅ Stacked cards
- ✅ Full-width search
- ✅ Touch-friendly tap targets
- ✅ Readable text size

#### Tablet (640-768px)
**Expected:**
- ✅ 2-column card grid
- ✅ Hamburger menu
- ✅ Proper spacing
- ✅ Readable content

#### Desktop (769-1024px)
**Expected:**
- ✅ 3-column card grid
- ✅ Horizontal navigation
- ✅ Optimal line lengths
- ✅ Profile 2-column layout

#### Large (1024px+)
**Expected:**
- ✅ Full grid layouts
- ✅ Sidebar layouts on profiles
- ✅ Max-width containers
- ✅ Proper white space

### 6. Loading & Error States
**Test Steps:**

#### Loading State:
1. Slow down network in DevTools
2. Navigate to any directory page
3. Verify loading spinner appears

**Expected:**
- ✅ Animated spinner
- ✅ Loading message
- ✅ Centered on page

#### Error State:
1. Stop backend server
2. Try to load directory page
3. Verify error message appears

**Expected:**
- ✅ Error icon (⚠️)
- ✅ Clear error message
- ✅ "Try Again" button visible

#### Empty State:
1. Search for something that doesn't exist
2. Verify empty state appears

**Expected:**
- ✅ Empty icon (🔍)
- ✅ Helpful message
- ✅ Call-to-action button

### 7. Search & Filter Functionality
**Test Steps:**
1. Go to any directory page
2. Type in search box
3. Verify real-time filtering
4. Click clear button (X)
5. Select category filter
6. Combine search + filter

**Expected Results:**
- ✅ Results filter as you type
- ✅ Clear button appears when typing
- ✅ Clear button removes search text
- ✅ Category filter works independently
- ✅ Search + filter work together
- ✅ No results shows empty state

### 8. Visual Design & Branding
**Check Each Page:**

**Colors:**
- ✅ TerraLux Gold used for CTAs and accents
- ✅ Earth Green used for headings and links
- ✅ Forest Green used for hero/footer sections
- ✅ Proper contrast ratios (WCAG AA)

**Typography:**
- ✅ Consistent font sizes
- ✅ Proper hierarchy (h1 > h2 > h3)
- ✅ Readable line heights
- ✅ Responsive scaling

**Spacing:**
- ✅ Consistent padding/margins
- ✅ Proper whitespace
- ✅ Visual breathing room
- ✅ No cramped sections

**Components:**
- ✅ Cards have consistent styling
- ✅ Buttons have proper states (hover, active)
- ✅ Forms are well-styled
- ✅ Shadows and borders consistent

### 9. Accessibility Testing
**Manual Tests:**

#### Keyboard Navigation:
1. Use Tab to navigate
2. Verify focus states visible
3. Test Enter/Space on buttons

**Expected:**
- ✅ Clear focus indicators
- ✅ Logical tab order
- ✅ All interactive elements accessible

#### Screen Reader (Optional):
1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate through pages
3. Verify content is announced properly

**Expected:**
- ✅ Page titles announced
- ✅ Landmarks identified
- ✅ Button purposes clear

### 10. Performance Testing
**Chrome DevTools:**

#### Lighthouse Audit:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run Mobile audit
4. Run Desktop audit

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

#### Network Analysis:
1. Go to Network tab
2. Reload page
3. Check load times

**Expected:**
- ✅ Initial load < 2s
- ✅ Images optimized
- ✅ No unnecessary requests
- ✅ Proper caching

---

## 🔍 Browser Compatibility

### Test In:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)

### Known Issues:
- None at this time

---

## 🐛 Common Issues & Solutions

### Issue: Backend not responding
**Solution:**
```bash
cd ~/Projects/earth-care-network/backend
source venv/bin/activate
python manage.py runserver 127.0.0.1:8080
```

### Issue: Frontend won't start
**Solution:**
```bash
cd ~/Projects/earth-care-network/frontend
rm -rf node_modules
npm install
npm run dev
```

### Issue: API 404 errors
**Problem:** VITE_API_URL incorrect
**Solution:**
```bash
# In frontend/.env
VITE_API_URL=http://localhost:8080/api
```

### Issue: Mobile menu won't close
**Problem:** JavaScript state issue
**Solution:** Hard refresh browser (Cmd+Shift+R or Ctrl+F5)

### Issue: Styles not loading
**Problem:** CSS import order
**Solution:** Check that brand.css is imported first in App.css

---

## 📊 Test Results Template

### Test Date: ____________
### Tester: ____________

| Feature | Status | Notes |
|---------|--------|-------|
| Mobile Navigation | ☐ Pass ☐ Fail | |
| Desktop Navigation | ☐ Pass ☐ Fail | |
| Projects Listing | ☐ Pass ☐ Fail | |
| Services Listing | ☐ Pass ☐ Fail | |
| Capital Listing | ☐ Pass ☐ Fail | |
| Project Detail | ☐ Pass ☐ Fail | |
| Service Detail | ☐ Pass ☐ Fail | |
| Capital Detail | ☐ Pass ☐ Fail | |
| Search Functionality | ☐ Pass ☐ Fail | |
| Category Filters | ☐ Pass ☐ Fail | |
| Mobile Responsive | ☐ Pass ☐ Fail | |
| Tablet Responsive | ☐ Pass ☐ Fail | |
| Desktop Responsive | ☐ Pass ☐ Fail | |
| Loading States | ☐ Pass ☐ Fail | |
| Error States | ☐ Pass ☐ Fail | |
| Empty States | ☐ Pass ☐ Fail | |
| Visual Design | ☐ Pass ☐ Fail | |
| Accessibility | ☐ Pass ☐ Fail | |
| Performance | ☐ Pass ☐ Fail | |

---

## ✅ Sign-Off

**Development Complete:** ☐ Yes ☐ No  
**Testing Complete:** ☐ Yes ☐ No  
**Ready for Production:** ☐ Yes ☐ No  

**Notes:**
_______________________________________
_______________________________________
_______________________________________

**Signed:** ________________  
**Date:** ________________
