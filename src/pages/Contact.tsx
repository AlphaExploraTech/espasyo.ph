import ContactComponent from '../components/Contact';
import type { ContactProps } from '../components/Contact';

const ContactPage = ({ hideNavbar = false }: ContactProps) => {
  return <ContactComponent hideNavbar={hideNavbar} />;
};

export default ContactPage;