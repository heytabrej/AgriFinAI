import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const metadata = {
  title: 'AgriConnect',
  description: 'Connecting farmers directly with buyers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-green-50">
        {children}
      </body>
    </html>
  );
} 