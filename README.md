# NAK-Company Front-End Project

این پروژه یک چالش کدنویسی فرانت‌اند برای شرکت NAK است که با React، TypeScript و Vite پیاده‌سازی شده است.

---

## ویژگی‌ها و امکانات پروژه

- پشتیبانی کامل از زبان‌های **فارسی** و **انگلیسی** با استفاده از i18n برای بین‌المللی‌سازی (Internationalization).
- مدیریت حالت (State Management) با استفاده از **Zustand**.
- استایل‌دهی فقط با **EmotionJS** و بدون استفاده از CSS سنتی.
- استفاده کامل از **TypeScript** برای افزایش قابلیت اطمینان کد.
- ساخت و اجرای پروژه با **Vite**.
- فرم‌ها به صورت کامل با استفاده از **react-hook-form** پیاده‌سازی شده‌اند.
- کنترل دسترسی صفحات بر اساس وضعیت ورود کاربر:
  - اگر کاربر وارد نشده باشد، فقط صفحات ورود (Sign In) و ثبت‌نام (Sign Up) قابل دسترسی هستند.
  - پس از ورود، دسترسی به این صفحات محدود می‌شود.
- حفظ وضعیت ورود کاربر حتی بعد از رفرش مرورگر.
- مانیتورینگ وضعیت اتصال شبکه به صورت زنده و نمایش پیغام Toast در صورت قطع اتصال.

---

## مستندات

- مستند طراحی UI/UX:  
  [https://www.figma.com/design/OWGXMF4R7m1DiSsnSFRrFs/1?node-id=0-1&p=f&m=dev](https://www.figma.com/design/OWGXMF4R7m1DiSsnSFRrFs/1?node-id=0-1&p=f&m=dev)

- مستند API:  
  [https://nak-interview.darkube.app/api](https://nak-interview.darkube.app/api)

---

## راهنمای توسعه

- این پروژه بر اساس TypeScript توسعه یافته است.
- استایل‌دهی فقط با EmotionJS انجام شده است.
- مدیریت وضعیت به کمک Zustand صورت گرفته است.
- برای بین‌المللی‌سازی (i18n) تمامی رشته‌های متنی در کد استفاده شده‌اند.
- فرم‌ها به کمک react-hook-form ساخته شده‌اند.
- پروژه با Vite ساخته و اجرا می‌شود.

---

## راهنمای استفاده از ESLint

اگر در حال توسعه پروژه هستید، توصیه می‌شود تنظیمات ESLint را به صورت زیر به‌روزرسانی کنید تا قوانین دقیق‌تر و تخصصی‌تری داشته باشید:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
