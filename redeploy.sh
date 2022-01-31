npm run-script build
rm -r docs
mv build docs
git add docs
git commit -m "Redeploy github page."

