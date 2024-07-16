import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import {KeyIcon, LockIcon} from "lucide-react";
import {Link1Icon} from "@radix-ui/react-icons";
import Generator from "@/app/(navbar)/generator/page";

export default async function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <section
          className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-12 md:py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Secure Your Passwords
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Generate, store, and link your passwords to websites with our powerful password manager.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary p-3 text-primary-foreground">
                <KeyIcon className="h-6 w-6"/>
              </div>
              <h3 className="text-xl font-semibold">Password Generator</h3>
              <p className="text-muted-foreground">Create strong, unique passwords with our advanced generator.</p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary p-3 text-primary-foreground">
                <LockIcon className="h-6 w-6"/>
              </div>
              <h3 className="text-xl font-semibold">Password Storage</h3>
              <p className="text-muted-foreground">Securely store your passwords in our encrypted vault.</p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary p-3 text-primary-foreground">
                <Link1Icon className="h-6 w-6"/>
              </div>
              <h3 className="text-xl font-semibold">Website Linking</h3>
              <p className="text-muted-foreground">Easily link your stored passwords to the websites you use.</p>
            </div>
          </div>
          <Link
            href="/generator"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Get Started
          </Link>
        </section>
      </div>
      <div className={"min-h-screen flex flex-col items-center"}>
        <Generator/>
      </div>
      <BackgroundBeams className={"fixed pointer-events-none"}/>
    </main>
  );
}
