import { Mail } from "lucide-react";
function Footer() {
  return (
    <div>
      <footer className=" flex flex-row gap-3">
        <p className="text-[12px] font-mono">Before I Forget © 2026</p>

        
          <a title="Get in touch" href="mailto:fondra@naskkhaneh.com">
            <Mail size={10} className="w-5 h-8 pb-2 object-cover rounded-2xl cursor-pointer" />
          </a>
      </footer>
    </div>
  );
}

export default Footer;