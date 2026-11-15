import Link from "next/link";
import { Building2, HardHat } from "lucide-react";
import AccountLayout, { accountAction, accountLink } from "@/components/account/AccountLayout";

const choices = [
  {
    role: "Company", icon: Building2, href: "/signup/company",
    description: "Post support requests and connect with industrial experts.",
  },
  {
    role: "Expert", icon: HardHat, href: "/signup/expert",
    description: "Build your profile and browse industrial support requests.",
  },
];

export default function SignupPage() {
  return (
    <AccountLayout wide>
      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Choose your account type</h1>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {choices.map(({ role, icon: Icon, href, description }) => (
          <section key={role} className="grid content-start gap-2 rounded-2xl border border-[#dfddd5] bg-white p-4 shadow-sm sm:p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Icon aria-hidden="true" className="size-5 text-[#234fb8]" />
              {role}
            </h2>
            <p className="text-sm text-[#485364]">{description}</p>
            <Link href={href} className={accountAction}>Create {role} Account</Link>
          </section>
        ))}
      </div>
      <Link href="/login" className={`mt-2 ${accountLink}`}>Log In to an Existing Account</Link>
    </AccountLayout>
  );
}
