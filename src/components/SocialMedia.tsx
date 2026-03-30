import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Globe, Code, Share2, Users } from "lucide-react";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLinks = [
  { title: "YouTube", href: "https://youtube.com", icon: Globe },
  { title: "GitHub", href: "https://github.com", icon: Code },
  { title: "LinkedIn", href: "https://linkedin.com", icon: Users },
  { title: "Facebook", href: "https://facebook.com", icon: Share2 },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3", className)}>
        {socialLinks.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "border border-darkColor/30 p-2 hover:border-darkColor hover:text-darkColor rounded-full hoverEffect",
                  iconClassName
                )}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn("bg-darkColor text-white", tooltipClassName)}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
