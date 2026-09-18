import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { prisma } from './prisma';
import { resend } from './mailer';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: {
    database: {
      generateId: 'serial',
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.EMAIL_FROM as string,
        replyTo: process.env.EMAIL_REPLY_TO,
        to: user.email,
        subject: 'Відновлення пароля — Святе Письмо',
        html: `
          <p>Привіт, ${user.name}!</p>
          <p>Ми отримали запит на скидання пароля для вашого акаунту. Перейдіть за посиланням нижче, щоб встановити новий пароль:</p>
          <p><a href="${url}">${url}</a></p>
          <p>Посилання дійсне протягом 1 години. Якщо ви не робили цей запит, просто проігноруйте цей лист.</p>
        `,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.EMAIL_FROM as string,
        replyTo: process.env.EMAIL_REPLY_TO,
        to: user.email,
        subject: 'Підтвердіть електронну пошту — Святе Письмо',
        html: `
          <p>Привіт, ${user.name}!</p>
          <p>Дякуємо за реєстрацію. Підтвердіть свою електронну пошту, перейшовши за посиланням нижче:</p>
          <p><a href="${url}">${url}</a></p>
          <p>Посилання дійсне протягом 1 години. Якщо ви не реєструвалися на цьому сайті, просто проігноруйте цей лист.</p>
        `,
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: false,
      },
    },
  },
  plugins: [nextCookies()],
});
