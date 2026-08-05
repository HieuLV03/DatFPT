import "./globals.css";
import ClientLayout from "@/components/Layout/ClientLayout";

import { Inter, Playfair_Display, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-playfair",
});


export const metadata = {

  metadataBase: new URL("https://fpttelecom.vn"),

  title: {
    default:
      "FPT Telecom | Internet tốc độ cao, Truyền hình FPT Play, Camera AI",

    template:
      "%s | FPT Telecom",
  },

  description:
    "FPT Telecom cung cấp Internet cáp quang tốc độ cao, truyền hình FPT Play, Camera AI và các giải pháp công nghệ hiện đại cho gia đình, doanh nghiệp.",


  keywords: [
    "FPT Telecom",
    "Internet FPT",
    "lắp mạng FPT",
    "wifi FPT",
    "truyền hình FPT Play",
    "camera FPT",
    "cáp quang FPT",
  ],


  openGraph: {

    title:
      "FPT Telecom | Internet tốc độ cao",

    description:
      "Đăng ký Internet FPT chính hãng, đường truyền ổn định, hỗ trợ lắp đặt nhanh.",

    type:
      "website",

    locale:
      "vi_VN",

    siteName:
      "FPT Telecom",

  },


  twitter: {

    card:
      "summary_large_image",

    title:
      "FPT Telecom | Internet tốc độ cao",

    description:
      "Internet FPT, truyền hình FPT Play, Camera AI và giải pháp công nghệ.",

  },


  verification: {

    google:
      "iMhkqfnYHYPZ2e7ZhvNa8URs0nteVRjtS03F9CKa0sU",

  },

};


export default function RootLayout({
  children,
}) {

  return (

    <html

      lang="vi"

      className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}

    >

<body className={`${inter.className} appBody`}>
        <ClientLayout>

          {children}

        </ClientLayout>

      </body>

    </html>

  );

}