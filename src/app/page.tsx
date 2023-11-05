import Image from "next/image";
import Timer from "./Timer";

export default function Home() {
  return (
    <main>
      <Timer initialCount={300} />
    </main>
  );
}
