import Accordion from "@/components/Accordion";
import Image from "next/image";
import Link from "next/link";
import landing from "../../public/Work in progress-cuate.png";
import logo from "../../public/logo.png";
import { accordionItems } from "./constants/accordionItems";
import fa from "./fa.json";
import { Button, Typography } from "antd";

export default function Landing() {
  return (
    <div className="flex flex-col h-screen  p-10">
      <header className="flex justify-between">
        <div className="flex justify-center items-center gap-2">
          <Image src={logo} alt="logo" width={30} />
          <h2 className="text-primary-1000 font-bold text-3xl">{fa.title}</h2>
        </div>
        <Button type="primary">
          <Link href="/login">{fa.loginSignup}</Link>
        </Button>
      </header>

      <div className="flex justify-between items-center h-[100vh]">
        <section className="max-w-[450px]">
          <h2 className="text-primary-1000 font-bold text-3xl">{fa.title}</h2>
          <h3 className="text-white text-lg">{fa.subtitle}</h3>
          <br />
          <p className="text-white text-sm">
            تو دنیایی که بیشتر وقتمون رو پشت کامپیوتر می‌گذرونیم، سلامتی‌مون
            خیلی وقتا فراموش می‌شه. ولی با اپلیکیشن "دوست" می‌تونید راحت‌تر از
            خودتون مراقبت کنید! "دوست" با یادآوری‌های ساده بهتون کمک می‌کنه که
            عادت‌های سالم مثل کشش‌های کوتاه، درست نشستن و کاهش استرس با نفس‌های
            عمیق رو به زندگی‌تون اضافه کنید. تازه، هر روز جملات انگیزشی هم بهتون
            می‌گه تا حالتون بهتر بشه! اگه مدیر هستید، می‌تونید سلامت کارمنداتون
            رو هم زیر نظر داشته باشید.
          </p>
        </section>

        <div className="flex justify-center">
          <Image src={landing} alt="" className="w-full h-[600px]" />
        </div>
      </div>
      <Typography>ویژگی‌های دوست</Typography>
      <Accordion items={accordionItems} />
    </div>
  );
}
