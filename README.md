# ZKTimey – Biometric Attendance System

**ZKTimey** is a full-stack biometric attendance management system built with **Next.js**, **Tailwind CSS**, and **Redux Toolkit** on the frontend. It integrates with **ZKTeco biometric devices** using a custom TCP/IP Node.js package, enabling real-time attendance tracking and shift scheduling.

![ZKTimey Dashboard](https://res.cloudinary.com/dza2t1htw/image/upload/v1752154627/Screenshot_from_2025-07-10_19-30-44_urrzq6.png)

## 🚀 Features

- 📊 Dashboard overview with real-time attendance insights
- 🔐 Secure login & role-based access control
- 👥 Department & employee management
- 📅 Shift & schedule management
- 📦 Biometric device integration via custom TCP/IP npm package
- 🌐 Real-time log synchronization from ZKTeco devices
- 📁 Device metadata: user count, device time, last connection
- 🛠 Device connection test & refresh

## 🧪 Tech Stack (Client)

- **Framework**: Next.js (App Router)
- **UI**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🔧 Setup & Installation

```bash
# Clone the repository
$ git clone https://github.com/shahadatjaman/zkteco-time-pro.git
$ cd zkteco-time-pro

# Install dependencies
$ npm install

# Create a .env file and add your backend URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Run the dev server
$ npm run dev
```

## 📡 Device Integration

ZKTimey communicates with **ZKTeco** biometric devices via TCP/IP on port `4370`. Make sure your device is connected to the same network and configured with:

- Static IP address (e.g., 192.168.1.7)
- Port: 4370

The client dashboard displays connection status, metadata, and allows refresh testing.

## 📸 Screenshots

- Dashboard overview
  ![](https://res.cloudinary.com/dza2t1htw/image/upload/v1752154627/Screenshot_from_2025-07-10_19-30-44_urrzq6.png)
- Device connection panel
  ![](https://res.cloudinary.com/dza2t1htw/image/upload/v1752154986/Screenshot_from_2025-07-10_19-42-44_zoa7pl.png)
- Attendance/user management
  ![](https://res.cloudinary.com/dza2t1htw/image/upload/v1752155232/Screenshot_from_2025-07-10_19-46-48_tkjwev.png)
  ![](https://res.cloudinary.com/dza2t1htw/image/upload/v1752155083/Screenshot_from_2025-07-10_19-44-27_den33m.png)

## 🌍 Live Demo

**🔗** [https://zktimey.vercel.app/](https://zktimey.vercel.app/)

## 📦 Related Repositories

- **Server Repo**: [Attendify Server](https://github.com/shahadatjaman/Attendify-server)
- **NPM Package**: [zkteco-terminal](https://www.npmjs.com/package/zkteco-terminal)

## 🙌 Credits

Built with ❤️ by **[Shahadat Jaman](https://shahadatjaman.vercel.app)**

## 🛡 License

[MIT](./LICENSE)
