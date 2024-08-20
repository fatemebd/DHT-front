"use client"
import "./globals.css";
import  QueryClientProvider  from "@/providers/QueryClientProvider";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <html>
      
        <body>    <QueryClientProvider> 
{children}    </QueryClientProvider>
</body>
      </html>

     
  );
}
