import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/icons/logo.svg"
        alt="Logo"
        width={150}
        height={150}
      />
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}
