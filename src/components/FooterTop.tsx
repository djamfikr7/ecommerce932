import { MapPin, Phone, Clock, Mail } from "lucide-react";
import Container from "./Container";

const contactData = [
  {
    title: "Visit Us",
    subtitle: "New York, USA",
    icon: MapPin,
  },
  {
    title: "Call Us",
    subtitle: "+1 (555) 123-4567",
    icon: Phone,
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: Clock,
  },
  {
    title: "Email Us",
    subtitle: "info@ecommerce932.com",
    icon: Mail,
  },
];

const FooterTop = () => {
  return (
    <Container className="border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
        {contactData.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors rounded-lg"
          >
            <item.icon className="w-6 h-6 text-gray-600 group-hover:text-darkColor transition-colors" />
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-darkColor">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-900">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FooterTop;
