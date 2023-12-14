import client from '@/prisma/client';
import { getServerSession } from 'next-auth';

const getCurrentUser = async () => {
    const session = await getServerSession();

    if (!session?.user?.email) return null;

    const user = await client.user.findUnique({
        where: { email: session?.user?.email },
    });

    if (!user) return null;
    return user;
};

export default getCurrentUser;
