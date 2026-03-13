import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "./StoreProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
        <StoreProvider >
          {children}
        </StoreProvider>
    </html>
  );
}  
=======
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
>>>>>>> 909d5cd (RTK Query Practice)
