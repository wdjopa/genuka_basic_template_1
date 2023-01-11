BUILD_FOLDER=.dist

turbo build
rm -rf .dist
mv .next/standalone/ .dist/
cp -r .next/static .dist/.next
rm .dist/server.js
cp -r next.config.js .dist/
cp serverless.yml .dist/
cp server.ts .dist/
cp -r public .dist/
cd .dist
npm run deploy