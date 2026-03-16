export const metadata = {
  title: "Siena Las Vegas | Dr. Jan Duffy",
  description: "Las Vegas real estate — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
