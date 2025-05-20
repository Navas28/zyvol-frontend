# Zyvol – Online Sneaker Store (Frontend)

Zyvol is a modern and fully responsive sneaker e-commerce website built with **Next.js**, **TailwindCSS**, **Clerk Auth**, **Cloudinary**, and **Stripe**. This repository contains the **frontend code**, providing users with an engaging and secure shopping experience.

🔗 **Live Site**: [https://zyvol.vercel.app](https://zyvol.vercel.app)

![Zyvol-home](https://github.com/user-attachments/assets/ecdde02a-2eb4-4e7d-97cc-031b7f951859)
![Zyvol-about](https://github.com/user-attachments/assets/37181eb3-1c99-4fb4-b8ed-dbcf3b6ce65b)
![Zyvol-products](https://github.com/user-attachments/assets/40588d25-3e2a-4e8a-96db-26c3ed181404)
![Zyvol-faq](https://github.com/user-attachments/assets/536df6d9-c923-4970-a2bc-52175e0a9fbd)
![Zyvol-form](https://github.com/user-attachments/assets/6d8bc890-b244-4642-be77-3f25edc9e357)
![Zyvol-favourite](https://github.com/user-attachments/assets/e79a6733-4705-4e4a-b0d1-7e6855e9b13a)
![Zyvol-cart](https://github.com/user-attachments/assets/28a6f7e8-df65-46dd-b1ed-d21490be8f0c)
![Zyvol-productAdmin](https://github.com/user-attachments/assets/be920c7d-8a2c-4c3a-bf01-ec8737995fe6)
![Zyvol-orderAdmin](https://github.com/user-attachments/assets/35a2d6d1-e10d-49a5-bda8-b6b63b33f242)
![Zyvol-productDetails](https://github.com/user-attachments/assets/1c4f0553-70f1-49f5-a0da-2bb48802023a)

---

## 🛍️ Key Features

### 🖥️ Website Pages & UX
- **Home**, **About**, **FAQ**, and **Contact** pages
- Smooth scroll and navigation experience
- Fully responsive on all devices

### 👟 Product Functionality
- View **all sneakers** with **gender** and **brand filters**
- Product detail page with:
  - Multiple images
  - Brand, price, and size selection
  - Only authenticated users can favorite or add to cart
- **Cart and Favorite Sidebar** accessible globally
- Stripe checkout integration
- Size selection required before purchase

### 🔐 Authentication
- Integrated **Clerk authentication**
- Only logged-in users can add to cart or favorite products

### 🛠️ Admin Panel
- Admin can:
  - View all products with full details
  - **Add**, **edit**, or **delete** products
  - Upload product images via **Cloudinary**
  - View **order history** including:
    - Customer name
    - Amount paid
    - Payment status
    - Stripe intent ID
      
---

## 🧰 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Payments**: [Stripe](https://stripe.com/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Icons & UI**: Lucide, Radix UI, ShadCN
- **Image Slider**: Swiper.js
