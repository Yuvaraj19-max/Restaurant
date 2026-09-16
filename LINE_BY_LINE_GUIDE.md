# Coffee House — Line-by-Line Upgrade Guide

## 1. `index.html`
- Updated the page title and added a description meta tag.
- Changed the external logo URL to the project-local `images/logo.png`.
- Added menu filter buttons: All, Coffee and Special.
- Added a menu search field.
- Added a live cart summary.
- Added a dedicated `YOUR ORDER` section with cart items, total and Clear Cart.
- Kept the existing sections and images so the original project remains recognizable.

## 2. `script.js`
- Added a JavaScript menu data array.
- Added dynamic menu rendering instead of hard-coded order buttons.
- Added category filtering.
- Added menu-name search.
- Added Local Storage persistence using `coffeeHouseCart`.
- Added add-to-order and quantity-reduction behavior.
- Added live total calculation.
- Added toast notifications.
- Added contact-form validation.
- Added smooth scrolling for navigation links.

## 3. `style.css`
- Added styling for filter/search controls.
- Added cart/order layout.
- Added toast notification styling.
- Added responsive rules for the new controls.
- Existing styling was retained; the upgrade was appended so the original design is easy to compare.

## What to learn line by line
1. Start with the `menu` array in `script.js`.
2. Understand `renderMenu()` and how `.map()` creates HTML.
3. Follow the Add to Order click event.
4. Understand `localStorage.setItem()` / `getItem()`.
5. Follow `renderCart()` and the total calculation.
6. Then study the CSS selectors added under `Portfolio Upgrade`.
