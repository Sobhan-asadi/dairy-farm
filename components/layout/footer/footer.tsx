import Container from "@/components/common/container";
import { footerLinks, socialLinks } from "@/constants/footer";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Logo from "../navbar/logo";
import FooterColumn from "./footer-column";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-card border-t">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Logo />

            <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-7">
              دام فاضلی با تمرکز بر سلامت دام، کیفیت محصولات و تأمین مطمئن، در
              زمینه پرورش و عرضه دام و محصولات دامی فعالیت می‌کند.
            </p>

            <ul className="text-muted-foreground mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 size-5 shrink-0" />
                <span>ایران، آدرس مجموعه بعداً تکمیل می‌شود</span>
              </li>

              <li>
                <Link
                  href="tel:+980000000000"
                  className="hover:text-primary flex items-center gap-3 transition-colors"
                >
                  <Phone className="text-primary size-5 shrink-0" />
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </Link>
              </li>

              <li>
                <Link
                  href="mailto:info@fazeli.example"
                  className="hover:text-primary flex items-center gap-3 transition-colors"
                >
                  <Mail className="text-primary size-5 shrink-0" />
                  info@fazeli.example
                </Link>
              </li>
            </ul>
          </div>

          <FooterColumn title="دسترسی سریع" links={footerLinks.quickAccess} />

          <FooterColumn title="خدمات مجموعه" links={footerLinks.services} />

          <FooterColumn title="خدمات مشتریان" links={footerLinks.customer} />
        </div>

        <div className="border-border flex flex-col gap-5 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © {currentYear} دام فاضلی؛ تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="border-border text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary flex size-10 items-center justify-center rounded-xl border transition-colors"
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
