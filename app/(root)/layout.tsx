import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a complete User object with all required properties
  const loggedIn = {
    $id: "mock-user-id",
    email: "adam.khald@example.com",
    userId: "user-123",
    dwollaCustomerUrl: "",
    dwollaCustomerId: "",
    firstName: "Adam",
    lastName: "KHALD",
    name: "Adam KHALD",
    address1: "",
    city: "",
    state: "",
    postalCode: "",
    dateOfBirth: "",
    ssn: ""
  };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.png" width={30} height={30} alt="menu icon" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}