const App = () => {
  return (
    <>
      <section className="floating">
        <h1>1. Create .github / workflows / deploy.yml</h1>
        <article>
          <h2>In deploy.yml put this code</h2>
          <pre>
            <code>
              {`name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3

      - name: Install dependencies
        uses: bahmutov/npm-install@v1

      - name: Build project
        run: npm run build

      - name: Upload production-ready build files
        uses: actions/upload-artifact@v3
        with:
          name: production-files
          path: ./dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: production-files
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`}
            </code>
          </pre>
        </article>
      </section>

      <div className="wrapper">
        <section className="to-wrap">
          <h1>2. Change base in vite.config.json</h1>
          <article>
            <h2>Code that you need only in `base`</h2>
            <pre className="to-wrap-code">
              <code>
                {`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-app-tests/" // name of your app
});`}
              </code>
            </pre>
          </article>
        </section>

        <section className="to-wrap">
          <h1>
            3. Probably change the way of linking in index.html with deleating
            useless link
          </h1>
          <article>
            <h2>3.1 in script src add `.` 3.2 delete useless link </h2>
            <pre className="to-wrap-code">
              <code>
                {`<script type="module" src="./src/main.jsx"></script> // add '.'
<link rel="icon" type="image/svg+xml" href="/vite.svg" /> // DELETE`}
              </code>
            </pre>
          </article>
        </section>

        <section className="to-wrap">
          <h1>4. Deploy to github</h1>
          <article>
            <pre className="to-wrap-code">
              <h2>{`When Deployed , move to
             1) Settings 
             2) Actions
             3) Actions General
             4) At the end of page Change 'Workflow permissions'
             5) To - Read and write permissions`}</h2>
            </pre>
          </article>
        </section>

        <section className="to-wrap">
          <h1>5. When deploying is Failed</h1>
          <article>
            <pre className="to-wrap-code">
              <h2>{`1) Press Re-run all failed Jobs`}</h2>
            </pre>
          </article>
        </section>

        <section className="to-wrap">
          <h1>6. Final Step, Pages</h1>
          <article>
            <pre className="to-wrap-code">
              <h2>{`When finished
            1) Move to Settings
            2) Pages
            3) Change in Branch from none
            4) To gh-pages`}</h2>
            </pre>
          </article>
        </section>

        <section className="to-wrap">
          <h1>7. You got it</h1>
          <article>
            <pre className="to-wrap-code">
              <h2>{`but if you have some problems after all
just rerun this process in step 6`}</h2>
            </pre>
          </article>
        </section>
      </div>
    </>
  );
};

export default App;
