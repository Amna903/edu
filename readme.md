cd /home/edumeup-ssh/htdocs/edumeup.com
git pull
pnpm install
npx prisma generate
npx prisma migrate deploy   # or db push, if new fields aren't captured as migrations
pnpm run build
pm2 restart edumeup --update-env