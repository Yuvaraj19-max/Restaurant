# Find Your Place Restaurant — Line-by-Line Upgrade Guide

## 1. `index.html`
- Updated the title and added a description meta tag.
- Added menu filter buttons and menu search.
- Added a live cart summary.
- Added a `Your Order` section with total and Clear Cart.
- Corrected contact-field IDs to avoid duplicate IDs.
- Corrected the restaurant contact email text.

## 2. `script.js`
- Added a menu data array for Pizza, Burger, Pasta and Chicken Biryani.
- Added dynamic menu rendering.
- Added category filtering.
- Added menu search.
- Added Local Storage persistence using `findYourPlaceCart`.
- Added add-to-order and quantity-reduction behavior.
- Added live total calculation.
- Added table-booking validation for required fields and 10-digit phone numbers.
- Added `lastBooking` Local Storage storage.
- Added toast notifications.
- Added smooth navigation.

## 3. `style.css`
- Added filter/search styling.
- Added order/cart styling.
- Added toast notifications.
- Added responsive rules for the upgraded menu and order section.

## What to learn line by line
1. Read the menu object array.
2. Trace `renderMenu()`.
3. Trace the filter button event.
4. Trace the search input event.
5. Trace `renderCart()` and total calculation.
6. Trace the table-booking validation.
7. Then study the CSS added under `Portfolio Upgrade`.
