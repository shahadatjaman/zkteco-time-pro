import PrivacySettings from '@/app/components/settings/PrivacySettings';

export const metadata = {
  title: 'Settings | ZKTimey',
  description:
    'Configure system preferences, manage authentication, update organization details, and customize application behavior.',
};
const page = () => {
  return <PrivacySettings />;
};

export default page;
